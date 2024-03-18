import * as fs from 'fs'
import { Checkout } from "./src/Checkout";

const pricingRules = JSON.parse(fs.readFileSync('./config/pricing.json', {encoding: 'utf-8'}));

const co = new Checkout(pricingRules);

// Case 1:

// co.scan('ipd');
// co.scan('ipd');
// co.scan('ipd');
// co.scan('ipd');
// co.scan('ipd');

// Case 2:
co.scan('atv');
co.scan('atv');
co.scan('atv');
co.scan('vga');


const total = co.total()

console.log(`Total expected: $${total}`)

