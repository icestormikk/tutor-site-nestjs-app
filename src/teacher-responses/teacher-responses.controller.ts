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
import { TeacherResponsesService } from './teacher-responses.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ROLES } from 'src/auth/roles/roles.enum';
import { FindResponseDto } from './dto/find-response.dto';
import { EditResponseDto } from './dto/edit-response.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

/**
 * A controller for processing requests for manipulating objects of the TeacherResponse class
 * @export
 * @class TeacherResponsesController
 */
@Roles(ROLES.ADMIN, ROLES.TEACHER)
@Controller('responses')
export class TeacherResponsesController {
  constructor(
    private readonly teacherResponsesService: TeacherResponsesService,
  ) {}

  /**
   * Handler for the request to receive all events with certain parameters
   * @param {FindResponseDto} props a set of parameters that the desired reponses should have
   * @return {*} a list of objects of the TeacherResponse class that match the request parameters
   * @memberof TeacherResponsesController
   */
  @Get()
  async getResponses(props: FindResponseDto) {
    return (await this.teacherResponsesService.findResponses(props)).map(
      (response) => ({
        ...response,
        files: response.files.map((file) => file.url),
      }),
    );
  }

  /**
   * Handler for the request to create a new object of the TeacherResponse class
   * @param {EditResponseDto} responseDto a set of parameters required to create an object of the TeacherResponse class
   * @param {Express.Multer.File[]} files  files attached to an object of the TeacherResponse class
   * @return {*} information about the new TeacherResponse class object
   * @memberof TeacherResponsesController
   */
  @UseInterceptors(FilesInterceptor('files'))
  @Post()
  async uploadResponse(
    @Body() responseDto: EditResponseDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.teacherResponsesService.uploadResponse(responseDto, files);
  }

  /**
   * Handler for an update request for an existing object of the TeacherResponse class
   * @param {string} id the unique ID of the TeacherResponse object to update
   * @param {EditResponseDto} responseDto  an object containing new information about the object
   * @param {Express.Multer.File[]} files files attached to an object of the TeacherResponse class
   * @return {*} information about the updated TeacherResponse class object
   * @memberof TeacherResponsesController
   */
  @UseInterceptors(FilesInterceptor('files'))
  @Put()
  async updateResponse(
    @Query('id') id: string,
    @Body() responseDto: EditResponseDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.teacherResponsesService.updateReponse(id, responseDto, files);
  }

  /**
   * Handler for a request to delete an object of the TeacherResponse class
   * @param {string} id the unique ID of the TeacherResponse object to delete
   * @memberof TeacherResponsesController
   */
  @Delete()
  async deleteResponse(@Query('id') id: string) {
    return this.teacherResponsesService.deleteResponse(id);
  }
}
