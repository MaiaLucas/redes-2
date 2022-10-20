import { table, clear, log } from "console";
import { findFirstAndLastIP, findSubnetworks } from "./methods";

clear();
log("VP2 Running...");

const IPv4NetworkAddress1: string = "10.0.0.0/27";
const IPv4NetworkAddress2: string = "169.254.0.0/24";

const IPs1 = findFirstAndLastIP(IPv4NetworkAddress1);
const IPs2 = findFirstAndLastIP(IPv4NetworkAddress2);

table([IPs1, IPs2]);

log("\n---------------------------------\n");

findSubnetworks(IPv4NetworkAddress1, 3);
findSubnetworks(IPv4NetworkAddress2, 3);
