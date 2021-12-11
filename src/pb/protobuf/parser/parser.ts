/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "parser";

export interface ParserToken {
  token: string;
}

export interface ParserSendData {
  payload?:
    | { $case: "parserDiff"; parserDiff: ParserDiff }
    | { $case: "parserDescriptions"; parserDescriptions: ParserDescriptions };
}

export interface ParserDiff {
  hiqidashiId: string;
  diff: Uint8Array;
}

export interface ParserDescriptions {
  descriptions: Description[];
}

export interface ParserEditDescription {
  description: Description | undefined;
}

export interface Description {
  hiqidashiId: string;
  content: string;
}

const baseParserToken: object = { token: "" };

export const ParserToken = {
  encode(
    message: ParserToken,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ParserToken {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseParserToken } as ParserToken;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ParserToken {
    const message = { ...baseParserToken } as ParserToken;
    message.token =
      object.token !== undefined && object.token !== null
        ? String(object.token)
        : "";
    return message;
  },

  toJSON(message: ParserToken): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ParserToken>, I>>(
    object: I
  ): ParserToken {
    const message = { ...baseParserToken } as ParserToken;
    message.token = object.token ?? "";
    return message;
  },
};

const baseParserSendData: object = {};

export const ParserSendData = {
  encode(
    message: ParserSendData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.payload?.$case === "parserDiff") {
      ParserDiff.encode(
        message.payload.parserDiff,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.payload?.$case === "parserDescriptions") {
      ParserDescriptions.encode(
        message.payload.parserDescriptions,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ParserSendData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseParserSendData } as ParserSendData;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.payload = {
            $case: "parserDiff",
            parserDiff: ParserDiff.decode(reader, reader.uint32()),
          };
          break;
        case 2:
          message.payload = {
            $case: "parserDescriptions",
            parserDescriptions: ParserDescriptions.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ParserSendData {
    const message = { ...baseParserSendData } as ParserSendData;
    if (object.parserDiff !== undefined && object.parserDiff !== null) {
      message.payload = {
        $case: "parserDiff",
        parserDiff: ParserDiff.fromJSON(object.parserDiff),
      };
    }
    if (
      object.parserDescriptions !== undefined &&
      object.parserDescriptions !== null
    ) {
      message.payload = {
        $case: "parserDescriptions",
        parserDescriptions: ParserDescriptions.fromJSON(
          object.parserDescriptions
        ),
      };
    }
    return message;
  },

  toJSON(message: ParserSendData): unknown {
    const obj: any = {};
    message.payload?.$case === "parserDiff" &&
      (obj.parserDiff = message.payload?.parserDiff
        ? ParserDiff.toJSON(message.payload?.parserDiff)
        : undefined);
    message.payload?.$case === "parserDescriptions" &&
      (obj.parserDescriptions = message.payload?.parserDescriptions
        ? ParserDescriptions.toJSON(message.payload?.parserDescriptions)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ParserSendData>, I>>(
    object: I
  ): ParserSendData {
    const message = { ...baseParserSendData } as ParserSendData;
    if (
      object.payload?.$case === "parserDiff" &&
      object.payload?.parserDiff !== undefined &&
      object.payload?.parserDiff !== null
    ) {
      message.payload = {
        $case: "parserDiff",
        parserDiff: ParserDiff.fromPartial(object.payload.parserDiff),
      };
    }
    if (
      object.payload?.$case === "parserDescriptions" &&
      object.payload?.parserDescriptions !== undefined &&
      object.payload?.parserDescriptions !== null
    ) {
      message.payload = {
        $case: "parserDescriptions",
        parserDescriptions: ParserDescriptions.fromPartial(
          object.payload.parserDescriptions
        ),
      };
    }
    return message;
  },
};

const baseParserDiff: object = { hiqidashiId: "" };

export const ParserDiff = {
  encode(
    message: ParserDiff,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.hiqidashiId !== "") {
      writer.uint32(10).string(message.hiqidashiId);
    }
    if (message.diff.length !== 0) {
      writer.uint32(18).bytes(message.diff);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ParserDiff {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseParserDiff } as ParserDiff;
    message.diff = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hiqidashiId = reader.string();
          break;
        case 2:
          message.diff = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ParserDiff {
    const message = { ...baseParserDiff } as ParserDiff;
    message.hiqidashiId =
      object.hiqidashiId !== undefined && object.hiqidashiId !== null
        ? String(object.hiqidashiId)
        : "";
    message.diff =
      object.diff !== undefined && object.diff !== null
        ? bytesFromBase64(object.diff)
        : new Uint8Array();
    return message;
  },

  toJSON(message: ParserDiff): unknown {
    const obj: any = {};
    message.hiqidashiId !== undefined &&
      (obj.hiqidashiId = message.hiqidashiId);
    message.diff !== undefined &&
      (obj.diff = base64FromBytes(
        message.diff !== undefined ? message.diff : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ParserDiff>, I>>(
    object: I
  ): ParserDiff {
    const message = { ...baseParserDiff } as ParserDiff;
    message.hiqidashiId = object.hiqidashiId ?? "";
    message.diff = object.diff ?? new Uint8Array();
    return message;
  },
};

const baseParserDescriptions: object = {};

export const ParserDescriptions = {
  encode(
    message: ParserDescriptions,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.descriptions) {
      Description.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ParserDescriptions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseParserDescriptions } as ParserDescriptions;
    message.descriptions = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.descriptions.push(
            Description.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ParserDescriptions {
    const message = { ...baseParserDescriptions } as ParserDescriptions;
    message.descriptions = (object.descriptions ?? []).map((e: any) =>
      Description.fromJSON(e)
    );
    return message;
  },

  toJSON(message: ParserDescriptions): unknown {
    const obj: any = {};
    if (message.descriptions) {
      obj.descriptions = message.descriptions.map((e) =>
        e ? Description.toJSON(e) : undefined
      );
    } else {
      obj.descriptions = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ParserDescriptions>, I>>(
    object: I
  ): ParserDescriptions {
    const message = { ...baseParserDescriptions } as ParserDescriptions;
    message.descriptions =
      object.descriptions?.map((e) => Description.fromPartial(e)) || [];
    return message;
  },
};

const baseParserEditDescription: object = {};

export const ParserEditDescription = {
  encode(
    message: ParserEditDescription,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.description !== undefined) {
      Description.encode(
        message.description,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ParserEditDescription {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseParserEditDescription } as ParserEditDescription;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.description = Description.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ParserEditDescription {
    const message = { ...baseParserEditDescription } as ParserEditDescription;
    message.description =
      object.description !== undefined && object.description !== null
        ? Description.fromJSON(object.description)
        : undefined;
    return message;
  },

  toJSON(message: ParserEditDescription): unknown {
    const obj: any = {};
    message.description !== undefined &&
      (obj.description = message.description
        ? Description.toJSON(message.description)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ParserEditDescription>, I>>(
    object: I
  ): ParserEditDescription {
    const message = { ...baseParserEditDescription } as ParserEditDescription;
    message.description =
      object.description !== undefined && object.description !== null
        ? Description.fromPartial(object.description)
        : undefined;
    return message;
  },
};

const baseDescription: object = { hiqidashiId: "", content: "" };

export const Description = {
  encode(
    message: Description,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.hiqidashiId !== "") {
      writer.uint32(10).string(message.hiqidashiId);
    }
    if (message.content !== "") {
      writer.uint32(18).string(message.content);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Description {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDescription } as Description;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hiqidashiId = reader.string();
          break;
        case 2:
          message.content = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Description {
    const message = { ...baseDescription } as Description;
    message.hiqidashiId =
      object.hiqidashiId !== undefined && object.hiqidashiId !== null
        ? String(object.hiqidashiId)
        : "";
    message.content =
      object.content !== undefined && object.content !== null
        ? String(object.content)
        : "";
    return message;
  },

  toJSON(message: Description): unknown {
    const obj: any = {};
    message.hiqidashiId !== undefined &&
      (obj.hiqidashiId = message.hiqidashiId);
    message.content !== undefined && (obj.content = message.content);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Description>, I>>(
    object: I
  ): Description {
    const message = { ...baseDescription } as Description;
    message.hiqidashiId = object.hiqidashiId ?? "";
    message.content = object.content ?? "";
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(""));
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string }
  ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & {
      $case: T["$case"];
    }
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
