const getCpfContribution = () => {
  return [{ amount: 10, dateTime: new Date() }]
}

const getCpfInterest = ({ accountStore }) => {

}

export class CpfComponent {
  constructor(accountStore) {
    this.accountStore = accountStore;
  }

  apply_yearly_updates() {
    const entries = getCpfContribution();
    const cpfOa = this.accountStore.get('cpf_oa');
    entries.forEach((entry) => {
      cpfOa.add_entry(entry)
    })
  }

  apply_yearly_interest() {
    getCpfInterest({ accountStore: this.accountStore })
  }
}
