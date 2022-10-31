import FirstAndLastIP from "@interfaces/methods.interface";
import {
  convertDecimal2IpString,
  convertIpString2Decimal,
  getAddressesRangeSize,
} from "@utils";

export function findFirstAndLastIP(IPv4NetworkAddress: string): FirstAndLastIP {
  // Começa separando o endereço de IP (do primeiro host) do valor da máscara (que indica o tamanho da subrede)
  const [hostIp, subnetSize] = IPv4NetworkAddress.split("/");

  // Converte o IP para decimal (binário). Usamos o bigInt pois permite 64 bits. Ele é 'signed'
  const firstIp: any = convertIpString2Decimal(hostIp);

  // Para achar o último IP, basta adicionar ao primeiro IP o tamanho do range de endereços, 
  // que recebe a quantidade de redes
  const lastPossibleIp: any = firstIp + getAddressesRangeSize(subnetSize);

  // Retorna, para o usuário
  return {
    // A rede que foi informada
    network: IPv4NetworkAddress,
    // O range de valores convertidos para string, do primeiro, e do último IP
    range: `${convertDecimal2IpString(firstIp)} ➢ ${convertDecimal2IpString(
      lastPossibleIp
    )}`,
    // Informações sobre o first e last host
    firstHost: convertDecimal2IpString(firstIp),
    lastHost: convertDecimal2IpString(lastPossibleIp),

  };
}

// Lixo:
//// convertDecimal2IpString(firstIp + BigInt(1)),
//// convertDecimal2IpString(lastIpPossible - BigInt(1)),
//// broadcast: convertDecimal2IpString(lastIpPossible),