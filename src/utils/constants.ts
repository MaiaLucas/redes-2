import { IDec2Bin } from "@interfaces/utils.interface";

// CONSTANTES A SEREM USADAS NO PROGRAMA

// Total de bits para o IP.
export enum TotalBits {
  IPv4 = 32
}

// Quantidade, em hexadecimal, de bits para usar no shift
// Baseado em octetos. Para a função de converter 
// binário (decimal, no código) para string
export const ShiftHexValues = {
  "0": 0xff,
  "8": 0xff00,
  "16": 0xff0000,
  "24": 0xff000000,
};

// Quantidade de bits apra usar no shift, baseado em octetos
// Para a função de converter string para binário (decimal, no código)
// Ele é criado a partir do shiftValue da interface IDec2Bin
export const ShiftValues: IDec2Bin["shiftValue"][] = [24, 16, 8, 0];
