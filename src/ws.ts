import ReconnectingWebSocket from "reconnecting-websocket";
import { applyDiff, resetYDocs } from "./editors";
import { YjsSendData } from "./pb/protobuf/yjs/yjs";

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
    const data = YjsSendData.decode(new Uint8Array(e.data));
    if (!data.payload) {
      console.log("no payload");
      return;
    }

    switch (data.payload.$case) {
      case "yjsDiff":
        applyDiff(data.payload.yjsDiff, RWS);
        break;

      case "yjsDescriptions":
        resetYDocs(data.payload.yjsDescriptions.descriptions);
        break;

      default:
        console.log("unknown payload");
    }
  };
};
