import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

/**
 * An object with parameters for creating and updating a new Response object
 * @export
 * @class EditResponseDto
 */
export class EditResponseDto {
  /**
   * the unique identifier of the teacher who provided the response to the task
   * @type {string}
   * @memberof EditResponseDto
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  teacherId: string;

  /**
   * the unique identifier of the solution that has been answered
   * @type {string}
   * @memberof EditResponseDto
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  solutionId: string;

  /**
   * the content of the response to the solution
   * @type {string}
   * @memberof EditResponseDto
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  text: string;

  /**
   * evaluation of the solution
   * @type {number}
   * @memberof EditResponseDto
   */
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  score: number;
}
