import { saltRounds, port, dbUri, publicKey, privateKey, accessTokenTtl, refreshTokenTtl, secretKey } from "../src/utils/constants"


export default {
    port,
    dbUri: dbUri(),
    saltRounds,
    publicKey,
    privateKey,
    secretKey,
    accessTokenTtl,
    refreshTokenTtl
}