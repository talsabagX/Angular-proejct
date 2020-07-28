export class CartItem{
    public constructor(
        public id?: number,
        public productId?: number,
        public amount?: number,
        public totalPrice?: number,
        public cart_id?: number,
        public productName?:any,
    ){ }
}
