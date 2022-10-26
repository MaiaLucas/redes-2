import { table, clear, log } from "console";
import {
  findFirstAndLastIP,
  findIPAddressOwner,
  findSubnetworks,
  ipBelongs2Network,
} from "./methods";

clear();
log("VP2 Running...");

const IPv4NetworkAddress1: string = "10.10.10.0/24";
const IPv4NetworkAddress2: string = "10.10.10.0/27";
const IPv4NetworkAddress3: string = "10.10.10.31/27";

const IPs1 = findFirstAndLastIP(IPv4NetworkAddress1);
const IPs2 = findFirstAndLastIP(IPv4NetworkAddress2);

table([IPs1, IPs2]);

log("\n---------------------------------\n");

const q2a = findSubnetworks(IPv4NetworkAddress1, 5);
const q2b = findSubnetworks(IPv4NetworkAddress2, 3);

console.log(`\n2.a) ${IPv4NetworkAddress1}: `);
table(q2a);
console.log(`\n2.b) ${IPv4NetworkAddress2}: `);
table(q2b);

log("\n---------------------------------\n");

const q3a = ipBelongs2Network(IPv4NetworkAddress1, "125.50.63.254");
const q3b = ipBelongs2Network(IPv4NetworkAddress2, "199.50.61.30");

console.log(`\n3.`);
table([q3a, q3b]);

log("\n---------------------------------\n");

console.log(`\n4.`);
const q4a = findIPAddressOwner(
  [
    IPv4NetworkAddress1,
    IPv4NetworkAddress2,
    IPv4NetworkAddress3,
    "10.10.10.64/27",
  ], // network list
  "199.10.10.62" // ip
);
const q4b = findIPAddressOwner(
  [
    IPv4NetworkAddress1,
    IPv4NetworkAddress2,
    IPv4NetworkAddress3,
    "10.10.10.64/27",
  ], // network list
  "10.10.10.3" // ip
);

table([q4a, q4b]);
