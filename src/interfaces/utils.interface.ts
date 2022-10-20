export interface IDec2Bin {
  startValue: bigint;
  value: bigint;
  shiftValue: 0 | 8 | 16 | 24;
}

export type TypeBin2Dec = Omit<IDec2Bin, "startValue">;
