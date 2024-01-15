import { IsNotEmpty, IsString } from 'class-validator';

/**
 * An object with parameters for creating and updating a new Solution object
 * @export
 * @class EditSolutionDto
 */
export class EditSolutionDto {
  /**
   * the unique identifier of the homework that the solution belongs to
   * @type {string}
   * @memberof EditSolutionDto
   */
  @IsString()
  @IsNotEmpty()
  homeworkId: string;
}
