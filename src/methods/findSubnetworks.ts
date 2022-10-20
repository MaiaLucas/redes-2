import {
  convertDecimal2IpString,
  convertIpString2Decimal,
  getAddressesRangeSize,
  TotalBits,
} from "@utils";

export function findSubnetworks(
  IPv4NetworkAddress: string,
  value: number
): any {
  const [hostIp, subnetSize] = IPv4NetworkAddress.split("/");
  const hostQtdBitsRemaining = TotalBits.IPv4 - Number(subnetSize);
  const addressRangeSize = getAddressesRangeSize(subnetSize);

  const subnetworkMask =
    addressRangeSize - BigInt(Math.pow(2, hostQtdBitsRemaining));

  const firstIp: any = convertIpString2Decimal(hostIp);
  const lastIpPossible: any = firstIp + addressRangeSize;

  console.log({
    addressRangeSize,
    foo: BigInt(Math.pow(2, hostQtdBitsRemaining) - 2),
    first: convertDecimal2IpString(firstIp),
    last: convertDecimal2IpString(lastIpPossible),
  });
  // const { first, last } = findFirstAndLastIP(IPv4NetworkAddress);
  return;
}
