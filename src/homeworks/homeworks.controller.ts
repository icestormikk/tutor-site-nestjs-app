import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { HomeworksService } from './homeworks.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ROLES } from 'src/auth/roles/roles.enum';
import { FindHomeworkDto } from './dto/find-homework.dto';
import { Homework, User } from '@prisma/client';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';

@Roles(ROLES.ADMIN, ROLES.TEACHER, ROLES.USER)
@Controller('homeworks')
export class HomeworksController {
  constructor(private readonly homeworksService: HomeworksService) {}

  @Get()
  async getHomeworks(@Body() props: FindHomeworkDto) {
    const res = await this.homeworksService.findHomeworks(props);

    return res.map((homework) => ({
      ...homework,
      images: homework.images.map((image) => image.url),
    }));
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async uploadHomework(
    @CurrentUser() user: User,
    @Body() createHomeworkDto: CreateHomeworkDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.homeworksService.uploadHomework(
      user.id,
      createHomeworkDto,
      files,
    );
  }

  @Put()
  @UseInterceptors(FilesInterceptor('files'))
  async updateHomework(
    @CurrentUser() user: User,
    @Query('id') id: string,
    @Body() updateHomeworkDto: UpdateHomeworkDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<Homework> {
    return this.homeworksService.updateHomework(
      id,
      user.id,
      updateHomeworkDto,
      files,
    );
  }

  @Delete()
  async deleteHomework(@Query('id') id: string): Promise<void> {
    await this.homeworksService.deleteHomework(id);
  }
}
