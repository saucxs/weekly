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
  /*获取当前周的周报*/
  async getCurrentWeeklyAction() {
    let usernum = this.user.usernum;
    let username = this.user.username;
    // let currentDate = new Date().toLocaleDateString();
    let currentDayNum = new Date().getDay();
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let currentDate = new Date().getDate();
      //计算一周时间
    let startWeekDate = currentDate - currentDayNum  + 1;
    let endWeekDate =  currentDate + 7 - currentDayNum;
    let startWeek = currentYear + '/' +  currentMonth + '/' +  startWeekDate + ' 00:00:00';
    let endWeek = currentYear + '/' +  currentMonth + '/' +  endWeekDate + ' 23:59:59';
    console.log(startWeek,endWeek,'日期');
    let startWeekStamp = new Date(startWeek);
    let endWeektamp = new Date(endWeek);
    console.log(startWeekStamp,endWeektamp,'时间戳');
    console.log(endWeektamp<startWeekStamp,'时间戳比较')

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
