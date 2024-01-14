import { IsNotEmpty, IsString } from 'class-validator';

export class EditSolutionDto {
  @IsString()
  @IsNotEmpty()
  homeworkId: string;
}
