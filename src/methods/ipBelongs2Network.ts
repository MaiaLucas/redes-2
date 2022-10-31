import { convertIpString2Decimal } from "@utils";
import { findFirstAndLastIP } from "./findFirstAndLastIP";

// Verifica se IP informado faz parte de uma rede informada
export function ipBelongs2Network(
  IPv4NetworkAddress: string,
  ipAddress: string
): any {
  // Chama o método usado para a primeira questão
  const { firstHost, lastHost } = findFirstAndLastIP(IPv4NetworkAddress);

  // Verifica se o valor decimal (binário) do ip informado é maior 
  // que ou igual ao valor decimal (binário) do primeiro ip retornado pela função findFirstAndLastIP 
  // e é menor que ou igual ao valor decimal (binário) do último ip retornado pela função findFirstAndLastIP
  const ipBelongs =
    convertIpString2Decimal(ipAddress) >= convertIpString2Decimal(firstHost) &&
    convertIpString2Decimal(ipAddress) <= convertIpString2Decimal(lastHost);

  // Retorna para o usuário a rede que foi enviada, o IP que foi enviado, e se ele pertence a rede.
  return {
    network: IPv4NetworkAddress,
    ip: ipAddress,
    belongs: ipBelongs,
  };
}
