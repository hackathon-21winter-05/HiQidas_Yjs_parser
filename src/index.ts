import ReconnectingWebSocket from "reconnecting-websocket";

const env = process.env;

const RWS = new ReconnectingWebSocket(
  "wss://" + env.SERVER_HOST + "/api/ws/yjs-admin"
);

RWS.binaryType = "arraybuffer";

RWS.onopen = () => {
  console.log("connected");
};

RWS.onclose = () => {
  console.log("disconnected");
};

RWS.onerror = (error) => {
  console.log("error ocurred", error);
};

export default RWS;
