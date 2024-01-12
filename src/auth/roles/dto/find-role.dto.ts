import { IsNotEmpty, IsString } from 'class-validator';

export class FindRoleDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
