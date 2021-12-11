import ReconnectingWebSocket from "reconnecting-websocket";
import { applyDiff, resetYDocs } from "./editors";
import { ParserSendData } from "./pb/protobuf/parser/parser";

export const ConnectWS = (host: string) => {
  const RWS = new ReconnectingWebSocket("wss://" + host + "/api/ws/parser");

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

  RWS.onmessage = (e) => {
    const data = ParserSendData.decode(new Uint8Array(e.data));
    if (!data.payload) {
      console.log("no payload");
      return;
    }

    switch (data.payload.$case) {
      case "parserDiff":
        applyDiff(data.payload.parserDiff, RWS);
        break;

      case "parserDescriptions":
        resetYDocs(data.payload.parserDescriptions.descriptions);
        break;

      default:
        console.log("unknown payload");
    }
  };
};
