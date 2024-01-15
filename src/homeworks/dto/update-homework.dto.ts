import { PartialType } from '@nestjs/mapped-types';
import { CreateHomeworkDto } from './create-homework.dto';

/**
 * An object with parameters for updating the homework
 * @export
 * @class UpdateHomeworkDto
 * @extends {PartialType(CreateHomeworkDto)}
 */
export class UpdateHomeworkDto extends PartialType(CreateHomeworkDto) {}
