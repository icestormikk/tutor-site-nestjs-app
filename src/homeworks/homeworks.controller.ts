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

/**
 * A controller for processing requests for manipulating objects of the Homework class
 * @export
 * @class HomeworksController
 */
@Roles(ROLES.ADMIN, ROLES.TEACHER)
@Controller('homeworks')
export class HomeworksController {
  constructor(private readonly homeworksService: HomeworksService) {}

  /**
   * Handler for the request to receive all events with certain parameters
   * @param {FindHomeworkDto} props a set of parameters that the desired homeworks should have
   * @return {*} a list of objects of the Homework class that match the request parameters
   * @memberof HomeworksController
   */
  @Get()
  async getHomeworks(@Body() props: FindHomeworkDto) {
    const res = await this.homeworksService.findHomeworks(props);

    return res.map((homework) => ({
      ...homework,
      images: homework.images.map((image) => image.url),
    }));
  }

  /**
   * Handler for the request to create a new object of the Homework class
   * @param {User} user information about the user who uploads object
   * @param {CreateHomeworkDto} createHomeworkDto a set of parameters required to create an object of the Homework class
   * @param {Express.Multer.File[]} files files attached to an object of the Homework class
   * @return {*} information about the new Homework class object
   * @memberof HomeworksController
   */
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

  /**
   * Handler for an update request for an existing object of the Homework class
   * @param {User} user information about the user who updates object
   * @param {string} id the unique ID of the Homework object to update
   * @param {UpdateHomeworkDto} updateHomeworkDto an object containing new information about the object
   * @param {Express.Multer.File[]} files files attached to an object of the Homework class
   * @return {Promise<Homework>} information about the updated Homework class object
   * @memberof HomeworksController
   */
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

  /**
   * Handler for a request to delete an object of the Homework class
   * @param {string} id the unique ID of the Homework object to delete
   * @memberof HomeworksController
   */
  @Delete()
  async deleteHomework(@Query('id') id: string): Promise<void> {
    await this.homeworksService.deleteHomework(id);
  }
}
