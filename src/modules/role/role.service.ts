import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";

import { Model } from 'mongoose';
import { CreateRolDto, UpdateRolDto } from './dto';
import { Role } from './schema/role.schema';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name)
    private readonly rolModel: Model<Role>
  ) { }

  public async findAll(limit: number, offset: number): Promise<Role[] | HttpException> {

    try {

      //TODO: Return total
      return await this.rolModel
        .find()
        .skip(offset)
        .limit(limit)
        .exec();

    } catch (error) {

      Logger.error(error);
      return new InternalServerErrorException("Something went wrong");
    }
  }

  public async findById(rolId: string): Promise<Role | HttpException> {

    try {

      const rol = await this.rolModel.findById({ _id: rolId }).exec();

      if (!rol) return new NotFoundException(`Rol #${rolId} not found`);

      return rol;

    } catch (error) {

      Logger.error(error);
      return new InternalServerErrorException("Something went wrong");
    }
  }

  public async create(createRolDto: CreateRolDto): Promise<any> {

    try {

      const existRoleName = await this.rolModel.findOne({ name: createRolDto.name });
      if (existRoleName) return new BadRequestException(`Already exists a role with this name: ${createRolDto.name}`);

      const role = await new this.rolModel(createRolDto).save();

      return {
        message: "Rol has been created successfully",
        role
      };

    } catch (error) {

      Logger.error(error);
      return new InternalServerErrorException("Something went wrong");
    }
  }

  public async update(rolId: string, updateRolDto: UpdateRolDto): Promise<any> {

    try {

      let role = await this.rolModel.findById({ _id: rolId }).exec();

      if (!role) return new NotFoundException(`Role #${rolId} not found`);

      if (updateRolDto.name) {

        role = await this.rolModel.findOne({ name: updateRolDto.name });
        if (role && rolId !== role.id)
          return new BadRequestException(`Already exists a role with this name: ${updateRolDto.name}`);
      }

      return {
        message: "Role has been successfully updated",
        role: await this.rolModel.findByIdAndUpdate(rolId, updateRolDto, { new: true })
      };

    } catch (error) {

      Logger.error(error);
      return new InternalServerErrorException("Something went wrong");
    }
  }

  public async remove(rolId: string): Promise<any> {

    try {

      const deletedRol = await this.rolModel.findById({ _id: rolId }).exec();

      if (!deletedRol) return new NotFoundException(`Rol #${rolId} not found`);

      await deletedRol.remove();

      return {
        message: "Rol has been deleted",
        deletedRol
      };

    } catch (error) {

      Logger.error(error);
      return new InternalServerErrorException("Something went wrong");
    }
  }
}
