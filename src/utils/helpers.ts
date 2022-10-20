import { IDec2Bin, TypeBin2Dec } from "@interfaces/utils.interface";
import { ShiftValues, ShiftHexValues, TotalBits } from "./constants";

export function string2Decimal({
  startValue,
  value,
  shiftValue,
}: IDec2Bin): any {
  return startValue | (value << BigInt(shiftValue));
}

export function decimal2String({ value, shiftValue }: TypeBin2Dec): any {
  return (value & BigInt(ShiftHexValues[shiftValue])) >> BigInt(shiftValue);
}

export function convertDecimal2IpString(value: bigint): string {
  let ipArr: number[] = Array.from(ShiftValues, (idx) =>
    decimal2String({ value, shiftValue: idx })
  );

  return ipArr.join(".");
}

export function convertIpString2Decimal(strIp: string): any {
  const arrIpValues: string[] = strIp.split(".").reverse();
  const arrShiftValue: IDec2Bin["shiftValue"][] = [...ShiftValues].reverse();
  // const arrShiftValue = ShiftValues.reverse(); // WRONG

  let ipDecimalValue = arrIpValues.reduce((accumulator, curValue, idx) => {
    const binValue = string2Decimal({
      startValue: BigInt(accumulator),
      value: BigInt(curValue),
      shiftValue: arrShiftValue[idx],
    });

    return binValue;
  }, 0);

  return ipDecimalValue;
}

export function getAddressesRangeSize(subnetSize: string): bigint {
  const hostQtdBitsRemaining = TotalBits.IPv4 - Number(subnetSize);
  const addressRangeSize = Math.pow(2, hostQtdBitsRemaining) - 1;
  return BigInt(addressRangeSize);
}

export function getSubnetworkMask(subnetSize: number) {
  // const masks = {
  //   [subnetSize >= 1 && subnetSize < 8]: "255.0.0.",
  // };
}
