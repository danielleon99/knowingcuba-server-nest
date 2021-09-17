import { IsNotEmpty, IsString, IsEmail,  MinLength } from "class-validator";


export class UserDto {

	@IsString()
	@MinLength(2)
	username: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@MinLength(8)
	password: string;

}
