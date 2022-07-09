import supertest from "supertest";
import { app } from "../app";


describe('product', () => {
    describe('get product router', () => {
        describe('given the product does not exist', () => {
            it('should return a 404', async () => {
                // expect(true).toBe(true);
                const pid = 'product_123';

                await supertest(app).get(`/api/products/${pid}`).expect(404) 
            })
        })
    });
});