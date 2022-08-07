import { setupWorker } from 'msw';
import { handlers } from './handlers';
// This configures a request mocking server with the given request handlers.
export const worker = setupWorker(...handlers);

//timers-browserify
//resolve.fallback: { "timers": require.resolve("timers-browserify") }
