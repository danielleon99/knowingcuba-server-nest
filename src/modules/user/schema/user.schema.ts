import { Document, Schema as MongooseSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "src/modules/role/schema/role.schema";

@Schema()
export class User extends Document {

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        required: true,
        ref: Role.name
    })
    rol: Role;


}

export const UserSchema = SchemaFactory.createForClass(User);
