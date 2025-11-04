import * as Sentry from "@sentry/node";
import "@sentry/tracing"; // optional: if you want tracing

Sentry.init({
    dsn: "https://a28b54b2f5f2d0fcb0df21845f3c9d60@o4510091274354688.ingest.us.sentry.io/4510091277303808",
    sendDefaultPii: true,
    integrations: [Sentry.mongooseIntegration()],
    tracesSampleRate: 1.0, // Enable performance monitoring
});

export default Sentry;
