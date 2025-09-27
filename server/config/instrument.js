// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";

Sentry.init({
    dsn: "https://a28b54b2f5f2d0fcb0df21845f3c9d60@o4510091274354688.ingest.us.sentry.io/4510091277303808",
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
    integrations: [Sentry.mongooseIntegration()],

    //tracesSampleRate: 1.0,
});