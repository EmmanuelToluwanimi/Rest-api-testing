import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import config from "config";
import { IUser } from "../interfaces";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    let user = this as IUser;

    if (!user.isModified('password')) {
        return next();
    }
    
    const salt = await bcrypt.genSalt(config.get<number>('saltRounds'));

    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();
})

userSchema.methods.comparePassword = async function (password:string):Promise<boolean> {
    const user = this as IUser;

    return bcrypt.compare(password, user.password).catch(e => false);
}

const User = mongoose.model<IUser>("User", userSchema);

export default User;