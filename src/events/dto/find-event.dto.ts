import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsAfter } from 'src/decorators/isAfter.decorator';

export class FindEventDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  organizer?: string;

  @IsOptional()
  @IsDateString()
  startTime?: Date;

  @IsOptional()
  @IsAfter('startTime')
  @IsDateString()
  endTime?: Date;

  @IsOptional()
  @IsString()
  url?: string;
}
