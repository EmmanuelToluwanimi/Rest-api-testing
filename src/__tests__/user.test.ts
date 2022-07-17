import mongoose from "mongoose";
import supertest from 'supertest';
import createServer from '../utils/server';
import * as userService from "../service/user.service";
import * as sessionService from "../service/session.service";
import { createUserSessionHandler } from "../controller/session.controller";

const app = createServer()

const userInput = {
    email: "test@example.com",
    name: "Jane Doe",
    password: "Password123",
    passwordConfirmation: "Password1903"
}

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
    _id: userId,
    name: "John Doe",
    email: "test@example.com",
}

const sessionPayload = {
    _id: userId,
    user: userId,
    userAgent: "postman",
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0
}

describe('user', ()=>{
    // user registration
    describe.skip('register', ()=>{

        // username and password get validation
        describe('given username and password are valid', ()=>{
            it('should return user payload', async ()=>{
                const createUserMockService = jest.spyOn(userService, 'createUser')
                // @ts-ignore
                .mockReturnValueOnce(userPayload);

                const {statusCode, body} = await supertest(app).post('/api/users').send(userInput)

                expect(statusCode).toBe(200);
                expect(body).toEqual(userPayload);

                expect(createUserMockService).toHaveBeenCalledWith(userInput);
            })
        })

        // verify that the passwords match
        describe('given passwords do not match', ()=>{
            it('should return a 400', async ()=>{
                    const createUserMockService = jest.spyOn(userService, 'createUser')
                    // @ts-ignore
                    .mockReturnValueOnce(userPayload);
    
                    const {statusCode} = await supertest(app).post('/api/users').send({...userInput, passwordConfirmation: 'doesnotmatch'})
    
                    expect(statusCode).toBe(400);
    
                    expect(createUserMockService).not.toHaveBeenCalledWith(userInput);
            })
        })

        // verify that the handler handes any errors
        describe('given user service throws error', ()=>{
            it('should hanlel error', async ()=>{

            })
        })

    })

    // creating user session
    describe('create user session', ()=>{

        // user logs in with valid email and password
        describe('given the username and password are valid', ()=>{
            it('should return a signed access and refresh token', async ()=>{
                jest.spyOn(userService, 'validatePassword')
                // @ts-ignore
                .mockReturnValue(userPayload);

                jest.spyOn(sessionService, 'createSession')
                // @ts-ignore
                .mockReturnValue(sessionPayload);

                const req = {
                    body: {
                        email: "test@example.com",
                        password: "1234556"
                    },
                    get: () => {
                        return "a user agaent"
                    }
                }

                const send = jest.fn()

                const res = {send}

                // @ts-ignore
                await createUserSessionHandler(req, res);

                expect(send).toHaveBeenCalledWith({
                    accessToken: expect.any(String),
                    refreshToken: expect.any(String),
                })
            })
        })
    })



    

    

    
})