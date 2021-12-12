import ReconnectingWebSocket from "reconnecting-websocket";
import * as Y from "yjs";
import {
  Description,
  ParserDiff,
  ParserEditDescription,
} from "./pb/protobuf/parser/parser";

let editors = new Map<string, Y.Doc>();

export const resetYDocs = (descriptions: Description[]) => {
  editors = new Map<string, Y.Doc>();
  descriptions.forEach((description) => {
    const yDoc = new Y.Doc();

    const yText = new Y.XmlText(description.content);
    yDoc.getXmlFragment("default").insert(0, [yText]);

    editors.set(description.hiqidashiId, yDoc);
  });
};

export const applyDiff = (diff: ParserDiff, RWS: ReconnectingWebSocket) => {
  const map = editors.get(diff.hiqidashiId);
  if (!map) return;

  Y.applyUpdate(map, new Uint8Array(diff.diff));
  const state = Y.encodeStateAsUpdate(map);

  // TODO: DBにバイナリが入るようになったらprotobufを再生成してtoString()を消す
  const editDescription = ParserEditDescription.fromJSON({
    description: {
      hiqidashiId: diff.hiqidashiId,
      content: state.toString(),
    },
  });

  const send = ParserEditDescription.encode(editDescription).finish();
  console.log(ParserEditDescription.decode(send));
  RWS.send(new Uint8Array(send));
};
