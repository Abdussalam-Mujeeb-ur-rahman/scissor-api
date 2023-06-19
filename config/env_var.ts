import dotenv from 'dotenv';
dotenv.config();


export class Env_vars{
    public SECRET: string;
    public gmail: string;
    // public gmailPass: string;
    public SEC_KEY: string;

    constructor(){
        this.SECRET = process.env.SECRET! ;
        // this.gmailPass = process.env.GMAIL_PASS! ;
        this.gmail = process.env.GMAIL! ;
        this.SEC_KEY = process.env.SEC_KEY!;
    }
}