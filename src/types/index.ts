import * as Enum from '../enum'

export type Product = {
    sku: string;
    name: string;
    price: number;
}

export type ProductInCart = {
    sku: string;
    count: number;
}

export interface Pricing {
    id: string,
    product_sku: string,
    rule : Enum.Rule,
    x: number,
    y: number;
    price: number;
    threshold: number;
}