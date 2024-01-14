import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class EditResponseDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  teacherId: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  solutionId: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  score: number;
}
