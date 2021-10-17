import { roundMoney } from "../helpers.js";

class Entry {
  constructor(amount, dateTime, title) {
    this.amount = amount;
    this.dateTime = dateTime;
    this.title = title;
  }
}

class Account {
  constructor(identifier) {
    this.identifier = identifier;
    this.entries = [];
  }

  current_balance() {
    const rawBalance = this.entries.reduce((acc, entry) => {
      return acc + entry.amount;
    }, 0);

    return roundMoney(rawBalance);
  }

  add_entry({ amount, dateTime, title = '' }) {
    this.entries.push(new Entry(amount, dateTime, title));
  }

  add_entries(entries) {
    entries.forEach(({ amount, dateTime, title = '' }) => {
      this.entries.push(new Entry(amount, dateTime, title));
    })
  }

  balance(dateTime) {
    return this
      .entries
      .filter(entry => entry.dateTime <= dateTime)
      .reduce((acc, entry) => {
        return acc + entry.amount;
      }, 0);
  }
}

export class AccountStore {
  constructor() {
    this.accounts = [];
  }

  add_entry(accountIdentifier, entry) {
    return this.get(accountIdentifier).add_entry(entry);
  }

  get_current_balance(accountIdentifier) {
    return this.get(accountIdentifier).current_balance();
  }

  get(identifier) {
    const existingAccount = this.accounts.find(account => account.identifier === identifier);
    if (existingAccount) { return existingAccount };

    const newAccount = new Account(identifier);
    this.accounts.push(newAccount);

    return newAccount;
  }

  find_entry(accountIdentifier, filterFn) {
    return this.get(accountIdentifier).entries.find(filterFn);
  }
}
