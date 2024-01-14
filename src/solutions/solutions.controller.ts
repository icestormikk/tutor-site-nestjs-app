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
import { SolutionsService } from './solutions.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ROLES } from 'src/auth/roles/roles.enum';
import { FindSolutionDto } from './dto/find-solution.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { EditSolutionDto } from './dto/edit-solution.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Roles(ROLES.TEACHER, ROLES.ADMIN, ROLES.USER)
@Controller('solutions')
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  @Get()
  async getSolutions(@Body() props: FindSolutionDto) {
    return (await this.solutionsService.findSolutions(props)).map(
      (solution) => ({
        ...solution,
        files: solution.files.map((file) => file.url),
      }),
    );
  }

  @UseInterceptors(FilesInterceptor('files'))
  @Post()
  async uploadSolution(
    @CurrentUser() user: User,
    @Body() createSolutionDto: EditSolutionDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.solutionsService.uploadSolution(
      user.id,
      createSolutionDto,
      files,
    );
  }

  @UseInterceptors(FilesInterceptor('files'))
  @Put()
  async updateSolution(
    @Query('id') id: string,
    @CurrentUser() user: User,
    @Body() createSolutionDto: EditSolutionDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.solutionsService.updateSolution(
      id,
      user.id,
      createSolutionDto,
      files,
    );
  }

  @Delete()
  async deleteSolution(@Query('id') id: string) {
    return this.solutionsService.deleteSolution(id);
  }
}
