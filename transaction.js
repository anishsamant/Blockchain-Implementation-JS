class Transaction {
    constructor(from, to, amount) {
        this.transaction = {
            from: from,
            to: to,
            amount: amount
        }
    }
}

module.exports = Transaction;