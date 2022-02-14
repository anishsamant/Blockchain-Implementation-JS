const Block = require('./block.js');
const crypto = require('crypto');
SHA256 = data => crypto.createHash("sha256").update(data).digest("hex");

class Blockchain {

    constructor() {
        this.blockTime = 10000;
        this.difficulty = 1;
        this.chain = [];
        let transactions = [{from: 'ABC', to: 'XYZ', amount: 10}];
        let merkleRoot = SHA256(JSON.stringify(transactions));
        this.chain.push(new Block(transactions, '', merkleRoot, 0, 1));
    }

    addBlock(previousBlock, transaction) {
        let merkleRoot = SHA256(JSON.stringify([transaction]));
        let block = new Block([transaction], previousBlock.blockHash, merkleRoot);
        block.mine(this.difficulty);
        this.chain.push(block);
        this.difficulty += (Date.now() - parseInt(previousBlock.blockHeader.timestamp) > this.blockTime)? 2: 1;
        return block;
    }

    addTransaction(transaction) {
        let block = this.chain[this.chain.length - 1];
        if (block.blocksize == block.body.length) {
            block = this.addBlock(block, transaction);
        } else {
            block.body.push(transaction);
            block.updateMerkleRoot();
            block.blockHash = block.generateHash();
        }
        return block;
    }

    checkValidity() {
        let len = this.chain.length;
        for (let i=1; i<len; i++) {
            let previousBlock = this.chain[i-1];
            let currentBlock = this.chain[i];
            if (previousBlock.blockHash != previousBlock.generateHash() ||
                currentBlock.blockHash != currentBlock.generateHash() ||
                previousBlock.blockHash != currentBlock.blockHeader.previousHash) {
                return false;
            }
        }

        return true;
    }
}

module.exports = Blockchain;