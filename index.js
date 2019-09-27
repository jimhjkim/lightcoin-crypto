// let balance = 500.00;
class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    let balance = 0;
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (this.isAllowed()) {
      this.time = new Date(); // keep track of the time of the transaction
      this.account.addTransaction(this); // add the transaction to the account
      return `Withdrawal of $${this.amount} was Successful`;
    } return `Withdrawal of $${this.amount} was Unsuccessful`;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true; // no need to check
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    return this.account.balance - this.amount >= 0;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account('snow-patrol');

console.log('Starting Balance', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
console.log(t1.commit());

const t2 = new Withdrawal(500.00, myAccount);
console.log(t2.commit());

console.log('Ending Balance:', myAccount.balance);
