import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsArray()
  @IsString()
  readonly images: string[];

  @IsString()
  readonly phone: string;

  @IsString()
  readonly address: string;

  @IsString()
  readonly city: string;

  @IsString()
  @IsArray()
  readonly amenities: string[];

  @IsString()
  @IsArray()
  readonly workingHours: string[];

  @IsString()
  readonly rating: string;

  @IsString()
  readonly LowestRatedReview: string;

  @IsString()
  readonly HighestRatedReview: string;
}
