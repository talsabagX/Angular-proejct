export class Product{
    public constructor(
        public product_name:string,
        public category_id:number,
        public price:number,
        public path:string,
        public id?: number,
        public name?:string,

    ){ }
}