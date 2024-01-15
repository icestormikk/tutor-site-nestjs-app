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

/**
 * A controller for processing requests for manipulating objects of the Solution class
 * @export
 * @class SolutionsController
 */
@Roles(ROLES.TEACHER, ROLES.ADMIN)
@Controller('solutions')
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  /**
   * Handler for the request to receive all events with certain parameters
   * @param {FindSolutionDto} props a set of parameters that the desired solutions should have
   * @return {*} a list of objects of the Solution class that match the request parameters
   * @memberof SolutionsController
   */
  @Get()
  async getSolutions(@Body() props: FindSolutionDto) {
    return (await this.solutionsService.findSolutions(props)).map(
      (solution) => ({
        ...solution,
        files: solution.files.map((file) => file.url),
      }),
    );
  }

  /**
   * Handler for the request to create a new object of the Solution class
   * @param {User} user information about the user who uploads object
   * @param {EditSolutionDto} createSolutionDto a set of parameters required to create an object of the Solution class
   * @param {Express.Multer.File[]} files files attached to an object of the Solution class
   * @return {*} information about the new Solution class object
   * @memberof SolutionsController
   */
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

  /**
   * Handler for an update request for an existing object of the Solution class
   * @param {string} id the unique ID of the Homework object to update
   * @param {User} user information about the user who updates object
   * @param {EditSolutionDto} createSolutionDto an object containing new information about the object
   * @param {Express.Multer.File[]} files files attached to an object of the Solution class
   * @return {*} information about the updated Solution class object
   * @memberof SolutionsController
   */
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

  /**
   * Handler for a request to delete an object of the Solution class
   * @param {string} id the unique ID of the Solution object to delete
   * @memberof SolutionsController
   */
  @Delete()
  async deleteSolution(@Query('id') id: string) {
    await this.solutionsService.deleteSolution(id);
  }
}
