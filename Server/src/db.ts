import mongoose, { model, Schema } from "mongoose";
import { MONGO_URL } from "./config";

mongoose.connect(MONGO_URL? MONGO_URL: "null")

const UserSchema = new Schema({
    username: {type: String, unique : true},
    password: String
})

const ContentSchema = new Schema({
    title: String,
    type: String,
    link: String,
    description: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true}
})

const linkSchema = new Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: "User", required: true, unique: true}

})

export const UserModel = model("User", UserSchema );
export const ContentModel = model("Content", ContentSchema);
export const LinkModel = model("Link", linkSchema);
  