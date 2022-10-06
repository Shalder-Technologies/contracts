const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const {BigNumber} = require("ethers");
const { ethers, upgrades } = require("hardhat");
const { expect } = require('chai');

var chai = require("chai");
const BN = require("bn.js");
chai.use(require("chai-bn")(BN));




// Desplegando token v1
describe("RCOPv1", function () {

let PROXY;
let Tokendeployed;
let owner;
let addr1;
let addr2;


async function deployTokenFixture() {
  const RCOPv1 = await ethers.getContractFactory("RCOPv1");
    const rcopv1 = await upgrades.deployProxy(RCOPv1,[100000], {initializer: "initialize" },{kind:'uups'});
    contractv1 = await rcopv1.deployed();
    [owner,addr1,addr2] = await ethers.getSigners();
    PROXY= rcopv1.address;

    return { RCOPv1, contractv1, owner, addr1, addr2 };
};
    
  it("Should deploy succesfully", async function () {
    const { contractv1 } = await loadFixture(deployTokenFixture);
    console.log("RCOPv1 deployed to:", contractv1.address);
  });

  it("Has a name", async function () {
    const { contractv1 } = await loadFixture(deployTokenFixture);
    const name = "RCOP";
    console.log("Consulting name...");
    expect(await contractv1.name()).to.equal(name);
  });

  it('Has a symbol', async function () {
    const { contractv1 } = await loadFixture(deployTokenFixture);
    console.log("Consulting symbol...");
    const symbol = "RCOP";
    const getSymbol = await contractv1.symbol();
    expect(getSymbol).to.equal(symbol);
  });
 

  // Comprobando el Supply Inicial
  it("Should mint initial supply...", async function () {
    const { contractv1, owner } = await loadFixture(deployTokenFixture);
    initialSupply = "100000000000000000000000"; // 100000 RCOP
    console.log("Consulting mint ...");
    const totalSupply = await contractv1.totalSupply();
    console.log("Total Supply "+totalSupply);
    expect(await contractv1.totalSupply()).to.equal(initialSupply);
  });

  //Comprobando transferencias 

  it("Transfering RCOP from Owner to Addr1", async function () {
    const { contractv1, owner, addr1 } = await loadFixture(deployTokenFixture);
    await contractv1.transfer(addr1.address,BigNumber.from(5000000000000000000000n));
    const balance2 = await contractv1.balanceOf(addr1.address);
    console.log("Addr1 Balance "+balance2);
    expect(await contractv1.transfer(addr1.address,BigNumber.from(5000000000000000000000n))).to.changeTokenBalances(contractv1,[owner,addr1],[-50,50]);
  }); 
 
//Quema de Tokens

  it("Burn..." , async function () {
    const { contractv1, owner} = await loadFixture(deployTokenFixture);
    const BalanceOfOwner = await contractv1.balanceOf(owner.address);
    console.log("Owner balance RCOP before Burn "+ BalanceOfOwner);
    console.log("Burning 5000 RCOP of owner balance");
    await contractv1.burn(BigNumber.from(5000000000000000000000n));
    const BalanceOfOwner2 = await new contractv1.balanceOf(owner.address);
    console.log("Owner balance RCOP after Burn " + BalanceOfOwner2);
    }); 

  // Actualizando a V2

  it("Should update to v2 succesfully", async function () {
    RCOPv2 = await ethers.getContractFactory("RCOPv2");
    console.log("Upgrading...");
    Tokendeployed = await upgrades.upgradeProxy(PROXY, RCOPv2);
    await Tokendeployed.deployed
    console.log("RCOP upgraded");
  });

// Comprobando correcto funcionamiento

  it("Should return v2 on version function...", async function () {
    console.log("Consulting Version...");
    const version = await Tokendeployed.version();
    console.log("version: "+version);
  });

 
});


