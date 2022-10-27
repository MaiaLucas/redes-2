import { IDec2Bin, TypeBin2Dec } from "@interfaces/utils.interface";
import { ShiftValues, ShiftHexValues, TotalBits } from "./constants";

// FUNÇÕES UTILS (As mais importantes) PARA TODO O PROGRAMA

// Função que converte String (IP) para Decimal [bigint] (binário)
export function convertIpString2Decimal(strIp: string): bigint {
  // O endereço recebido é "splitado" e invertido.
  const arrIpValues: string[] = strIp.split(".").reverse();

  // Cria um array de shiftValue, de forma invertida.
  // A inversão vai ser necessária para que o reduce, abaixo, funcione.
  // Valores serão 0, 8, 16, 24
  const arrShiftValue: IDec2Bin["shiftValue"][] = [...ShiftValues].reverse();

  // O reduce é um loop que incrementa valores, baseado em alguns parametros.
  // Tem um acumulador, um current, e um index, que é aumentado de 1 em 1.

  // Retorna um número
  let ipDecimalValue = arrIpValues.reduce((accumulator, curValue, idx) => {
    // Esse é o valor current:
    // Retorna um objeto que implementa a interface IDec2Bin
    // O objeto é criado no método string2Decimal
    const binValue = string2Decimal({
      // Cast para bigint do startValue, que é o acumulador, que começa com 0
      startValue: BigInt(accumulator),
      // Cast para bigint do currentValue, que é o primeiro valor do arrIpValues invertido
      value: BigInt(curValue),
      // O valor na posição idx do arrShiftValue
      shiftValue: arrShiftValue[idx],
    });
    // Esse é o valor que vai se tornar o accumulator:
    return binValue;
    // Esse é o valor inicial do accumulador:
  }, 0);

  // Converte de número para bigint
  return BigInt(ipDecimalValue);
}

// Retorna um objeto que implementa a interface IDec2Bin
export function string2Decimal({
  startValue,
  value,
  shiftValue,
}: IDec2Bin): any {
  // Exemplo para 10.10.10.0
  // 0 | (000000 << 24)
  // 1111111 | (10 << 16)
  // 
  return startValue | (value << BigInt(shiftValue));
}

// Função que converte  Decimal [bigint] (binário) para String (IP)
export function convertDecimal2IpString(value: bigint): string {

  // Cria um array de Ips. Para cada indice vai gerar um valor
  // Cada valor vai ser advindo da função decimal2String.
  // Para a função decimal2String só vai importar o valor referente ao octeto
  // Ela vai retornar um valor, e depois todos os valores vão ser concatenados
  // O shiftValues vai ser necessário para obter os valores referentes a 
  // posição de cada octeto (valores 24, 16, 8, 0). 
  // A função só vai olhar para ESSE octeto

  let ipArr: number[] = Array.from(ShiftValues, (idx) =>
    // Pega o valor que está na posição idx do shiftValues
    decimal2String({ value, shiftValue: idx })
  );

  // Concatena todos os elementos do array em uma string, com um ponto
  return ipArr.join(".");
}

// Retorna um objeto que implementa TypeBin2Dec
export function decimal2String({ value, shiftValue }: TypeBin2Dec): any {
  // value = 10100000101000000000000000000000
  // value & 0
  return (value & BigInt(ShiftHexValues[shiftValue])) >> BigInt(shiftValue);
}

// Responsável por pegar a quantidade de possíveis hots para uma rede
export function getAddressesRangeSize(subnetSize: string): bigint {
  // Subtrai 32 do valor que existe na máscara, depois da barra
  const hostQtdBitsRemaining = TotalBits.IPv4 - Number(subnetSize);
  // Eleva 2 à quantidade de bits resultante da subtração anterior
  // Menos 1, pois começa a contar do 0
  const addressRangeSize = Math.pow(2, hostQtdBitsRemaining) - 1;
  // Converte para bigint
  return BigInt(addressRangeSize);
}

