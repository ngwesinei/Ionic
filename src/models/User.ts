export class User{
    
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public level:string,
        public photoURL?:string
    ){}
}