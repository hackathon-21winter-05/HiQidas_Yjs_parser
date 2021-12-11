import ReconnectingWebSocket from "reconnecting-websocket";
import {
  Description,
  YjsDiff,
  YjsEditDescription,
} from "./pb/protobuf/yjs/yjs";
import { Editor } from "@tiptap/core";
import * as Y from "yjs";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";

let editors = new Map<string, { yDoc: Y.Doc; editor: Editor }>();

export const resetYDocs = (descriptions: Description[]) => {
  editors = new Map<string, { yDoc: Y.Doc; editor: Editor }>();
  descriptions.forEach((description) => {
    const yDoc = new Y.Doc();

    const editor = new Editor({
      content: description.content,
      extensions: [
        StarterKit.configure({
          history: false,
        }),
        Collaboration.configure({
          document: yDoc,
        }),
      ],
    });

    editors.set(description.hiqidashiId, { yDoc, editor });
  });
};

export const applyDiff = (diff: YjsDiff, RWS: ReconnectingWebSocket) => {
  const map = editors.get(diff.hiqidashiId);
  if (!map) return;

  Y.applyUpdate(map.yDoc, new Uint8Array(diff.diff));

  const newDescription = map.editor.getText();
  const editDescription = YjsEditDescription.fromJSON({
    hiqidashiId: diff.hiqidashiId,
    content: newDescription,
  });

  const send = YjsEditDescription.encode(editDescription).finish();
  RWS.send(send);
};
