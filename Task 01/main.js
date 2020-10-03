const SHA256 = require("crypto-js/sha256");

class Block {
	constructor(height, body, time, previousblockhash=''){
		this.height = height;
		this.time = time;
		this.body = body;
		this.previousblockhash = previousblockhash;
		this.hash = this.calculateHash();
	}
	calculateHash(){
		return SHA256(this.previousblockhash+this.time+JSON.stringify(this.body)).toString();
	}
}

class Blockchain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
	}
	createGenesisBlock(){
		return new Block("1325438", "Genesis Block", "1430016722", "0");
	}
	getLatestBlock(){
		return this.chain[this.chain.length-1];
	}
	addBlock(newBlock){
		newBlock.previousblockhash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}
}

var obj = new Blockchain();
obj.addBlock(new Block("1325438", {coins: 69}, "1529001822"));
obj.addBlock(new Block("3325438", {coins: 420}, "1769003822"));

console.log(JSON.stringify(obj, null, 4));