'use strict'
const Base = require('./base');
module.exports = class extends Base {
  async addWeeklyAction() {
    let { username, content, date } = this.post();
    try {
      let row = await this.model('week').add({username: username, content: content, date: date});
      console.log(row, 'row')
      return this.success(row);
    } catch(e) {
      return this.fail('服务器开小差');
    }
  }
}
