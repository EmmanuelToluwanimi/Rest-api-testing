import mongoose from "mongoose";
// import {customAlphabet} from 'nanoid';
import { IProduct } from "../interfaces";

// const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);

const productSchema = new mongoose.Schema({
    
    pid: {
        type: String,
        required: true,
        unique: true,
        default: () => `product_${Math.floor(Math.random()*1000000)}`
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true
})

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;