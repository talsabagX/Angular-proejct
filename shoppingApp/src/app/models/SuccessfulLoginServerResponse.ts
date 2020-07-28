export class SuccessfulLoginServerResponse {
    public constructor(
                public token: any,
                public user_type: string,
                public name?: string,
                public last_name?: string,
                // public user_id?:number
                ) { }
        }



