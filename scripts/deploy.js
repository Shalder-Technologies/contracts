const { ethers, upgrades } = require("hardhat");



async function main() {
  
  console.log("Deploying RCOPv1...");
  const RCOP = await ethers.getContractFactory("RCOPv1");
  const rcop = await upgrades.deployProxy(RCOP, [100000], { initializer: "initialize" }, {kind: "uups"
 });

 await rcop.deployed();
 console.log("RCOPv1 deployed to:", rcop.address);
}

main();