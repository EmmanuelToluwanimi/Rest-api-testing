import jwt from 'jsonwebtoken';
import config from 'config';
import { algoType, convertFromBase64String } from './constants';


const privateKey = config.get<string>('privateKey');
const publicKey = config.get<string>('publicKey');
const secretKey = config.get<string>('secretKey');

export function signJwt(
    object: Object,
    options?: jwt.SignOptions | undefined
) {
    // console.log(privateKey);
    return jwt.sign(object, secretKey, {
        ...(options && options),
        algorithm: algoType,
    });
}

export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, secretKey);

        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (error:any) {
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null,
        }
    }
}