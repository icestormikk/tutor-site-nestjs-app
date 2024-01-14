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

@Injectable()
export class TeacherResponsesService {
  constructor(
    private readonly teacherResponsesRepository: TeacherResponsesRepository,
    private readonly uploadService: UploadService,
  ) {}

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

      // TODO: add a trigger to automatically add a response to the solution
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
