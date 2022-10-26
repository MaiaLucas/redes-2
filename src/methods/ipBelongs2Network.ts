import { convertIpString2Decimal } from "@utils";
import { findFirstAndLastIP } from "./findFirstAndLastIP";

export function ipBelongs2Network(
  IPv4NetworkAddress: string,
  ipAddress: string
): any {
  const { firstHost, lastHost } = findFirstAndLastIP(IPv4NetworkAddress);

  const ipBelongs =
    convertIpString2Decimal(ipAddress) >= convertIpString2Decimal(firstHost) &&
    convertIpString2Decimal(ipAddress) <= convertIpString2Decimal(lastHost);
  return {
    network: IPv4NetworkAddress,
    ip: ipAddress,
    belongs: ipBelongs,
  };
}
