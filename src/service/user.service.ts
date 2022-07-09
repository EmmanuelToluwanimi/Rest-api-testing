import {DocumentDefinition, FilterQuery} from 'mongoose';
import User from '../models/user.model';
import { IUser } from '../interfaces';
import { omit } from 'lodash';

export async function createUser(input: DocumentDefinition<Omit<IUser, 'createdAt' | 'updatedAt' | 'comparePassword'>>){
    try {
        const user = await User.create(input);
        return omit(user.toJSON(), 'password')
    } catch (error:any) {
        throw new Error(error);
    }
}

export async function getAll() {
    try {
        return await User.find();
    } catch (error:any) {
        throw new Error(error);
    }
}

export async function getById(id: string){

    try {
        return await User.findById(id);
    } catch (error:any) {
        throw new Error(error);
    }
}

export async function validatePassword({email, password}: {email:string, password:string}) {
    const user = await User.findOne({email})

    if(!user) return false;

    const isValid = await user.comparePassword(password);

    if(!isValid) return false;

    return omit(user.toJSON(), 'password');
}

export async function findUser(query: FilterQuery<IUser>){
    return User.findOne(query).lean();
}
 