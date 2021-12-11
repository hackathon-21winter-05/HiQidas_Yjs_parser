import { ConnectWS } from "./ws";

const env = process.env;

if (env.SERVER_HOST && env.TOKEN) {
  ConnectWS(env.SERVER_HOST, env.TOKEN);
}
