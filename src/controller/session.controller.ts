import {Request, Response} from 'express';
import { createSession, findSessions, updateSessions } from '../service/session.service';
import { validatePassword } from '../service/user.service';
import { signJwt } from '../utils/jwt.utils';
import config from 'config';


export async function createUserSessionHandler(req: Request, res: Response) {

    try {
        
        // validate user credentials
        const user = await validatePassword(req.body);
        if(!user) {
            return res.status(401).send('Invalid credentials');
        }

        // create a session
        const session = await createSession(user._id, req.headers['user-agent'] || "");

        // create an access token
        const accessToken = signJwt(
            {...user, session: session._id},
            {expiresIn: config.get('accessTokenTtl')}
        )

        // create a refresh token
        const refreshToken = signJwt(
            {...user, session: session._id},
            {expiresIn: config.get('refreshTokenTtl')}
        )

        // return access & refresh tokens
        return res.send({accessToken, refreshToken});



    } catch (error:any) {
        console.log(error)
        res.status(error.status||500).send(error.message);
    }

}

export async function getUserSessionHandler(req: Request, res: Response) {

    try {
    
        const userId = res.locals.user._id;

        const sessions = await findSessions({user: userId, valid: true});

        return res.send(sessions);

    } catch (error:any) {
        console.log(error)
        res.status(error.status||500).send(error.message);
    }

}

export async function deleteUserSessionHandler(req:Request, res:Response) {
    const sessionId = res.locals.user.session;

    await updateSessions({ _id: sessionId }, {valid: false})

    return res.send({
        accessToken: null,
        refreshToken: null
    })
}