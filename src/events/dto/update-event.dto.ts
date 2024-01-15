import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';

/**
 * An object with parameters for updating the event
 * @export
 * @class UpdateEventDto
 * @extends {PartialType(CreateEventDto)}
 */
export class UpdateEventDto extends PartialType(CreateEventDto) {}
