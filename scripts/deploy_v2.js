const { ethers, upgrades } = require("hardhat");
const PROXY = "0x7CCb4C51c1EF8B9dFdFfA2f0bB32A6D73A722f76";


async function main() {
  
  console.log("Upgrading Tokenv2...");
  const RCOPv2 = await ethers.getContractFactory("RCOPv2");
  const rcopv2 = await upgrades.upgradeProxy( PROXY, RCOPv2 )

 await rcopv2.deployed();
 console.log(" RCOPv2 upgraded to " + rcopv2.address );
}

main();