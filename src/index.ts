import { ConnectWS } from "./ws";

const env = process.env;

if (env.SERVER_HOST && env.TOKEN) {
  ConnectWS(env.SERVER_HOST, env.TOKEN);
} else {
  console.error(new Date(), "Error: env var SERVER_HOST or TOKEN is not set");
}
