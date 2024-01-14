import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FindHomeworkDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  teacherId?: string;

  @IsOptional()
  @IsString({ each: true })
  supportedFileTypes?: string[];
}
