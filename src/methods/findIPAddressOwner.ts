import { ipBelongs2Network } from "./ipBelongs2Network";

// Vai receber os endereços de rede e o IP que buscamos saber se é filho de um desses endereços, e qual.
export function findIPAddressOwner(
  IPv4NetworkAddresses: string[],
  ipAddress: string
): any {
  // Faz um filter que retorna uma lista de booleanos indicando "True" para "pertence" e 
  // "False" para "não pertence" a um endereço. Usando a função que é utilizada na questão 3
  const ownersArr = IPv4NetworkAddresses.filter((network) => {
    const { belongs } = ipBelongs2Network(network, ipAddress);
    return belongs;
  });

  // Caso haja dois valores retornados no filter, faz um reduce para achar o mais específico
  // Caso haja um valor retornado no filter, o reduce vai voltar esse valor
  // Caso não haja um valor retornado no filter, não faz o reduce, e retorna 404 (ver abaixo)
  const subnetworkOwner = ownersArr.reduce(
    // Esse reduce vai ter um accumulador e um current value.
    // É um jeito de fazer um for para achar o maior valor.
    (acc, current) => {

      // Vai dar um split no current e no accumulador. No caso daqui ele vai se importar 
      // apenas com o valor da segunda posição, a máscara. Pois vai procurar saber qual a maior
      // A maior é a mais específica.
      const [ipCurrent, currentSubnetworkMask] = current.split("/");
      const [ipAccumulator, accumulatorSubnetworkMask] = acc.split("/");

      // Compara o atual (current) com o anterior (accumulator)
      // Se o atual for maior ou igual ao anterior, o anterior se torna o atual. Se não, continua sendo o anterior
      return currentSubnetworkMask >= accumulatorSubnetworkMask ? current : acc;
    },

    // Valor inicial do accumulador vai ser o primeiro valor que houver no array
    ownersArr[0]
  );

  // Retorna para o usuário
  return {
    // O endereço do IP que queriamos saber o pai
    ipAddress,
    // O pai do IP
    // Caso exista algo retornado do reduce. Caso não exista, mostra 404 
    owner: Boolean(subnetworkOwner) ? subnetworkOwner : "404 - Not found",
  };
}

// Lixo:
  // console.log({ ownersArr, subnetworkOwner });
