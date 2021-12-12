import ReconnectingWebSocket from "reconnecting-websocket";
import * as Y from "yjs";
import {
  Description,
  ParserDiff,
  ParserEditDescription,
} from "./pb/protobuf/parser/parser";

let states = new Map<string, Uint8Array>();

export const resetYDocs = (descriptions: Description[]) => {
  states = new Map<string, Uint8Array>();

  descriptions.forEach((description) => {
    // try...catchしてるのは互換性のため
    try {
      // TODO: DBへの保存方法が変わったら変更
      const state = Uint8Array.from(
        description.content.split(",").map((str) => parseInt(str))
      );
      states.set(description.hiqidashiId, state);
    } catch (e) {}
  });
};

export const applyDiff = (diff: ParserDiff, RWS: ReconnectingWebSocket) => {
  const state = states.get(diff.hiqidashiId);
  const ydoc = new Y.Doc();

  if (state) {
    Y.applyUpdate(ydoc, state);
  }

  try {
    Y.applyUpdate(ydoc, new Uint8Array(diff.diff));
    const newState = Y.encodeStateAsUpdate(ydoc);

    states.set(diff.hiqidashiId, newState);

    // TODO: DBへの保存方法が変わったら変更
    const editDescription = ParserEditDescription.fromJSON({
      description: {
        hiqidashiId: diff.hiqidashiId,
        content: newState.toString(),
      },
    });

    const send = ParserEditDescription.encode(editDescription).finish();
    RWS.send(new Uint8Array(send));
  } catch (e) {}
};
