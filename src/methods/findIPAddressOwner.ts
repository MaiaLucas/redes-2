import { ipBelongs2Network } from "./ipBelongs2Network";

export function findIPAddressOwner(
  IPv4NetworkAddresses: string[],
  ipAddress: string
): any {
  const owners = IPv4NetworkAddresses.filter((network) => {
    const { belongs } = ipBelongs2Network(network, ipAddress);
    return belongs;
  });
  const subnetworkOwner = owners.reduce(
    (acc, current) => {
      const [ipCurrent, currentSubnetworkMask] = current.split("/");
      const [ipAccumulator, accumulatorSubnetworkMask] = acc.split("/");

      return currentSubnetworkMask >= accumulatorSubnetworkMask ? current : acc;
    },
    owners[0] // valor inicial
  );

  console.log({ owners, subnetworkOwner });

  return {
    ipAddress,
    owner: Boolean(subnetworkOwner) ? subnetworkOwner : "404 - Not found",
  };
}
