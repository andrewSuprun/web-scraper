import { IsEmail } from "class-validator";

class EmailDto {
  @IsEmail()
  email: string;
}
export type mailer = [string | EmailDto];
