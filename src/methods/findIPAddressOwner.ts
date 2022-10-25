import { ipBelongs2Network } from "./ipBelongs2Network";

export function findIPAddressOwner(
  IPv4NetworkAddresses: string[],
  ipAddress: string
): any {
  const subnetworkOwner = IPv4NetworkAddresses.filter(
    (network) => ipBelongs2Network(network, ipAddress).ipBelongs2Network
  );
  console.log({ subnetworkOwner });

  return subnetworkOwner;
}
