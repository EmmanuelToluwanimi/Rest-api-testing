import Session from "../models/session.model";
import { FilterQuery, UpdateQuery } from 'mongoose'
import {ISession} from '../interfaces'
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import {get} from 'lodash'
import { findUser } from "./user.service";
import config from 'config';


export async function createSession(userId: string, userAgent: string) {
    try {
        const session = await Session.create({
            user: userId,
            userAgent,
        });

        return session.toJSON();
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function findSessions(query: FilterQuery<ISession>) {
    try {
        return Session.find(query).lean();
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function updateSessions(query: FilterQuery<ISession>, update: UpdateQuery<ISession>){
    try {
        return Session.updateOne(query, update);
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function reIssueAccessToken({refreshToken}:{refreshToken:string}) {

    const {decoded} = verifyJwt(refreshToken);
    const id = get(decoded, 'session') 

    if(!decoded || !id) return "";

    const session = await Session.findById(id);

    if(!session || !session.valid) return "";

    const user = await findUser({_id: session.user})

    if(!user) return "";

    // create an access token
    const accessToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get('accessTokenTtl')}
    )

    return accessToken;

}