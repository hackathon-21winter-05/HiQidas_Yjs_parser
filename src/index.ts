import { ConnectWS } from "./ws";

const env = process.env;

if (env.SERVER_HOST) {
  ConnectWS(env.SERVER_HOST);
}
