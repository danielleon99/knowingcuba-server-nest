import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";

import { RoleService } from "./role.service";

import { ParseIntPipe } from '@nestjs/common';
import { ParseMongoIdPipe } from "src/common/pipes";
import { CreateRolDto, UpdateRolDto } from "./dto";
import { Roles } from "../auth/decorators";
import { RoleEnum } from '../role/enum/roles.enum';

@Roles(RoleEnum.ADMIN)
@Controller("roles")
export class RoleController {
  constructor(private roleService: RoleService) { }

  @Get()
  public async getAllRoles(
    @Query("limit", new ParseIntPipe) limit: number,
    @Query("offset", new ParseIntPipe) offset: number) {
    return await this.roleService.findAll(limit, offset);
  }

  @Get(":id")
  public async getRol(@Param("id", ParseMongoIdPipe) rolId: string) {
    return await this.roleService.findById(rolId);
  }

  @Post()
  public async addRol(@Body() createRolDto: CreateRolDto) {
    return await this.roleService.create(createRolDto);
  }

  @Put(":id")
  public async updateRol(
    @Param("id", ParseMongoIdPipe) rolId: string,
    @Body() updateRolDto: UpdateRolDto) {
    return await this.roleService.update(rolId, updateRolDto);
  }

  @Delete(":id")
  public async deleteRol(@Param("id", ParseMongoIdPipe) rolId: string) {
    return await this.roleService.remove(rolId);
  }
}
