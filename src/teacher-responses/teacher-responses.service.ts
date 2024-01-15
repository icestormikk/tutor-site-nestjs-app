import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { TeacherResponsesRepository } from './teacher-responses.repository';
import { FindResponseDto } from './dto/find-response.dto';
import { EditResponseDto } from './dto/edit-response.dto';
import { File } from '@prisma/client';
import { UploadService } from 'src/upload/upload.service';
import { join } from 'path';

/**
 * A service layer for manipulating objects of the TeacherResponse class
 * @export
 * @class TeacherResponsesService
 */
@Injectable()
export class TeacherResponsesService {
  constructor(
    private readonly teacherResponsesRepository: TeacherResponsesRepository,
    private readonly uploadService: UploadService,
  ) {}

  /**
   * Getting all objects of the TeacherResponse class that have specific parameter values
   * @param {FindResponseDto} props the desired data of the TeacherResponse object
   * @return {*} all TeacherResponse objects matching the query
   * @memberof TeacherResponsesService
   */
  async findResponses(props: FindResponseDto) {
    try {
      return await this.teacherResponsesRepository.findTeacherResponses({
        where: { ...props },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  /**
   * Getting a single object of the TeacherResponse class that has the necessary parameters
   * @param {FindResponseDto} props parameters that the desired object of the TeacherResponse class must have
   * @return {*} the first object of the TeacherResponse class that corresponds to the request parameters
   * @memberof TeacherResponsesService
   */
  async findResponse(props: FindResponseDto) {
    try {
      return await this.teacherResponsesRepository.findTeacherResponse({
        where: { ...props },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  /**
   * Creating a new object of the TeacherResponse class
   * @param {EditResponseDto} responseDto object containing information about the new response
   * @param {Express.Multer.File[]} files files attached to an object of the TeacherResponse class
   * @return {*} a new object of the TeacherResponse class
   * @memberof TeacherResponsesService
   */
  async uploadResponse(
    responseDto: EditResponseDto,
    files: Express.Multer.File[],
  ) {
    const { teacherId, solutionId } = responseDto;
    let uploadedFiles: File[] = [];

    try {
      const targetDir = this.getTargetDir(teacherId);
      uploadedFiles = await this.uploadService.upload(
        teacherId,
        targetDir,
        files,
      );

      // TODO: add a trigger to automatically add and remove a response to the solution
      return await this.teacherResponsesRepository.createTeacherResponse({
        data: {
          text: responseDto.text,
          score: Number(responseDto.score),
          teacher: {
            connect: { id: teacherId },
          },
          solution: {
            connect: { id: solutionId },
          },
          files: {
            connect: uploadedFiles.map((file) => {
              return { id: file.id };
            }),
          },
        },
      });
    } catch (error) {
      console.error(error);
      await Promise.all(
        uploadedFiles.map(async (file) => this.uploadService.delete(file.id)),
      );
      throw new InternalServerErrorException();
    }
  }

  /**
   * Updating an existing TeacherResponse class object
   * @param {string} id the unique identifier of the TeacherResponse class object to update
   * @param {EditResponseDto} responseDto new object parameters that need to be applied
   * @param {Express.Multer.File[]} files files attached to an object of the TeacherResponse class
   * @return {*} updated object of the TeacherResponse class
   * @memberof TeacherResponsesService
   */
  async updateReponse(
    id: string,
    responseDto: EditResponseDto,
    files: Express.Multer.File[],
  ) {
    const { solutionId, teacherId } = responseDto;
    let uploadedFiles: File[] = [];

    try {
      const response =
        await this.teacherResponsesRepository.findTeacherResponse({
          where: { AND: [{ id, solutionId, teacherId }] },
        });

      const targetDir = this.getTargetDir(teacherId);
      uploadedFiles = await this.uploadService.upload(
        teacherId,
        targetDir,
        files,
      );

      await Promise.all(
        response.files.map(async (file) => this.uploadService.delete(file.id)),
      );

      return await this.teacherResponsesRepository.updateTeacherResponse({
        where: { id: response.id },
        data: {
          text: responseDto.text,
          score: Number(responseDto.score),
          teacher: {
            connect: { id: teacherId },
          },
          solution: {
            connect: { id: solutionId },
          },
          files: {
            connect: uploadedFiles.map((file) => {
              return { id: file.id };
            }),
          },
        },
      });
    } catch (error) {
      console.error(error);
      await Promise.all(
        uploadedFiles.map((file) => this.uploadService.delete(file.id)),
      );
      throw new InternalServerErrorException();
    }
  }

  /**
   * Deleting an existing object of the TeacherResponse class
   * @param {string} id the unique ID of the TeacherResponse object to delete
   * @memberof TeacherResponsesService
   */
  async deleteResponse(id: string) {
    try {
      const response =
        await this.teacherResponsesRepository.findTeacherResponse({
          where: { id },
        });

      await Promise.all(
        response.files.map(async (file) => this.uploadService.delete(file.id)),
      );

      await this.teacherResponsesRepository.deleteTeacherResponse({
        where: { id },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  private getTargetDir = (userId: string) => {
    return join('responses', userId);
  };
}
