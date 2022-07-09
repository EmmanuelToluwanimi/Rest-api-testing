import {Request, Response} from 'express';
import { DeleteProductInput, CreateProductInput, ReadProductInput, UpdateProductInput } from '../interfaces/types';
import {createProduct, findProduct, findAndUpdateProduct, deleteProduct} from '../service/product.service'

export async function createProductHandler(req:Request<{}, {}, CreateProductInput['body']>, res:Response) {
    
    try{
        const userId = res.locals.user._id;
        const body = req.body;
        const product = await createProduct({...body, user: userId})
 
        return res.send(product)

    } catch(error: any){
        return res.status(error.code || 500).send({error})
    }
}

export async function updateProductHandler(req:Request<UpdateProductInput['params']>, res:Response) {
    

    try{
        const userId = res.locals.user._id;
        const {pid} = req.params;
        const update = req.body;

        const product = await findProduct({pid});

        if(!product){
            return res.status(404).send({message: 'Product not found'})
        }

        if(String(product.user) !== userId){
            return res.status(403).send({message: 'Sorry, you can not perform this action'})
        }

        const updatedProduct = await findAndUpdateProduct({pid}, update, {new:true})
 
        return res.send(updatedProduct);

    } catch(error: any){
        console.log(error)
        return res.status(error.code || 500).send({error})
    }

}

export async function getProductHandler(req:Request<ReadProductInput['params']>, res:Response) {
    
    try{
        const {pid} = req.params;
        const product = await findProduct({pid});

        if(!product){
            return res.status(404).send({message: 'Product not found'})
        }
 
        return res.send(product);

    } catch(error: any){
        return res.status(error.code || 500).send({error})
    }
}

export async function deleteProductHandler(req:Request<DeleteProductInput['params']>, res:Response) {

    try{
        const userId = res.locals.user._id;
        const {pid} = req.params;
        const update = req.body;

        const product = await findProduct({pid});

        if(!product){
            return res.status(404).send({message: 'Product not found'})
        }

        if(String(product.user) !== userId){
            return res.status(403).send({message: 'Sorry, you can not perform this action'})
        }

        await deleteProduct({pid});
 
        return res.send("Product deleted");

    } catch(error: any){
        return res.status(error.code || 500).send({error})
    }
}