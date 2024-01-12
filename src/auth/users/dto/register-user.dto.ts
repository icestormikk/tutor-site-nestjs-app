import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';
import { Match } from 'src/decorators/match.decorator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  password: string;

  @Match('password')
  confirmPassword: string;

  @IsDateString()
  birthday: Date;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsOptional()
  @IsString()
  patronymic?: string;

  @IsString()
  userRoleId: string;
}
