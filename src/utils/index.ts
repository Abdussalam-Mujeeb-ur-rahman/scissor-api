import crypto from 'crypto';
import {Env_vars} from '../../config/env_var';

const env_vars = new Env_vars;


export const random = () => crypto.randomBytes(128).toString('base64');
export const Authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(env_vars.SECRET).digest('hex');
}    