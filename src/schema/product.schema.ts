import {object, string, number} from 'zod'

const productPayload = {
    body: object({
        title: string({
            required_error: 'Title is required',
        }),
        description: string({
            required_error: 'description is required',
        }).min(120, 'Description should be atleast 120 chars long'),
        price: number({
            required_error: 'Price is required',
        }),
        image: string({
            required_error: 'Image is required',
        }),
        
    })
}

const productParams = {
    params: object({
        pid: string({
            required_error: 'Product is required'
        })
    })
}

export const createProductSchema = object({
    ...productPayload
})

export const updateProductSchema = object({
    // ...productPayload,
    ...productParams
})

export const getProductSchema = object({
    ...productParams
})

export const deleteProductSchema = object({
    ...productParams
})

