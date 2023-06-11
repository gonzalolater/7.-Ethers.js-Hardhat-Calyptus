const { expect } = require("chai");
 
describe("My Contract", function () {
 let contract;
 
 before(async function () {
   const Contract = await ethers.getContractFactory("MyContract");
   contract = await Contract.deploy();
 });
 
 it("should default the value of num to 0", async function () {
   expect(await contract.getNum()).to.equal(0);
 });
 
 describe("Increment", function () {
   it("should increment num by 1", async function () {
     var tx = await contract.increment();
     await tx.wait();
     expect(await contract.getNum()).to.equal(1);
   });
 });
 
 describe("Decrement", function () {
   it("should Decrement num by 1", async function () {
     var tx = await contract.decrement();
     await tx.wait();
     expect(await contract.getNum()).to.equal(0);
   });
 });
});