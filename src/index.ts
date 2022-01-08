import { ConnectWS } from "./ws";

const env = process.env;

if (!env.SERVER_HOST || !env.TOKEN) {
  throw new Error("env var SERVER_HOST or TOKEN is not set");
}
if (env.INSECURE && env.INSECURE !== "true" && env.INSECURE !== "false") {
  throw new Error("env var INSECURE is invalid");
}

ConnectWS(env.SERVER_HOST, env.TOKEN, env.INSECURE === "true" ? true : false);
