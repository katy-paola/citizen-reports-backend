import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(5, { message: 'Title must have at least 5 characters' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  @MinLength(10, { message: 'Description must have at least 10 characters' })
  description: string;
}
