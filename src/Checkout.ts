import * as fs from 'fs';
import * as Type from './types'
import * as Enum from './enum'

export class Checkout {
    private pricingRules: Type.Pricing[]
    private totalAmount: number = 0;
    private productsInCart = new Map<string, number>();
    private products: Type.Product[];

    constructor(pricingRules: any){
        this.pricingRules = pricingRules;
        this.products = JSON.parse(fs.readFileSync('./config/products.json', {encoding: 'utf-8'}));
    }

    public scan(sku: string){
        let productCount = 1;
        const skuExistingCount = this.productsInCart.get(sku);           

        if(skuExistingCount) productCount += skuExistingCount;

        this.productsInCart.set(sku, productCount)
    }


    public total(): string {
        for (let [sku, count] of this.productsInCart) {
            const priceRule = this.pricingRules.find((price)=> price.product_sku === sku);
            const product = this.products.find((prod)=> prod.sku === sku);
            let total = 0;

            if(product){
                if(priceRule){
                    const originalTotal = product.price * count;

                    switch(priceRule.rule){
                        case Enum.Rule.BUY_X_FOR_Y:

                            if(count >= priceRule.x){
                               const group = count/priceRule.x;
                               const remaining = count - (priceRule.x * group);

                               total = remaining ? remaining * product.price : 0;
                               total += priceRule.y * product.price * group;
                            
                            } 
                            else
                                total = originalTotal;

                            break;

                        case  Enum.Rule.BUY_MORE_THAN:

                            if(count > priceRule.threshold)
                                total = priceRule.price * count;
                            else 
                                total = originalTotal;

                            break;

                        default:
                            total = originalTotal

                            break;
                    }
                } else {
                    total = count * product.price;
                }   
            }
            this.totalAmount += total

        }
        return Math.round(this.totalAmount).toFixed(2);
    }
}