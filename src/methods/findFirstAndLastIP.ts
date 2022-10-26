import FirstAndLastIP from "@interfaces/methods.interface";
import {
  convertDecimal2IpString,
  convertIpString2Decimal,
  getAddressesRangeSize,
} from "@utils";

export function findFirstAndLastIP(IPv4NetworkAddress: string): FirstAndLastIP {
  const [hostIp, subnetSize] = IPv4NetworkAddress.split("/");

  const firstIp: any = convertIpString2Decimal(hostIp); // big int
  const lastIpPossible: any = firstIp + getAddressesRangeSize(subnetSize);

  return {
    network: IPv4NetworkAddress,
    range: `${convertDecimal2IpString(firstIp)} ➢ ${convertDecimal2IpString(
      lastIpPossible
    )}`,
    firstHost: convertDecimal2IpString(firstIp), // convertDecimal2IpString(firstIp + BigInt(1)),
    lastHost: convertDecimal2IpString(lastIpPossible), //convertDecimal2IpString(lastIpPossible - BigInt(1)),
    // broadcast: convertDecimal2IpString(lastIpPossible),
  };
}
