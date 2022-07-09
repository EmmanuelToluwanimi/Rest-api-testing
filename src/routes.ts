import {Express, Request, Response} from 'express'
import { createUserHandler } from './controller/user.controller';
import { ROUTES } from './utils/constants';
import validate from './middleware/validateResource';
import { createUserSchema } from './schema/user.schema';
import { 
    createProductSchema, 
    updateProductSchema,
    getProductSchema,
    deleteProductSchema
} from './schema/product.schema';
import { 
    createUserSessionHandler, 
    getUserSessionHandler, 
    deleteUserSessionHandler 
} from './controller/session.controller';
import { createSessionSchema } from './schema/session.schema';
import { requireUser } from './middleware/requireUser';
import { 
    createProductHandler,
    updateProductHandler,
    getProductHandler,
    deleteProductHandler
} from './controller/product.controller';


const {
    HEALTHCHECK,
    REGISTER,
    SESSIONS,
    PRODUCTS
} = ROUTES;

function routes(app:Express) {
    app.get(HEALTHCHECK, (req: Request, res: Response) => res.sendStatus(200));

    app.post(REGISTER, validate(createUserSchema), createUserHandler);

    /**
     * Sessions routes
     */
    app.get(SESSIONS, requireUser, getUserSessionHandler);
    app.post(SESSIONS, validate(createSessionSchema), createUserSessionHandler);
    app.delete(SESSIONS, requireUser, deleteUserSessionHandler);

    /**
     * Products routes
     */
    app.get(PRODUCTS+"/:pid", validate(getProductSchema), getProductHandler);
    app.post(PRODUCTS, [requireUser, validate(createProductSchema)], createProductHandler);
    app.put(PRODUCTS+"/:pid", [requireUser, validate(updateProductSchema)], updateProductHandler);
    app.delete(PRODUCTS+"/:pid", [requireUser, validate(deleteProductSchema)], deleteProductHandler);
    
}

export default routes;