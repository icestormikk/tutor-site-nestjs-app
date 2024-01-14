import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class FindResponseDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  teacherId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  solutionId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  text?: string;

  @IsOptional()
  @Transform(() => Number)
  @IsNumber()
  @Min(0)
  score?: number;
}
