import { IsNotEmpty, IsString } from 'class-validator';

export class FindFileDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
