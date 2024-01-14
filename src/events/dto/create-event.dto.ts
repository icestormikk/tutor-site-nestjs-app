import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsString()
  organizer: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsString()
  url: string;
}
