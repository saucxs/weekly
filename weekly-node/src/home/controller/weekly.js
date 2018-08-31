'use strict'
const Base = require('./base');
module.exports = class extends Base {
  async addWeeklyAction() {
    let { content, date } = this.post();
    let usernum = this.user.usernum;
    let role = this.user.role;
    let username = this.user.username;
    let time = new Date().getTime();
    try {
      let row = await this.model('week').add({usernum, username, content, role, date, time});
      console.log(row, 'row')
      return this.success(row);
    } catch(e) {
      return this.fail('服务器开小差');
    }
  }

  async getCurrentWeeklyAction() {
    let usernum = this.user.usernum;
    let username = this.user.username;
    let currentDate = new Date().toLocaleDateString();
    try {
      let weekly = await this.model('week').where({
        usernum,username
      }).find();
      return this.success(weekly);
    }catch(e){
      return this.fail('服务器开小差');
    }
  }
}
