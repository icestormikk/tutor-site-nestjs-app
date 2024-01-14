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

@Roles(ROLES.ADMIN, ROLES.TEACHER)
@Controller('responses')
export class TeacherResponsesController {
  constructor(
    private readonly teacherResponsesService: TeacherResponsesService,
  ) {}

  @Get()
  async getResponses(props: FindResponseDto) {
    return (await this.teacherResponsesService.findResponses(props)).map(
      (response) => ({
        ...response,
        files: response.files.map((file) => file.url),
      }),
    );
  }

  @UseInterceptors(FilesInterceptor('files'))
  @Post()
  async uploadResponse(
    @Body() responseDto: EditResponseDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.teacherResponsesService.uploadResponse(responseDto, files);
  }

  @UseInterceptors(FilesInterceptor('files'))
  @Put()
  async updateResponse(
    @Query('id') id: string,
    @Body() responseDto: EditResponseDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.teacherResponsesService.updateReponse(id, responseDto, files);
  }

  @Delete()
  async deleteResponse(@Query('id') id: string) {
    return this.teacherResponsesService.deleteResponse(id);
  }
}
