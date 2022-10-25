import { table, clear, log } from "console";
import {
  findFirstAndLastIP,
  findIPAddressOwner,
  findSubnetworks,
  ipBelongs2Network,
} from "./methods";

clear();
log("VP2 Running...");

const IPv4NetworkAddress1: string = "125.50.60.0/22";
const IPv4NetworkAddress2: string = "125.50.60.0/24";
const IPv4NetworkAddress3: string = "195.250.60.0/22";

const IPs1 = findFirstAndLastIP(IPv4NetworkAddress1);
const IPs2 = findFirstAndLastIP(IPv4NetworkAddress2);

table([IPs1, IPs2]);

log("\n---------------------------------\n");

findSubnetworks(IPv4NetworkAddress1, 20);
// findSubnetworks(IPv4NetworkAddress2, 3);

log("\n---------------------------------\n");

const q3a = ipBelongs2Network(IPv4NetworkAddress1, "125.50.63.254");
const q3b = ipBelongs2Network(IPv4NetworkAddress2, "199.50.61.30");

table([q3a, q3b]);

log("\n---------------------------------\n");

const q4a = findIPAddressOwner(
  [IPv4NetworkAddress1, IPv4NetworkAddress2, IPv4NetworkAddress3],
  "125.50.60.254"
);
