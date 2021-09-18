import { IsNotEmpty, IsString, IsEmail,  MinLength, IsMongoId } from "class-validator";
import { Role } from "src/modules/role/schema/role.schema";

export class UserDto {

	@IsMongoId()
	role: Role;

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
