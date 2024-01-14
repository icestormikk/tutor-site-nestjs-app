import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SolutionsRepository } from './solutions.repository';
import { FindSolutionDto } from './dto/find-solution.dto';
import { EditSolutionDto } from './dto/edit-solution.dto';
import { File } from '@prisma/client';
import { UploadService } from 'src/upload/upload.service';
import { join } from 'path';

@Injectable()
export class SolutionsService {
  constructor(
    private readonly solutionsRepository: SolutionsRepository,
    private readonly uploadService: UploadService,
  ) {}

  async findSolutions(props: FindSolutionDto) {
    try {
      return await this.solutionsRepository.findSolutions({
        where: { ...props },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async findSolution(props: FindSolutionDto) {
    try {
      return await this.solutionsRepository.findSolution({
        where: { ...props },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async uploadSolution(
    userId: string,
    createSolutionDto: EditSolutionDto,
    files: Express.Multer.File[],
  ) {
    const { homeworkId } = createSolutionDto;
    let uploadedFiles: File[] = [];

    try {
      const targetDir = this.getTargetDir(userId);
      uploadedFiles = await this.uploadService.upload(userId, targetDir, files);

      return await this.solutionsRepository.createSolution({
        data: {
          author: {
            connect: { id: userId },
          },
          homework: {
            connect: { id: homeworkId },
          },
          files: {
            connect: uploadedFiles.map((image) => {
              return { id: image.id };
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

  async updateSolution(
    id: string,
    userId: string,
    editSolutionDto: EditSolutionDto,
    files: Express.Multer.File[],
  ) {
    let uploadedFiles: File[] = [];

    try {
      const solution = await this.solutionsRepository.findSolution({
        where: {
          AND: [{ authorId: userId, homeworkId: editSolutionDto.homeworkId }],
        },
      });

      const targetDir = this.getTargetDir(userId);
      uploadedFiles = await this.uploadService.upload(userId, targetDir, files);

      const res = await this.solutionsRepository.updateSolution({
        where: { id },
        data: {
          author: {
            connect: { id: userId },
          },
          homework: {
            connect: { id: editSolutionDto.homeworkId },
          },
          files: {
            connect: uploadedFiles.map((image) => {
              return { id: image.id };
            }),
          },
        },
      });

      await Promise.all(
        solution.files.map(async (file) => this.uploadService.delete(file.id)),
      );

      return res;
    } catch (error) {
      console.error(error);
      await Promise.all(
        uploadedFiles.map(async (file) => this.uploadService.delete(file.id)),
      );
      throw new InternalServerErrorException();
    }
  }

  async deleteSolution(id: string) {
    const solution = await this.solutionsRepository.findSolution({
      where: { id },
    });

    try {
      await this.solutionsRepository.deleteSolution({ where: { id } });

      await Promise.all(
        solution.files.map(async (file) => this.uploadService.delete(file.id)),
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  private getTargetDir = (userId: string) => {
    return join('solutions', userId);
  };
}
