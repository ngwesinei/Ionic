import { Product } from "./product";

export class Sale{
    key?:string;
    constructor(
        public product : Product,
        public qty : number,
        public team: string,
        public branch: string,
        public saleMan: string,
        public date: string,
        public customer: string,
        public amount: number,
        public productname: string
        
    ){}
}