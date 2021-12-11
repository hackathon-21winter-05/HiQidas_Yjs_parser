/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "yjs";

export interface YjsDiff {
  hiqidashiId: string;
  diff: Uint8Array;
}

export interface YjsEditDescription {
  description: Description | undefined;
}

export interface YjsEditDescriptions {
  descriptions: Description[];
}

export interface Description {
  hiqidashiId: string;
  description: string;
}

const baseYjsDiff: object = { hiqidashiId: "" };

export const YjsDiff = {
  encode(
    message: YjsDiff,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): YjsDiff {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseYjsDiff } as YjsDiff;
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

  fromJSON(object: any): YjsDiff {
    const message = { ...baseYjsDiff } as YjsDiff;
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

  toJSON(message: YjsDiff): unknown {
    const obj: any = {};
    message.hiqidashiId !== undefined &&
      (obj.hiqidashiId = message.hiqidashiId);
    message.diff !== undefined &&
      (obj.diff = base64FromBytes(
        message.diff !== undefined ? message.diff : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<YjsDiff>, I>>(object: I): YjsDiff {
    const message = { ...baseYjsDiff } as YjsDiff;
    message.hiqidashiId = object.hiqidashiId ?? "";
    message.diff = object.diff ?? new Uint8Array();
    return message;
  },
};

const baseYjsEditDescription: object = {};

export const YjsEditDescription = {
  encode(
    message: YjsEditDescription,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): YjsEditDescription {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseYjsEditDescription } as YjsEditDescription;
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

  fromJSON(object: any): YjsEditDescription {
    const message = { ...baseYjsEditDescription } as YjsEditDescription;
    message.description =
      object.description !== undefined && object.description !== null
        ? Description.fromJSON(object.description)
        : undefined;
    return message;
  },

  toJSON(message: YjsEditDescription): unknown {
    const obj: any = {};
    message.description !== undefined &&
      (obj.description = message.description
        ? Description.toJSON(message.description)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<YjsEditDescription>, I>>(
    object: I
  ): YjsEditDescription {
    const message = { ...baseYjsEditDescription } as YjsEditDescription;
    message.description =
      object.description !== undefined && object.description !== null
        ? Description.fromPartial(object.description)
        : undefined;
    return message;
  },
};

const baseYjsEditDescriptions: object = {};

export const YjsEditDescriptions = {
  encode(
    message: YjsEditDescriptions,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.descriptions) {
      Description.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): YjsEditDescriptions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseYjsEditDescriptions } as YjsEditDescriptions;
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

  fromJSON(object: any): YjsEditDescriptions {
    const message = { ...baseYjsEditDescriptions } as YjsEditDescriptions;
    message.descriptions = (object.descriptions ?? []).map((e: any) =>
      Description.fromJSON(e)
    );
    return message;
  },

  toJSON(message: YjsEditDescriptions): unknown {
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

  fromPartial<I extends Exact<DeepPartial<YjsEditDescriptions>, I>>(
    object: I
  ): YjsEditDescriptions {
    const message = { ...baseYjsEditDescriptions } as YjsEditDescriptions;
    message.descriptions =
      object.descriptions?.map((e) => Description.fromPartial(e)) || [];
    return message;
  },
};

const baseDescription: object = { hiqidashiId: "", description: "" };

export const Description = {
  encode(
    message: Description,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.hiqidashiId !== "") {
      writer.uint32(10).string(message.hiqidashiId);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
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
          message.description = reader.string();
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
    message.description =
      object.description !== undefined && object.description !== null
        ? String(object.description)
        : "";
    return message;
  },

  toJSON(message: Description): unknown {
    const obj: any = {};
    message.hiqidashiId !== undefined &&
      (obj.hiqidashiId = message.hiqidashiId);
    message.description !== undefined &&
      (obj.description = message.description);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Description>, I>>(
    object: I
  ): Description {
    const message = { ...baseDescription } as Description;
    message.hiqidashiId = object.hiqidashiId ?? "";
    message.description = object.description ?? "";
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
