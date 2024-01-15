import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * An object for searching for a solution with parameters corresponding to the passed ones
 * @export
 * @class FindSolutionDto
 */
export class FindSolutionDto {
  /**
   * the unique identifier of the user who provided the solution
   * @type {string}
   * @memberof FindSolutionDto
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  authodId: string;

  /**
   * the unique identifier of the homework that the solution belongs to
   * @type {string}
   * @memberof FindSolutionDto
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  homeworkId: string;
}
