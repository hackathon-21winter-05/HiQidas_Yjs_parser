import { applyDiff, resetYDocs } from "./yjs";
import { ParserSendData, ParserToken } from "./pb/protobuf/parser/parser";
import lodash from "lodash";
import WebSocket from "ws";

export const ConnectWS = (host: string, token: string) => {
  const WS = new WebSocket("wss://" + host + "/api/ws/parser");

  WS.binaryType = "arraybuffer";

  WS.onopen = () => {
    const parserToken = ParserToken.fromJSON({ token: token });
    const send = ParserToken.encode(parserToken).finish();
    WS.send(send);

    console.log("connected");
  };

  WS.onclose = () => {
    console.log("disconnected");
    setTimeout(() => {
      ConnectWS(host, token);
    }, 60000);
  };

  WS.onerror = (error) => {
    console.log("error ocurred\n", error);
  };

  WS.on("ping", (data) => {
    WS.pong(data);
  });

  WS.onmessage = (e) => {
    if (!lodash.isArrayBuffer(e.data)) return;

    const data = ParserSendData.decode(new Uint8Array(e.data));
    if (!data.payload) {
      console.log("no payload");
      return;
    }

    switch (data.payload.$case) {
      case "parserDiff":
        applyDiff(data.payload.parserDiff, WS);
        break;

      case "parserDescriptions":
        resetYDocs(data.payload.parserDescriptions.descriptions);
        break;

      default:
        console.log("unknown payload");
    }
  };
};
