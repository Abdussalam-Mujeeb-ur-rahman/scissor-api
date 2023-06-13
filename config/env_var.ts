import dotenv from 'dotenv';
dotenv.config();


export class Env_vars{
    public SECRET: string;

    constructor(){
        this.SECRET = process.env.SECRET! ;
    }
}