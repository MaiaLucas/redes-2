// Feito para ter um retorno da primeira questão 
// Terá apenas essas propriedades
export default interface FirstAndLastIP {
  network: string;
  range: string;
  firstHost: string;
  lastHost: string;
  broadcast?: string;
}
