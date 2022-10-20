import { table, clear, log } from "console";
import {
  findFirstAndLastIP,
  findSubnetworks,
  ipBelongs2Network,
} from "./methods";

clear();
log("VP2 Running...");

const IPv4NetworkAddress2: string = "169.254.0.0/24";
const IPv4NetworkAddress1: string = "125.50.60.0/24";

const IPs1 = findFirstAndLastIP(IPv4NetworkAddress1);
const IPs2 = findFirstAndLastIP(IPv4NetworkAddress2);

table([IPs1, IPs2]);

log("\n---------------------------------\n");

findSubnetworks(IPv4NetworkAddress1, 20);
// findSubnetworks(IPv4NetworkAddress2, 3);

log("\n---------------------------------\n");

ipBelongs2Network(IPv4NetworkAddress1, "125.50.60.30");
ipBelongs2Network(IPv4NetworkAddress1, "125.50.61.30");
