import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsAfter } from 'src/decorators/isAfter.decorator';

/**
 * An object for searching for a event with parameters corresponding to the passed ones
 * @export
 * @class FindEventDto
 */
export class FindEventDto {
  /**
   * the name of the event
   * @type {string}
   * @memberof FindEventDto
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  /**
   * description of the event
   * @type {string}
   * @memberof FindEventDto
   */
  @IsOptional()
  @IsString()
  description?: string;

  /**
   * the unique identifier of the person who organizes the event
   * @type {string}
   * @memberof FindEventDto
   */
  @IsOptional()
  @IsString()
  organizer?: string;

  /**
   * date and time of the event start
   * @type {Date}
   * @memberof FindEventDto
   */
  @IsOptional()
  @IsDateString()
  startTime?: Date;

  /**
   * date and time of the event completion
   * @type {Date}
   * @memberof FindEventDto
   */
  @IsOptional()
  @IsAfter('startTime')
  @IsDateString()
  endTime?: Date;

  /**
   * link to the meeting place
   * @type {string}
   * @memberof FindEventDto
   */
  @IsOptional()
  @IsString()
  url?: string;
}
