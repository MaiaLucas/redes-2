import { table, clear, log } from "console";
import {
    findFirstAndLastIP,
    findIPAddressOwner,
    findSubnetworks,
    ipBelongs2Network,
} from "./methods";
var readline = require('readline');

// Recebe valores do tipo string, vão ser aproveitados para todas as questões
const defaultAddress1: string = "10.10.10.0/24";
const defaultN: number = 5;
const defaultAddress2: string = "10.10.10.0/27";
const defaultIpAddress1: string = "125.50.63.254";
const defaultIpAddress2: string = "199.50.61.30";
const defaultAddress3: string = "10.10.10.31/27";

// Questão 1
function question01() {
    let helperMap = new Map()
    helperMap.set("address", -1)

    // Metodo para pegar o input
    const question1 = () => {
        return new Promise<void>((resolve, reject) => {
            rl.question('Digite um valor para o endereço de rede ou 0 para o valor padrão: ', (answer: any) => {
                helperMap.set("address", answer)
                resolve()
            })
        })
    }

    const main = async () => {
        log("Questão 01.")
        await question1()
        // console.log(helperMap)
        let address = helperMap.get("address")
        if (address === "0") {
            address = defaultAddress1
        }
        console.log(`O valor foi: ${address}`)
        if (address.length > 18 || address.length < 9) {
            if (address === "-1") {
                log("Isso não era para acontecer.....")
                process.exit()
            }
            log("Valor incorreto. Reinicie o programa e tente novamente")
            process.exit()
        }
        else {
            // Chama o método da questão 1 (busca range de hosts para uma rede)
            const answer = findFirstAndLastIP(address);
            // table(findFirstAndLastIP(defaultAddress1)); // para teste

            // Mostra os dados que retornam no método da questão 1 (network e range),
            // em forma de tabela
            table(answer);

            console.log("Questão concluida. Reinicie o programa para tentar outra questão")

            process.exit()
        }
    }

    main()
}

function question02() {
    let helperMap = new Map()
    helperMap.set("address", -1)
    helperMap.set("n", -1)

    // Metodo para pegar o input
    const question1 = () => {
        return new Promise<void>((resolve, reject) => {
            rl.question('Digite um valor para o endereço de rede ou 0 para o valor padrão: ', (answer: any) => {
                helperMap.set("address", answer)
                resolve()
            })
        })
    }

    const question2 = () => {
        return new Promise<void>((resolve, reject) => {
            rl.question('Digite um valor para n ou 0 para o valor padrão: ', (answer: any) => {
                helperMap.set("n", answer)
                resolve()
            })
        })
    }

    const main = async () => {
        log("Questão 02.")
        await question1()
        // console.log(helperMap)
        let address = helperMap.get("address")
        if (address === "0") {
            address = defaultAddress1
        }
        console.log(`O valor foi: ${address}`)
        if (address.length > 18 || address.length < 9) {
            if (address === "-1") {
                log("Isso não era para acontecer.....")
                process.exit()
            }
            log("Valor incorreto. Reinicie o programa e tente novamente")
            process.exit()
        }

        await question2()
        let n = helperMap.get("n")
        if (n === "0") {
            n = defaultN
        }
        console.log(`O valor foi: ${n}`)
        if (n === "-1") {
            log("Isso não era para acontecer.....")
            process.exit()
        }

        else {
            // Chama o método da questão 02 (busca possíveis N subredes, para uma rede)
            const answer = findSubnetworks(address, n);
            // table(findSubnetworks(defaultAddress1, 5)); // para teste

            // Mostra o resultado da questão 02 (range de subredes), em forma de table
            table(answer);

            console.log("Questão concluida. Reinicie o programa para tentar outra questão")

            process.exit()
        }
    }

    main()
}

function question03() {
    let helperMap = new Map()
    helperMap.set("address", -1)
    helperMap.set("ipAddress", -1)

    // Metodo para pegar o input
    const question1 = () => {
        return new Promise<void>((resolve, reject) => {
            rl.question('Digite um valor para o endereço de rede ou 0 para o valor padrão: ', (answer: any) => {
                helperMap.set("address", answer)
                resolve()
            })
        })
    }

    const question2 = () => {
        return new Promise<void>((resolve, reject) => {
            rl.question('Digite um valor para o endereço de IP ou 0 para o valor padrão: ', (answer: any) => {
                helperMap.set("ipAddress", answer)
                resolve()
            })
        })
    }

    const main = async () => {
        log("Questão 03.")
        await question1()
        // console.log(helperMap)
        let address = helperMap.get("address")
        if (address === "0") {
            address = defaultAddress1
        }
        console.log(`O valor foi: ${address}`)
        if (address.length > 18 || address.length < 9) {
            if (address === "-1") {
                log("Isso não era para acontecer.....")
                process.exit()
            }
            log("Valor incorreto. Reinicie o programa e tente novamente")
            process.exit()
        }

        await question2()
        let ipAddress = helperMap.get("ipAddress")
        if (ipAddress === "0") {
            ipAddress = defaultIpAddress1
        }
        console.log(`O valor foi: ${ipAddress}`)
        if (ipAddress.length > 18 || ipAddress.length < 9) {
            if (ipAddress === "-1") {
                log("Isso não era para acontecer.....")
                process.exit()
            }
            log("Valor incorreto. Reinicie o programa e tente novamente")
            process.exit()
        }

        else {
            // Chama o método da questão 03 (verifica se ip é filho de rede informada)
            const answer = ipBelongs2Network(address, ipAddress);
            // table(ipBelongs2Network(defaultAddress1, "125.50.63.254")); // para teste
            // table(ipBelongs2Network(defaultAddress2, "199.50.61.30")); // para teste

            // Mostra o resultado da questão 03 (Network, Ip, Booleano se pertence ou não)
            // Em forma de table
            table(answer);

            console.log("Questão concluida. Reinicie o programa para tentar outra questão")

            process.exit()
        }
    }

    main()
}

function question04() {
    let helperMap = new Map()
    helperMap.set("ipAddress", -1)
    helperMap.set("options", -1)
    let networkAddressList: string[] = []

    // Metodo para pegar o input
    const question1 = () => {
        return new Promise<void>((resolve, reject) => {
            rl.question('Quantos valores gostaria de colocar como opções para rede? Digite um valor numérico ou 0 para "3": ', (answer: any) => {
                helperMap.set("options", answer)
                resolve()
            })
        })
    }

    const question2 = (idx: number) => {
        return new Promise<void>((resolve, reject) => {
            let txt = idx < 4 ? 'ou 0 para o valor padrão ' : ''
            rl.question(`Digite um valor para o endereço de rede ${idx} ${txt}: `, (answer: any) => {
                networkAddressList.push(answer)
                resolve()
            })
        })
    }

    const question3 = () => {
        return new Promise<void>((resolve, reject) => {
            rl.question('Digite um valor para o endereço de IP ou 0 para o valor padrão: ', (answer: any) => {
                helperMap.set("ipAddress", answer)
                resolve()
            })
        })
    }

    const main = async () => {
        log("Questão 04.")
        await question1()
        let options = helperMap.get("options")
        if (options === "0") {
            options = 3
        }
        console.log(`O valor foi: ${options}`)
        // console.log(helperMap)

        for (let index = 0; index < options; index++) {
            await question2(index + 1)
        }

        let defaultAddresses = ["10.10.10.0/24", "10.10.10.0/27", "10.10.10.31/27"]
        for (let index = 0; index < networkAddressList.length; index++) {
            let address = networkAddressList[index]
            if (address === "0") {
                networkAddressList[index] = defaultAddresses[index]
            }
            address = networkAddressList[index]
            console.log(`O valor foi: ${address}`)
            if (address.length > 18 || address.length < 9) {
                if (address === "-1") {
                    log("Isso não era para acontecer.....")
                    process.exit()
                }
                log("Valor incorreto. Reinicie o programa e tente novamente")
                process.exit()
            }
        }

        console.log(networkAddressList)

        await question3()
        let ipAddress = helperMap.get("ipAddress")
        if (ipAddress === "0") {
            ipAddress = defaultIpAddress2
        }
        console.log(`O valor foi: ${ipAddress}`)
        if (ipAddress.length > 18 || ipAddress.length < 9) {
            if (ipAddress === "-1") {
                log("Isso não era para acontecer.....")
                process.exit()
            }
            log("Valor incorreto. Reinicie o programa e tente novamente")
            process.exit()
        }

        else {
            // Chama o método da questão 04, passando lista de possibilidades de rede pai,
            // e o ip a ser verificado
            const answer = findIPAddressOwner(networkAddressList, ipAddress);
            table(findIPAddressOwner(
                [
                    defaultAddress1,
                    defaultAddress2,
                    defaultAddress3
                ],
                defaultIpAddress2
            )); // Para teste

            // Mostra o resultado da questão 04 (Ip informado, e seu pai mais 
            // específico, caso haja. Caso não haja, mostra 404),
            // em forma de tabela.
            table(answer);

            console.log("Questão concluida. Reinicie o programa para tentar outra questão")

            process.exit()
        }
    }

    main()
}

// Interface para conseguir pegar input do usuário
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Opções para menu
const menuOptions = "\n" +
    "Digite 1 para rodar a primeira questão\n" +
    "Digite 2 para rodar a segunda questão\n" +
    "Digite 3 para rodar a terceira questão\n" +
    "Digite 4 para rodar a quarta questão\n" +
    "Aperte ctrl + c para encerrar, a qualquer momento:\n"

// Função async e recursiva inicial para pegar input do usuário
var getAsyncRecursiveInputMenu = function () {
    rl.question(menuOptions, function (answer: string) {
        if (answer == "1") {
            question01()
        }
        else if (answer == "2") {
            question02()
        }
        else if (answer == "3") {
            question03()
        }
        else if (answer == "4") {
            question04()
        }
        else if (answer == "exit") { // necessário para recursividade. Mas pode apertar ctrl + c que dá certo
            rl.close(); // fecha o scanner
            process.exit() // encerra o processo
        }
        else {
            log("Opção incorreta, tente novamente")
        }

        getAsyncRecursiveInputMenu(); //Calling this function again to ask new question
    });
};

// INICIO DO PROGRAMA - - - - - 

// Limpa o console, sempre que reinicia
// Os métodos table, clear e log advem de console (ex: console.log = log)
clear();
log("VP2 Running...");
log("Bem vindo(a).")
log("Obs: Note que todos os valores de endereço das questões 1-3 devem terminar com .0 seguido de / e a máscara")
getAsyncRecursiveInputMenu(); // Input do usuário




function helperQuestion01(helperMap: Map<String, String>) {

}