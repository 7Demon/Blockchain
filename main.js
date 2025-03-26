const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timestamp, Data, previousHash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.Data = Data;
        this.previousHash = previousHash;
        this.hash = '';
    }
    calculateHash(){
        return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.Data)).toString()
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()]
    }
    createGenesisBlock(){
        return new Block(0, "27/3/2025", "Genesis Block", "0")
    }
    getLatesBlock(){
        return this.chain[this.chain.length-1]
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatesBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let dickCoin = new Blockchain()
dickCoin.addBlock(new Block(1, "28/3/2025", {amount: 6}))
dickCoin.addBlock(new Block(2, "29/3/2025", {amount: 10}))

console.log(JSON.stringify(dickCoin, null, 6))