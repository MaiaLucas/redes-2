// A inteface é obrigada a ser implementada todos os itens

export interface IDec2Bin {
  startValue: bigint;
  value: bigint;
  // Como se fosse um enum, na interface. 
  // Já define os valores que podem ser colocados na variável:
  shiftValue: 0 | 8 | 16 | 24;
}

// O mesmo do IDec2Bin, mas sem o startValue
export type TypeBin2Dec = Omit<IDec2Bin, "startValue">;
