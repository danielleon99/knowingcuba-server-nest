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
import { ParseIntPipe } from '@nestjs/common';

import { UserService } from "./user.service";
import { ParseMongoIdPipe } from "src/common/pipes";
import { CreateUserDto, UpdateUserDto } from "./dto";

@Controller("users")
export class UserController {

  constructor(
    private userService: UserService
  ) { }

  @Get()
  public async getAllUseres(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number) {
    return await this.userService.findAll(limit, offset);
  }

  @Get(":id")
  public async getUser(@Param("id", ParseMongoIdPipe) userId: string) {
    return await this.userService.findById(userId);
  }

  @Post()
  public async addUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Put(":id")
  public async updateUser(
    @Param("id", ParseMongoIdPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(userId, updateUserDto);
  }

  @Delete(":id")
  public async deleteUser(@Param("id", ParseMongoIdPipe) userId: string) {
    return await this.userService.remove(userId);
  }
}
