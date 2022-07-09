import { TypeOf } from "zod"
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "../schema/product.schema"


export type CreateProductInput = TypeOf<typeof createProductSchema>

export type UpdateProductInput = TypeOf<typeof updateProductSchema>

export type ReadProductInput = TypeOf<typeof getProductSchema>

export type DeleteProductInput = TypeOf<typeof deleteProductSchema>