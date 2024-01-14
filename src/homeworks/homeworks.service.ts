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

@Injectable()
export class HomeworksService {
  constructor(
    private readonly homeworksRepository: HomeworksRepository,
    private readonly uploadService: UploadService,
  ) {}

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
