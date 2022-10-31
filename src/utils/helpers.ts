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
  // Tem um acumulador, que no final vai ser a soma de todos os binarios,
  // um current (valor do array atual, não é acumulado), 
  // e um index, que é aumentado de 1 em 1.

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
  // << preenche com zeros na direita
  // | (bitwise OR operator) retorna 1 em cada posição que tiver pelo menos 1
  // grosseiramente, é como se "adicionasse"

  // Vai de 0, 8, 16, 24
  // 0 | (0 << 0) == 0
  // 0 | (10 << 8) == 101000000000 (2560n)
  // 2560n | (10 << 16) == 
  //    101000000000 (2560) | 10100000000000000000 (655360n) ==
  //    10100000101000000000 (657920)
  // 657920n | (10 << 24) == 168430080n ()

  let val = startValue | (value << BigInt(shiftValue))
  return val;
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

  let ipArr: number[] = Array.from(ShiftValues, (idx) => {
    // Pega o valor que está na posição idx do shiftValues
    // Vai de 24, 16, 8, 0
    return decimal2String({ value, shiftValue: idx })
  }
  );

  // Concatena todos os elementos do array em uma string, com um ponto
  let word = ipArr.join(".")
  return word;
}

// Retorna um objeto que implementa TypeBin2Dec
export function decimal2String({ value, shiftValue }: TypeBin2Dec): any {
  // Exemplo para 168430080n
  // obs: 168430080 == 1010000010100000101000000000
  // (1010000010100000101000000000 & 11111111000000000000000000000000) >> 24
  // == 1010000000000000000000000000 >> 24 == decimal 10
  //
  // (1010000010100000101000000000 & 00000000111111110000000000000000) >> 16
  // == 10100000000000000000 >> 16 == decimal 10
  // 
  // (1010000010100000101000000000 & 00000000000000001111111100000000) >> 8
  // == 101000000000 >> 8 == decimal 10
  // 
  // (1010000010100000101000000000 & 00000000000000000000000011111111) >> 0
  // == decimal 0

  // BigInt(ShiftHexValues[shiftValue] tem 
  // 8 ums e 24 zeros
  // 8 ums e 16 zeros
  // 8 ums e 8 zeros
  // 8 ums
  let val = (value & BigInt(ShiftHexValues[shiftValue])) >> BigInt(shiftValue)
  return val;
}

// Responsável por pegar a quantidade de possíveis hots para uma rede.
// Usado na função da primeira questão (findFirstAndLastIP)
export function getAddressesRangeSize(subnetSize: string): bigint {
  // Subtrai 32 do valor que existe na máscara, depois da barra
  const hostQtdBitsRemaining = TotalBits.IPv4 - Number(subnetSize);
  // Eleva 2 à quantidade de bits resultante da subtração anterior
  // Menos 1, pois começa a contar do 0
  const addressRangeSize = Math.pow(2, hostQtdBitsRemaining) - 1;
  // Converte para bigint
  return BigInt(addressRangeSize);
}

