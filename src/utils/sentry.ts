import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { Application } from 'express';

import {Env_vars} from '../../config/env_var';

const env_var = new Env_vars();

export const initializeSentry = (app: Application) => {
    Sentry.init({
        dsn: env_var.DSN,   
        integrations: [
            // enable http calls tracing
            new Sentry.Integrations.Http({ tracing: true }),
            // enable express middleware tracing
            new Sentry.Integrations.Express({ app: app })  , 
        ],
        tracesSampleRate: 1.0,
    })
};