import supertest from "supertest";
import createServer from "../utils/server";
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createProduct } from "../service/product.service";

const app = createServer()

const userId = new mongoose.Types.ObjectId().toString();

export const productPayload = {
    user: userId,
    title: "Mtn Mifi router",
    description: "lorem ipsum dolor sit amet",
    price: 299.99,
    image: "https://source.unsplash.com/user/c_v_r/100x100"
}

describe('product', () => {

    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();

        await mongoose.connect(mongoServer.getUri());
    })

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();

    })

    describe('get product router', () => {

        /**
         * @Test : Jest test when a product does not exist.
         */
        describe('given the product does not exist', () => {
            it('should return a 404', async () => {
                // expect(true).toBe(true);
                const pid = 'product_123';

                await supertest(app).get(`/api/products/${pid}`).expect(404)
            })
        })

        /**
         * @Test : Jest test when a product exist.
         */
        describe('given the product does exist', () => {
            it('should return a 200 status and the product', async () => {

                const product = await createProduct(productPayload);

                // expect(true).toBe(true);
                const pid = 'product_123';

                const { body, statusCode } = await supertest(app).get(`/api/products/${product.pid}`) //.expect(200) --supertest

                expect(statusCode).toBe(200); // --jest
                expect(body.pid).toBe(product.pid);
                expect(body.title).toBe(product.title);
            })
        })
    });
});