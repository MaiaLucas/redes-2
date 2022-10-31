import { convertDecimal2IpString, convertIpString2Decimal } from "@utils";
import { findFirstAndLastIP } from "./findFirstAndLastIP";

export function findSubnetworks(
  IPv4NetworkAddress: string,
  n: number
): any {
  // Começa separando o endereço de IP (do primeiro host) do valor da máscara (que indica o tamanho da subrede)
  const [firstHostIp, subnetSize] = IPv4NetworkAddress.split("/");

  // Faz o log do valor N na base 2 para achar a quantidade de bits para a nova máscara
  const qtdBitsForNewMask = Math.ceil(Math.log2(n));

  // Vai achar o número de subredes possível com 2 elevado ao número de bits que foi encontrado 
  const qtdPossibleSubnetworks = Math.pow(2, qtdBitsForNewMask);

  // Baseado na quantidade de bits achada anteriormente, calcula uma nova máscara que vai ser usada para
  // achar as subredes
  const newMask = Number(subnetSize) + qtdBitsForNewMask;

  // Esse array vai ser usado para retornar para o usuário
  const arrSubnetworks: any[] = [];

  // Manda os valores para a função usada na primeira questão
  // Vai fazer um loop, criando um array de tamanho igual a quantidade de subredes possíveis
  // Cada iteração do reduce vai trazer um range contendo o primeiro e o ultimo IP.
  // No caso desse reduce vai usar apenas o accumulador, que vai iniciar com o endereço de IP 
  // do primeiro host (terminado em 0) (ver abaixo)
  Array.from({ length: qtdPossibleSubnetworks }).reduce((acc: bigint) => {
    // Roda o loop, acha o primeiro e o ultimo IP relativo ao endereço de IP, com a nova máscara
    const { firstHost, lastHost } = findFirstAndLastIP(
      `${convertDecimal2IpString(acc)}/${newMask}`
    );

    // Adiciona o o primeiro e o ultimo IP no arraySubNetworks, para retornar ao usuário no final da iteração
    arrSubnetworks.push({ firstIp: firstHost, lastIp: lastHost });

    // Retorna o último host achado para o endereço de IP passado, adicionando 1
    // Isso será o novo acumulador
    // Adiciona 1 para que o próximo "primeiro IP" possa ser o real próximo. Se não, ele enviaria o
    // último IP do range anterior.
    return convertIpString2Decimal(lastHost) + BigInt(1);

    // O iniciar com o endereço de IP do primeiro host (terminado em 0)
  }, convertIpString2Decimal(firstHostIp));

  // Retorna o range de subredes
  return arrSubnetworks;
}
