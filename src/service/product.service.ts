import {DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery} from 'mongoose'
import Product from "../models/product.model";
import {IProduct} from '../interfaces'


export async function createProduct(input: DocumentDefinition<Omit<IProduct, 'createdAt' | 'updatedAt'>>){
    return Product.create(input);
}

export async function findProduct(query: FilterQuery<IProduct>, options: QueryOptions = {lean: true}){
    return Product.findOne(query, {}, options);
}

export async function findAndUpdateProduct(
    query: FilterQuery<IProduct>, update: UpdateQuery<IProduct>, options: QueryOptions
){
    return Product.findOneAndUpdate(query, update, options);
}

export async function deleteProduct(query:FilterQuery<IProduct>){
    return Product.deleteOne(query);
}