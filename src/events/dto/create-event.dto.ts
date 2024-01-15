import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { IsAfter } from 'src/decorators/isAfter.decorator';

/**
 * An object with parameters for creating a new event
 * @export
 * @class CreateEventDto
 */
export class CreateEventDto {
  /**
   * the name of the new event
   * @type {string}
   * @memberof CreateEventDto
   */
  @IsString()
  @IsNotEmpty()
  title: string;

  /**
   * description of the new event
   * @type {string}
   * @memberof CreateEventDto
   */
  @IsString()
  description: string;

  /**
   * the unique identifier of the person who organizes the event
   * @type {string}
   * @memberof CreateEventDto
   */
  @IsString()
  organizer: string;

  /**
   * date and time of the event start
   * @type {string}
   * @memberof CreateEventDto
   */
  @IsDateString()
  startTime: string;

  /**
   * date and time of the event completion
   * @type {string}
   * @memberof CreateEventDto
   */
  @IsAfter('startTime')
  @IsDateString()
  endTime: string;

  /**
   * link to the meeting place
   * @type {string}
   * @memberof CreateEventDto
   */
  @IsString()
  url: string;
}
