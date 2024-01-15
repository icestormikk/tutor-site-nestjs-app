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

/**
 * A service layer for manipulating objects of the Solution class
 * @export
 * @class SolutionsService
 */
@Injectable()
export class SolutionsService {
  constructor(
    private readonly solutionsRepository: SolutionsRepository,
    private readonly uploadService: UploadService,
  ) {}

  /**
   * Getting all objects of the Solution class that have specific parameter values
   * @param {FindSolutionDto} props the desired data of the Solution object
   * @return {*} all Solution objects matching the query
   * @memberof SolutionsService
   */
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

  /**
   * Getting a single object of the Solution class that has the necessary parameters
   * @param {FindSolutionDto} props parameters that the desired object of the Solution class must have
   * @return {*} the first object of the Solution class that corresponds to the request parameters
   * @memberof SolutionsService
   */
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

  /**
   * Creating a new object of the Solution class
   * @param {string} userId the unique identifier of the user uploading the solution
   * @param {EditSolutionDto} createSolutionDto object containing information about the new solution
   * @param {Express.Multer.File[]} files files attached to an object of the Solution class
   * @return {*} a new object of the Solution class
   * @memberof SolutionsService
   */
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

  /**
   * Updating an existing Solution class object
   * @param {string} id the unique identifier of the Solution class object to update
   * @param {string} userId the unique identifier of the user uploading the solution
   * @param {EditSolutionDto} editSolutionDto new object parameters that need to be applied
   * @param {Express.Multer.File[]} files files attached to an object of the Solution class
   * @return {*} updated object of the Solution class
   * @memberof SolutionsService
   */
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

  /**
   * Deleting an existing object of the Solution class
   * @param {string} id the unique ID of the Solution object to delete
   * @memberof SolutionsService
   */
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
