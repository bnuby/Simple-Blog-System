import { isString } from "util";

import { IsInt, IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDTO {

  @IsNotEmpty()
  @IsString()
  readonly first_name: string;

  @IsNotEmpty()
  @IsString()
  readonly last_name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsInt()
  readonly age: number;
}