import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateHomeworkDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsString()
  teacher: string;

  @IsDateString()
  deadline: Date;

  @IsOptional()
  @IsString({ each: true })
  supportedFileTypes?: string[];

  @IsOptional()
  @Transform(() => Number)
  @IsNumber()
  @Min(0)
  maxFilesCount?: number;
}
