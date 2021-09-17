import { IsEnum } from "class-validator";

import { EnumToString } from "src/common/helpers";
import { RoleEnum } from "../enum/roles.enum";

export class RolDto {

	@IsEnum(RoleEnum, { message: `Invalid name. Valid option: ${EnumToString(RoleEnum)}`})
	name: string;
}
