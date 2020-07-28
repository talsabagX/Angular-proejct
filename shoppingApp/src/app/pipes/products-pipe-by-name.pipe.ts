import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'productsPipeByName'
})
export class ProductsPipeByNamePipe implements PipeTransform {

  transform(products: Product[], byName: string): any {
    return products.filter(product => product.product_name.includes(byName))
  }

}
