import { Application } from 'express';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { initializeSentry } from '../../src/utils/sentry';
import { Env_vars } from '../../config/env_var';

jest.mock('@sentry/node');

describe('initializeSentry', () => {
  it('initializes Sentry with the correct parameters', () => {
    const app = {} as Application;
    const env_var = new Env_vars();
    const dsn = env_var.DSN;

    initializeSentry(app);

    expect(Sentry.init).toHaveBeenCalledWith(expect.objectContaining({
      dsn: dsn,
      integrations: expect.arrayContaining([
        expect.any(Sentry.Integrations.Http),
        expect.any(Sentry.Integrations.Express)
      ]),
      tracesSampleRate: 1.0
    }));
  });
});
