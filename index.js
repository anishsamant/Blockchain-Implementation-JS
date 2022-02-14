const Block = require('./block.js');
const Blockchain = require('./blockchain.js');
const Transaction = require('./transaction.js');

// Create Blockchain
let blockchain = new Blockchain();
blockchain.chain[0].getBlockInfo();

// Create Transaction
for (let i=0; i<10; i++) {
    let transaction = new Transaction('X'+i, 'Y'+i, i);
    let block = blockchain.addTransaction(transaction.transaction);
    block.getBlockInfo();
}

// Check Blockchain Validity
if (blockchain.checkValidity()) {
    console.log('Blockchain is Valid');
} else {
    console.log('Blockchain is Invalid');
}