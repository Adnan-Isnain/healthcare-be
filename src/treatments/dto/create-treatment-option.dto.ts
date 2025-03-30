import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTreatmentOptionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;
} 