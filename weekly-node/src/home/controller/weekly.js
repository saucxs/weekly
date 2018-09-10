'use strict'
const Base = require('./base');
module.exports = class extends Base {
  async addWeeklyAction() {
    let { content, date, id } = this.post();
    let usernum = this.user.usernum;
    let role = this.user.role;
    let username = this.user.username;
    let time = new Date().getTime();
    /*计算一周时间戳*/
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let currentDay = new Date().getDate();
    let currentTimeStamp = new Date(currentYear, currentMonth, currentDay, 0, 0, 0).getTime();
    let currentDayNum = new Date().getDay();
    let startWeekNum = currentDayNum - 1;
    let endWeekNum =  7 - currentDayNum + 1;
    let startWeekStamp = currentTimeStamp - 1000 * 3600 * 24 * startWeekNum;
    let endWeekStamp = currentTimeStamp + 1000 * (3600 * 24 * endWeekNum - 1);
    try {
      // let weekly = await this.model('week').where({
      //   usernum: usernum, username: username, time: {'>': startWeekStamp, '<': endWeekStamp}
      // }).find();
      // console.log(weekly,'hhhhhh');
      if(id){
        let updateRow = await this.model('week').update({id, usernum, username, content, time});
        return this.success(updateRow);
      }else{
        let addRow = await this.model('week').add({usernum, username, content, role, date, time, startDate: startWeekStamp, endDate: endWeekStamp});
        return this.success(addRow);
      }
    } catch(e) {
      return this.fail('服务器开小差');
    }
  }

  /*获取当前周的周报*/
  async getCurrentWeeklyAction() {
    let usernum = this.user.usernum;
    let username = this.user.username;
    /*计算一周时间戳*/
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let currentDay = new Date().getDate();
    let currentTimeStamp = new Date(currentYear, currentMonth, currentDay, 0, 0, 0).getTime();
    let currentDayNum = new Date().getDay();
    let startWeekNum = currentDayNum - 1;
    let endWeekNum =  7 - currentDayNum + 1;
    let startWeekStamp = currentTimeStamp - 1000 * 3600 * 24 * startWeekNum;
    let endWeekStamp = currentTimeStamp + 1000 * (3600 * 24 * endWeekNum - 1);
    try {
      let weekly = await this.model('week').where({
        usernum: usernum, username: username, time: {'>': startWeekStamp, '<': endWeekStamp}
      }).find();
      return this.success(weekly);
    }catch(e){
      return this.fail('服务器开小差');
    }
  }

    /*获取周报列表*/
    async getWeeklyListAction() {
        let usernum = this.user.usernum;
        let username = this.user.username;
        try {
            let weeklyList = await this.model('week').where({
                usernum: usernum, username: username
            }).select();
            return this.success(weeklyList);
        }catch(e){
            return this.fail('服务器开小差');
        }
    }

    getList() {
      return this.join({
        table: 'user',
        join: 'inner',
        as: 'c',
        on: ['usernum', 'usernum']
      }).select();
    }
  /*获取部门周报列表*/
  async getDepartmentWeeklyListAction() {
    let params = {
      company_id: this.user.company_id,
      department_id: this.user.department_id
    }
    try {
      // select * from weekly.week_week inner join weekly.week_user on week_user.usernum = week_week.usernum where week_user.comapny_id = 'eastmoney' and week_user.department_id='dataCenter'
      let departmentWeeklyList = this.getList();
      // let userList = await this.model('user').where(params).select();
      // console.log(userList, 'oooooooooooooooooooooooooo')
      // let departmentWeeklyList = await this.model('week').where({usernum: ['in', userList]});
      console.log(departmentWeeklyList, '000000000000000000000000000000000')
      return this.success(departmentWeeklyList);
    }catch(e){
      return this.fail('服务器开小差');
    }
  }

}
