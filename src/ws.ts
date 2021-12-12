import ReconnectingWebSocket from "reconnecting-websocket";
import { applyDiff, resetYDocs } from "./yjs";
import { ParserSendData, ParserToken } from "./pb/protobuf/parser/parser";
import WS from "ws";

export const ConnectWS = (host: string, token: string) => {
  const RWS = new ReconnectingWebSocket("ws://" + host + "/api/ws/parser", [], {
    WebSocket: WS,
  });

  RWS.binaryType = "arraybuffer";

  RWS.onopen = () => {
    const parserToken = ParserToken.fromJSON({ token: token });
    const send = ParserToken.encode(parserToken).finish();
    RWS.send(send);

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
