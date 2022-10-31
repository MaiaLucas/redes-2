// import { convertDecimal2IpString, convertIpString2Decimal } from "./utils/helpers"

// console.clear()

// const IPv4NetworkAddress1: string = "10.10.10.0";
// console.log("uepa", convertIpString2Decimal(IPv4NetworkAddress1))

// console.log("uepa2", convertDecimal2IpString(BigInt(168430080)))


import { table, clear, log } from "console";
import {
    findFirstAndLastIP,
    findIPAddressOwner,
    findSubnetworks,
    ipBelongs2Network,
} from "./methods";

// FONTE DE ENTRADA NO PROGRAMA

// Limpa o console, sempre que reinicia
// Os métodos table, clear e log advem de console (ex: console.log = log)
clear();
log("VP2 Running...");

// Recebe valores do tipo string, vão ser aproveitados para todas as questões
const IPv4NetworkAddress1: string = "10.10.10.0/24";
const IPv4NetworkAddress2: string = "10.10.10.0/27";
const IPv4NetworkAddress3: string = "10.10.10.31/27";

// Questão 1
log("1.")

// Chama o método da questão 1 (busca range de hosts para uma rede)
const IPs1 = findFirstAndLastIP(IPv4NetworkAddress1);
const IPs2 = findFirstAndLastIP(IPv4NetworkAddress2);

// Mostra os dados que retornam no método da questão 1 (network e range),
// em forma de tabela
table([IPs1, IPs2]);

// Questão 02
log("\n---------------------------------\n");

// Chama o método da questão 02 (busca possíveis N subredes, para uma rede)
const q2a = findSubnetworks(IPv4NetworkAddress1, 5);
const q2b = findSubnetworks(IPv4NetworkAddress2, 3);

// Mostra o resultado da questão 02 (range de subredes), em forma de table
log(`\n2.a) ${IPv4NetworkAddress1}: `);
table(q2a);
log(`\n2.b) ${IPv4NetworkAddress2}: `);
table(q2b);

log("\n---------------------------------\n");

// Questão 03

// Chama o método da questão 03 (verifica se ip é filho de rede informada)
const q3a = ipBelongs2Network(IPv4NetworkAddress1, "125.50.63.254");
const q3b = ipBelongs2Network(IPv4NetworkAddress2, "199.50.61.30");

// Mostra o resultado da questão 03 (Network, Ip, Booleano se pertence ou não)
// Em forma de table
console.log(`\n3.`);
table([q3a, q3b]);

log("\n---------------------------------\n");

// Questão 04
console.log(`\n4.`);

// Chama o método da questão 04, passando lista de possibilidades de rede pai,
// e o ip a ser verificado
const q4a = findIPAddressOwner(
    [
        IPv4NetworkAddress1,
        IPv4NetworkAddress2,
        IPv4NetworkAddress3,
        "10.10.10.64/27",
    ],
    "199.10.10.62"
);
const q4b = findIPAddressOwner(
    [
        IPv4NetworkAddress1,
        IPv4NetworkAddress2,
        IPv4NetworkAddress3,
        "10.10.10.64/27",
    ],
    "10.10.10.3"
);

// Mostra o resultado da questão 04 (Ip informado, e seu pai mais 
// específico, caso haja. Caso não haja, mostra 404),
// em forma de tabela.
table([q4a, q4b]);
