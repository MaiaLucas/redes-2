export function findSubnetworks(
  IPv4NetworkAddress: string,
  value: number
): any {
  const [hostIp, _] = IPv4NetworkAddress.split("/");
  const qtdBitsSubnetwork = Math.ceil(Math.log2(value));

  console.log({
    hostIp,
    qtdBitsSubnetwork,
    subnetworkMask: 256 - qtdBitsSubnetwork,
  });
  return;
}
