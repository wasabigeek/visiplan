export default class BaseSim {
  constructor(baseConfig, userConfig) {
    this.accountStore = baseConfig.accountStore
    this.config = userConfig;
  }

  apply_monthly_updates() {
  }

  apply_monthly_interest() {
  }

  apply_yearly_updates() {
  }

  apply_yearly_interest() {
  }
}