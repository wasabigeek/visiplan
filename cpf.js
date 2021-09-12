const calculateCpfOaContributions = (age, income) => {
  return [{ amount: 10, dateTime: new Date() }]
}

const getCpfInterest = ({ accountStore }) => {

}

export class CpfComponent {
  constructor(accountStore, config) {
    this.accountStore = accountStore;
    this.config = config;
  }

  apply_yearly_updates() {
    const cpfOa = this.accountStore.get('cpf_oa');
    cpfOa.add_entries(calculateCpfOaContributions(this.config.age, this.config.income));
  }

  apply_yearly_interest() {
    getCpfInterest({ accountStore: this.accountStore })
  }
}
