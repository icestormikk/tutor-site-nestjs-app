import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FindSolutionDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  authodId: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  homeworkId: string;
}
