import { convertDecimal2IpString, convertIpString2Decimal } from "@utils";
import { findFirstAndLastIP } from "./findFirstAndLastIP";

export function findSubnetworks(
  IPv4NetworkAddress: string,
  value: number
): any {
  const [hostIp, subnetSize] = IPv4NetworkAddress.split("/");

  const qtdBitsSubnetwork = Math.ceil(Math.log2(value));

  const newMask = Number(subnetSize) + qtdBitsSubnetwork;
  const qtdSubnetworks = Math.pow(2, qtdBitsSubnetwork);

  const arrSubnetworks: any[] = [];
  Array.from({ length: qtdSubnetworks }).reduce((acc: bigint) => {
    const { firstHost, lastHost } = findFirstAndLastIP(
      `${convertDecimal2IpString(acc)}/${newMask}`
    );
    arrSubnetworks.push({ firstIp: firstHost, lastIp: lastHost });

    return convertIpString2Decimal(lastHost) + BigInt(1);
  }, convertIpString2Decimal(hostIp));

  return arrSubnetworks;
}
