const crypto = require('crypto');
SHA256 = data => crypto.createHash("sha256").update(data).digest("hex");

class Block {
    constructor(data, previousHash = '', merkleRoot, nonce = 0, blocksize = 3) {
        this.blocksize = blocksize;
        this.blockHeader = {
            timestamp: Date.now().toString(),
            previousHash: previousHash,
            merkleRoot: merkleRoot,
            nonce: nonce
        };
        this.body = data;
        this.blockHash = this.generateHash();
    }

    generateHash() {
        return SHA256(this.blockHeader.timestamp + this.blockHeader.previousHash + this.blockHeader.merkleRoot + this.blockHeader.nonce);
    }

    mine(difficulty) {
        while(!this.blockHash.startsWith(Array(difficulty + 1).join("0"))) {
            this.blockHeader.nonce++;
            this.blockHash = this.generateHash();
        }
    }

    updateMerkleRoot() {
        let transactionList = '';
        this.body.forEach(transaction => {
            transactionList += JSON.stringify(transaction);
        })
        this.blockHeader.merkleRoot = SHA256(transactionList);
    }

    getBlockInfo() {
        console.log('\nBlock Hash:');
        console.log(this.blockHash);

        console.log('\nBlock Header:')
        console.log('timestamp: ',this.blockHeader.timestamp);
        console.log('previousHash: ',this.blockHeader.previousHash);
        console.log('merkleRoot: ',this.blockHeader.merkleRoot);
        console.log('nonce: ',this.blockHeader.nonce);

        console.log('\nTransactions:')
        console.log(this.body);

        console.log('\nblocksize: ',this.blocksize);
    }
}

module.exports = Block