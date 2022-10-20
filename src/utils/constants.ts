import { IDec2Bin } from "@interfaces/utils.interface";

export enum TotalBits {
  IPv4 = 32,
  IPv6 = 64,
}

export const ShiftHexValues = {
  "0": 0xff,
  "8": 0xff00,
  "16": 0xff0000,
  "24": 0xff000000,
};

export const ShiftValues: IDec2Bin["shiftValue"][] = [24, 16, 8, 0];
