import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UploadRepository } from './upload.repository';
import { File } from '@prisma/client';
import { FindFileDto } from './dto/find-file.dto';
import { ConfigService } from '@nestjs/config';
import { extname, join } from 'path';
import { existsSync, mkdirSync, rmSync } from 'fs';
import { randomUUID } from 'crypto';
import { writeFile } from 'fs/promises';
import { Response } from 'express';

/**
 * A service layer for manipulating objects of the File class
 * @export
 * @class UploadService
 */
@Injectable()
export class UploadService {
  constructor(
    private readonly configService: ConfigService,
    private readonly uploadRepository: UploadRepository,
  ) {}

  /**
   * Getting all objects of the File class that have specific parameter values
   * @param {FindFileDto} props the desired data of the File object
   * @return {Promise<File[]>} all File objects matching the query
   * @memberof UploadService
   */
  async getFiles(props: FindFileDto): Promise<File[]> {
    return this.uploadRepository.findFiles({ where: { ...props } });
  }

  /**
   * Issuing the file contained on the server to the user
   * @param {string} id the unique identifier of the File class object
   * @param {Response} response a Response object containing information about the server's response to the request
   * @memberof UploadService
   */
  async download(id: string, response: Response) {
    const file = await this.uploadRepository.findFile({ where: { id } });
    const absolute = join(process.cwd(), file.relative);
    response.sendFile(absolute);
  }

  /**
   * Uploading files from users to the server
   * @param {string} ownerId the unique identifier of the user who owns the file
   * @param {string} targetDir the target folder to which the file will be uploaded
   * @param {Express.Multer.File[]} files files to download
   * @return {Promise<File[]>} objects containing information about uploaded files
   * @memberof UploadService
   */
  async upload(
    ownerId: string,
    targetDir: string,
    files: Express.Multer.File[],
  ): Promise<File[]> {
    const targetLocation = join(
      this.configService.get<string>('UPLOAD_LOCATION'),
      targetDir,
    );
    const absolutePath = join(process.cwd(), targetLocation);

    if (!existsSync(absolutePath)) {
      mkdirSync(absolutePath, { recursive: true });
    }

    const result = await Promise.all(
      files.map(async (file) => {
        const extension = extname(file.originalname);
        const uuid = randomUUID();
        const filename = `${uuid}${extension}`;
        const fileAbsolute = join(absolutePath, filename);
        const fileRelative = join(targetLocation, filename);

        try {
          await writeFile(fileAbsolute, file.buffer);

          const res = await this.uploadRepository.createFile({
            data: {
              owner: { connect: { id: ownerId } },
              relative: fileRelative,
              url: '',
              size: file.size,
            },
          });

          return await this.uploadRepository.updateFile({
            where: { id: res.id },
            data: { url: `http://localhost:3000/media/${res.id}` },
          });
        } catch (error) {
          console.error(error);
          rmSync(fileAbsolute, { recursive: true });
          throw new UnprocessableEntityException();
        }
      }),
    );

    return result;
  }

  /**
   * Deleting files from the server
   * @param {string} id the unique identifier of the File class object
   * @memberof UploadService
   */
  async delete(id: string): Promise<void> {
    const file = await this.uploadRepository.findFile({ where: { id } });
    const { relative } = file;
    const path = join(process.cwd(), relative);

    if (!existsSync(path)) {
      throw new Error(`The file you are looking for was not found: ${path}`);
    }

    try {
      rmSync(path, { recursive: true });
      await this.uploadRepository.deleteFile({ where: { id } });
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException();
    }
  }
}
