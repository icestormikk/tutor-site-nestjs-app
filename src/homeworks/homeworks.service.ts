import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { HomeworksRepository } from './homeworks.repository';
import { File } from '@prisma/client';
import { FindHomeworkDto } from './dto/find-homework.dto';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UploadService } from 'src/upload/upload.service';
import { UpdateHomeworkDto } from './dto/update-homework.dto';

/**
 * A service layer for manipulating objects of the Homework class
 * @export
 * @class HomeworksService
 */
@Injectable()
export class HomeworksService {
  constructor(
    private readonly homeworksRepository: HomeworksRepository,
    private readonly uploadService: UploadService,
  ) {}

  /**
   * Getting all objects of the Homework class that have specific parameter values
   * @param {FindHomeworkDto} props the desired data of the Event object
   * @return {*} all Event objects matching the query
   * @memberof HomeworksService
   */
  async findHomeworks(props: FindHomeworkDto) {
    try {
      return await this.homeworksRepository.findHomeworks({
        where: {
          ...props,
          title: { contains: props.title },
          description: { contains: props.description },
          supportedFileTypes: {
            contains: props.supportedFileTypes?.join(',') || '',
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  /**
   * Getting a single object of the Homework class that has the necessary parameters
   * @param {FindHomeworkDto} props parameters that the desired object of the Homework class must have
   * @return {*} the first object of the Event class that corresponds to the request parameters
   * @memberof HomeworksService
   */
  async findHomework(props: FindHomeworkDto) {
    try {
      return await this.homeworksRepository.findHomework({
        where: {
          ...props,
          description: { contains: props.description },
          supportedFileTypes: {
            contains: props.supportedFileTypes?.join(',') || '',
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  /**
   * Creating a new object of the Event class
   * @param {string} userId the unique identifier of the user uploading the homework
   * @param {CreateHomeworkDto} createHomeworkDto  object containing information about the new user
   * @param {Express.Multer.File[]} files files attached to an object of the Homework class
   * @return {*} a new object of the Homework class
   * @memberof HomeworksService
   */
  async uploadHomework(
    userId: string,
    createHomeworkDto: CreateHomeworkDto,
    files: Express.Multer.File[],
  ) {
    const { supportedFileTypes, teacher } = createHomeworkDto;
    let uploadedImages: File[] = [];

    try {
      uploadedImages = await this.uploadService.upload(userId, 'images', files);

      return await this.homeworksRepository.createHomework({
        data: {
          ...createHomeworkDto,
          images: {
            connect: uploadedImages.map((image) => {
              return { id: image.id };
            }),
          },
          teacher: {
            connect: { id: teacher },
          },
          supportedFileTypes: supportedFileTypes.join(','),
        },
      });
    } catch (error) {
      console.error(error);
      await Promise.all(
        uploadedImages.map(async (file) => this.uploadService.delete(file.id)),
      );
      throw new InternalServerErrorException();
    }
  }

  /**
   * Updating an existing Homework class object
   * @param {string} id the unique identifier of the Event class object to update
   * @param {string} userId the unique identifier of the user uploading the homework
   * @param {UpdateHomeworkDto} updateHomeworkDto new object parameters that need to be applied
   * @param {Express.Multer.File[]} files files attached to an object of the Homework class
   * @return {*} updated object of the Homework class
   * @memberof HomeworksService
   */
  async updateHomework(
    id: string,
    userId: string,
    updateHomeworkDto: UpdateHomeworkDto,
    files: Express.Multer.File[],
  ) {
    let newImages: File[] = null;
    try {
      const { supportedFileTypes, teacher } = updateHomeworkDto;

      const homework = await this.homeworksRepository.findHomework({
        where: { id },
      });

      if (files && files.length > 0) {
        newImages = await this.uploadService.upload(userId, 'images', files);

        await Promise.all(
          homework.images.map(async (image) => {
            return this.uploadService.delete(image.id);
          }),
        );
      }

      return await this.homeworksRepository.updateHomework({
        where: { id },
        data: {
          ...updateHomeworkDto,
          images: {
            connect: newImages
              ? newImages.map((image) => {
                  return { id: image.id };
                })
              : homework.images,
          },
          teacher: {
            connect: { id: teacher || homework.teacherId },
          },
          supportedFileTypes:
            supportedFileTypes?.join(',') || homework.supportedFileTypes,
        },
      });
    } catch (error) {
      console.log(error);
      await Promise.all(
        newImages.map(async (image) => this.uploadService.delete(image.id)),
      );
      throw new InternalServerErrorException();
    }
  }

  /**
   * Deleting an existing object of the Homework class
   * @param {string} id  the unique ID of the Homework object to delete
   * @memberof HomeworksService
   */
  async deleteHomework(id: string) {
    const homework = await this.homeworksRepository.findHomework({
      where: { id },
    });

    try {
      await this.homeworksRepository.deleteHomework({ where: { id } });
      await Promise.all(
        homework.images.map(async (image) => {
          return this.uploadService.delete(image.id);
        }),
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
