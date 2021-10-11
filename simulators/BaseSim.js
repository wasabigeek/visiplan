export default class BaseSim {
  constructor(baseConfig, userConfig, childSims = []) {
    this.baseConfig = baseConfig;
    this.userConfig = userConfig;
    this.childSims = childSims;
  }

  apply_monthly_updates(params) {
    this.childSims.forEach(childSim => {
      childSim.apply_monthly_updates(params)
    });
    this.monthly_update_hook(params);
  }

  apply_monthly_interest(params) {
    this.childSims.forEach(childSim => {
      childSim.apply_monthly_interest(params)
    });
    this.monthly_interest_hook(params);
  }

  apply_yearly_updates(params) {
    this.childSims.forEach(childSim => {
      childSim.apply_yearly_interest(params)
    });
    this.yearly_update_hook(params);
  }

  apply_yearly_interest(params) {
    this.childSims.forEach(childSim => {
      childSim.apply_yearly_interest(params)
    });
    this.yearly_interest_hook(params);
  }

  monthly_update_hook() {
  }

  monthly_interest_hook() {
  }

  yearly_update_hook() {
  }

  yearly_interest_hook() {
  }
}