import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { hashSync, genSaltSync } from 'bcryptjs';

import { Role } from "src/modules/role/schema/role.schema";

@Schema()
export class User extends Document {

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({
        required: true,
        set: (password: string) => hashSync(password, genSaltSync())
    })
    password: string;

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        required: true,
        ref: Role.name
    })
    role: Role;

}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object['uid'] = _id;
    return object;
});
