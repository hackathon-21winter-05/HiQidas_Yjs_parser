import { applyDiff, resetYDocs } from "./yjs";
import { ParserSendData, ParserToken } from "./pb/protobuf/parser/parser";
import lodash from "lodash";
import WebSocket from "ws";

export const ConnectWS = (host: string, token: string) => {
  const WS = new WebSocket("ws://" + host + "/api/ws/parser");

  WS.binaryType = "arraybuffer";

  WS.onopen = () => {
    const parserToken = ParserToken.fromJSON({ token: token });
    const send = ParserToken.encode(parserToken).finish();
    WS.send(send);

    console.log(new Date(), "WebSocket connected");
  };

  WS.onclose = () => {
    console.log(
      new Date(),
      "WebSocket disconnected. Reconnecting in 1 minute..."
    );
    setTimeout(() => {
      ConnectWS(host, token);
    }, 60000);
  };

  WS.onerror = (error) => {
    console.error(new Date(), "Error: failed to connect to WebSocket\n", error);
  };

  WS.on("ping", (data) => {
    console.log(new Date(), "Got ping from server");
    WS.pong(data);
  });

  WS.onmessage = (e) => {
    if (!lodash.isArrayBuffer(e.data)) return;

    const data = ParserSendData.decode(new Uint8Array(e.data));
    if (!data.payload) {
      console.error(new Date(), "Error: no payload");
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
        console.error(new Date(), "Error: unknown payload");
    }
  };
};
