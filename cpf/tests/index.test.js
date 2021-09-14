import { CpfComponent } from "../index.js";
import { AccountStore } from "../../account.js"; // TODO: mock

// Naive Integration Tests
test('it calculates CPF OA correctly', () => {
  const accountStore = new AccountStore();
  const cpfComponent = new CpfComponent(accountStore, { age: 35, income: 5000 });

  cpfComponent.apply_monthly_updates();

  const oaBalance = accountStore.get("cpf_oa").current_balance();
  expect(oaBalance).toBe(1150.15);
})
