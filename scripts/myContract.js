const hre = require("hardhat");
const ethers = hre.ethers;
const MyContractABI =
 require("../artifacts/contracts/MyContract.sol/MyContract.json");
const MyContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
 
async function main() {
 const account = await ethers.getSigner(
   "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
 );
 const MyContract = await ethers.getContractAtFromArtifact(
   MyContractABI,
   MyContractAddress
 );
 
 try {
   // fetching initial value of num
   var num = await MyContract.getNum();
   console.log("The initial value of num is " + num.toString());
 
   // incrementing num using first(default) account
   var txIn = await MyContract.increment();
   await txIn.wait();
   console.log("Num has been incremented by first account.");
 
   // fetching new value of num
   num = await MyContract.getNum();
   console.log("The incremented value of num is " + num.toString());
 
   // decrementing num using second(connected) account
   var txDec = await MyContract.connect(account).decrement();
   await txDec.wait();
   console.log("Num has been decremented by second account.");
 
   // fetching new value of num
   num = await MyContract.getNum();
   console.log("The decremented value of num is " + num.toString());
 } catch (error) {
   console.log(error);
 }
}
 
main();