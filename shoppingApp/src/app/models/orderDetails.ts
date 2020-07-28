export class OrderDetails {
    public constructor(
        public cart_id?:number,
        public total_price?:number,
        public city?: string,
        public address?: string,
        public shipping_date?: any,
        public order_time?:any,
        public credit?: number,
     
       
    ) { }
}

// user_id, cart_id, total_price, city, address, shipping_date,order_time,credit