class Entry {
  constructor(amount, dateTime) {
    this.amount = amount;
    this.dateTime = dateTime;
  }
}

class Account {
  constructor(identifier) {
    this.identifier = identifier;
    this.entries = [];
  }

  current_balance() {
    return this.entries.reduce((acc, entry) => {
      return acc + entry.amount;
    }, 0);
  }

  add_entry({ amount, dateTime }) {
    this.entries.push(new Entry(amount, dateTime));
  }
}

export class AccountStore {
  constructor() {
    this.accounts = [];
  }

  get(identifier) {
    const existingAccount = this.accounts.find(account => account.identifier === identifier);
    if (existingAccount) { return existingAccount };

    const newAccount = new Account(identifier);
    this.accounts.push(newAccount);

    return newAccount;
  }
}
