import { convertIpString2Decimal } from "@utils";
import { findFirstAndLastIP } from "./findFirstAndLastIP";

export function ipBelongs2Network(
  IPv4NetworkAddress: string,
  ipAddress: string
): boolean {
  const { firstHost, lastHost } = findFirstAndLastIP(IPv4NetworkAddress);

  return (
    convertIpString2Decimal(ipAddress) >= convertIpString2Decimal(firstHost) &&
    convertIpString2Decimal(ipAddress) <= convertIpString2Decimal(lastHost)
  );
}
