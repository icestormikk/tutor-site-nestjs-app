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

@Injectable()
export class UploadService {
  constructor(
    private readonly configService: ConfigService,
    private readonly uploadRepository: UploadRepository,
  ) {}

  async getFiles(props: FindFileDto): Promise<File[]> {
    return this.uploadRepository.findFiles({ where: { ...props } });
  }

  async download(id: string, response: Response) {
    const file = await this.uploadRepository.findFile({ where: { id } });
    const absolute = join(process.cwd(), file.relative);
    response.sendFile(absolute);
  }

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
