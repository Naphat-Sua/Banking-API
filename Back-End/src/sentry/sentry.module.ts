import { Module } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SentryService } from './sentry.service';
import { SentryInterceptor } from './sentry.interceptor';

export const SENTRY_OPTIONS = 'SENTRY_OPTIONS';

@Module({
  providers: [SentryService],
})
export class SentryModule {
  static forRoot(options: Sentry.NodeOptions) {
    // initialization of Sentry, this is where Sentry will create a Hub
    //Sentry.init(options);
    Sentry.init({
      dsn: "https://5ce311cd2624453dab9b98565960081c@o4505503265652736.ingest.sentry.io/4505504451002368",
    
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    });
    return {
      module: SentryModule,
      providers: [
        {
          provide: SENTRY_OPTIONS,
          useValue: options,
        },
        SentryService,
        {
          provide: APP_INTERCEPTOR,
          useClass: SentryInterceptor,
        },
      ],
      exports: [SentryService],
    };
  }
}
