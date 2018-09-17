'use strict'
const Base = require('./base');
module.exports = class extends Base {
  /*获取所有的公司*/
  async getAllCompanyListAction() {
    try {
      let company = await this.model('company').select();
      return this.success(company);
    } catch(e) {
      return this.fail(e);
    }
  }

}
