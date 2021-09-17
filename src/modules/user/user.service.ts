import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException,
} from '@nestjs/common';

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name)
		private readonly userModel: Model<User>
	) { }

	public async findAll(limit: number, offset: number): Promise<any> {

		try {

			return await this.userModel
				.find()
				.populate({ path: 'role' })
				.skip(offset)
				.limit(limit)
				.exec();

		} catch (error) {

			Logger.error(error);
			return new InternalServerErrorException("Something went wrong");
		}
	}

	public async findOne(user: any): Promise<any> {

		try {
			return await this.userModel
				.findOne({
					...user
				})
				.populate({ path: "role", model: "Role" })
				.exec();
		} catch (error) {

			Logger.error(error);
			return new InternalServerErrorException("Something went wrong");
		}
	}

	public async findById(userId: string): Promise<any> {

		try {
			const user = await this.userModel.findById({ _id: userId }).exec();

			if (!user) return new NotFoundException(`User #${userId} not found`);

			return user;
		} catch (error) {

			Logger.error(error);
			return new InternalServerErrorException("Something went wrong");
		}
	}

	public async create(createUserDto: CreateUserDto): Promise<any> {

		try {

			if (await this.userModel.findOne({ email: createUserDto.email }))
				return new BadRequestException(`Already exists an user with this email: ${createUserDto.email}`);

			if (await this.userModel.findOne({ username: createUserDto.username }))
				return new BadRequestException(`Already exists an user with this name: ${createUserDto.username}`);

			const newUser = await new this.userModel(createUserDto).save();

			return {
				message: "User has been created successfully",
				newUser
			};

		} catch (error) {

			Logger.error(error);
			return new InternalServerErrorException("Something went wrong");
		}
	}

	public async update(userId: string, updateUserDto: UpdateUserDto): Promise<any> {

		try {

			let user = await this.userModel.findById({ _id: userId }).exec();

			if (!user) return new NotFoundException(`User #${userId} not found`);

			if (updateUserDto.email) {

				user = await this.userModel.findOne({ email: updateUserDto.email });
				if (user && userId !== user.id)
					return new BadRequestException(`Already exists an user with this email: ${updateUserDto.email}`);
			}

			if (updateUserDto.username) {

				user = await this.userModel.findOne({ username: updateUserDto.username });
				if (user && userId !== user.id)
					return new BadRequestException(`Already exist an user with this name: ${updateUserDto.username}`);
			}

			return {
				message: "User has been successfully updated",
				user: await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true })
			};

		} catch (error) {

			Logger.error(error);
			return new InternalServerErrorException("Something went wrong");
		}
	}

	public async remove(userId: string): Promise<any> {

		try {
			const user = await this.userModel.findById({ _id: userId }).exec();

			if (!user) return new NotFoundException(`User #${userId} not found`);

			await user.remove();

			return {
				message: "User has been deleted",
				user
			};

		} catch (error) {

			Logger.error(error);
			return new InternalServerErrorException("Something went wrong");
		}
	}
}
