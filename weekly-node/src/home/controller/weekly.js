'use strict'
const Base = require('./base');
module.exports = class extends Base {
  async addWeeklyAction() {
    let { content, date, id } = this.post();
    let usernum = this.user.usernum;
    let role = this.user.role;
    let username = this.user.username;
    let time = new Date().getTime();
    let department_id = this.user.department_id;
    let company_id = this.user.company_id;
    /*计算一周时间戳*/
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let currentDay = new Date().getDate();
    let currentTimeStamp = new Date(currentYear, currentMonth, currentDay, 0, 0, 0).getTime();
    let currentDayNum = new Date().getDay();
    if(currentDayNum == 0) currentDayNum = 7;
    let startWeekNum = currentDayNum - 1;
    let endWeekNum =  7 - currentDayNum + 1;
    let startWeekStamp = currentTimeStamp - 1000 * 3600 * 24 * startWeekNum;
    let endWeekStamp = currentTimeStamp + 1000 * (3600 * 24 * endWeekNum - 1);
    try {
      if(id){
        let updateRow = await this.model('week').update({id, content, time});
        return this.success(updateRow);
      }else{
        let addRow = await this.model('week').add({usernum, username, content, role, date, time, startDate: startWeekStamp, endDate: endWeekStamp, department_id, company_id });
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
    let currentDayNum =  new Date().getDay();
    if(currentDayNum == 0) currentDayNum = 7;
    let startWeekNum = currentDayNum - 1 ;
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

    /*获取本人-历史周报列表*/
    async getWeeklyListAction() {
        let usernum = this.user.usernum;
        let username = this.user.username;
        let page = this.get('pageNum');
        let pagesize = this.get('pageSize');
        if(!page){ page = '1' }
        if(!pagesize){ pagesize = '10' }
        try {
          let model = this.model('week');
          let weeklyList = await model.where({ usernum, username }).order("time DESC").page(page, pagesize).countSelect();
          return this.success(weeklyList);
        }catch(e){
            return this.fail('服务器开小差');
        }
    }

  /*获取公司-部门周报列表  部门总监，部门经理*/
  async getDepartmentWeeklyListAction() {
    let page = this.post('pageNum');
    let pagesize = this.post('pageSize');
    let searchContent = this.post('searchContent');

      let companyNumber;
      let companyWeeklyList;
      let unWeeklyList;
      let usernumList = [];

      if(!page){ page = '1' }
      if(!pagesize){ pagesize = '10' }
      /*计算一周时间戳*/
      let currentYear = new Date().getFullYear();
      let currentMonth = new Date().getMonth();
      let currentDay = new Date().getDate();
      let currentTimeStamp = new Date(currentYear, currentMonth, currentDay, 0, 0, 0).getTime();
      let currentDayNum = new Date().getDay();
      if(currentDayNum == 0) currentDayNum = 7;
      let startWeekNum = currentDayNum - 1;
      let endWeekNum =  7 - currentDayNum + 1;
      let startWeekStamp = currentTimeStamp - 1000 * 3600 * 24 * startWeekNum;
      let endWeekStamp = currentTimeStamp + 1000 * (3600 * 24 * endWeekNum - 1);
    try {
      // select * from weekly.week_week inner join weekly.week_user on week_user.usernum = week_week.usernum where week_user.comapny_id = 'eastmoney' and week_user.department_id='dataCenter'
      if(this.user.role == 2){
        let companyWeeklyList = await this.model('week').where({
          'username|usernum|content': ["like", "%"+searchContent+"%"],
          company_id: this.user.company_id,
          time: {'>': startWeekStamp, '<': endWeekStamp},
          role: {'>=': this.user.role}
        }).order("role asc, time DESC").page(page, pagesize).countSelect();
        return this.success(companyWeeklyList);
      }else if(this.user.role == 3){
        let departmentWeeklyList = await this.model('week').where({
          'username|usernum|content': ["like", "%"+searchContent+"%"],
          company_id: this.user.company_id,
          department_id: this.user.department_id,
          time: {'>': startWeekStamp, '<': endWeekStamp},
          role: {'>=': this.user.role}
        }).order("role asc, time DESC").page(page, pagesize).countSelect();
        return this.success(departmentWeeklyList);
      }else if(this.user.role == 1){
        let company = await this.model('company').select();
        let tempData = [];
        let companyWeeklyData;
        for(let i=0;i<company.length;i++){
          if(searchContent[i] == undefined){
            searchContent[i] = ''
          }
          /*搜索-公司周报列表*/
          companyWeeklyData = await this.model('week').where({
            'username|usernum|content': ["like", "%"+searchContent[i]+"%"],
            company_id: company[i].company_id,
            time: {'>': startWeekStamp, '<': endWeekStamp},
          }).order("role asc, time DESC").page(page, pagesize).countSelect();
            /*公司人数*/
            companyNumber = await this.model('user').where({
                company_id: company[i].company_id
            }).count('usernum');
            /*公司已填周报人数*/
            companyWeeklyList = await this.model('week').where({
                company_id: company[i].company_id,
                time: {'>': startWeekStamp, '<': endWeekStamp}
            }).select();

            for(let i = 0; i < companyWeeklyList.length; i++) {
                usernumList[i] = companyWeeklyList[i].usernum;
            }
            unWeeklyList = await this.model('user').field('id, company_id, company_name, department_id, department_name, email, role, role_name, username, usernum,telephone').where({
                usernum: ['not in', usernumList],
                company_id: company[i].company_id
            }).select();
          tempData.push({
            companyNumber: companyNumber,
            companyWeeklyList: companyWeeklyList,
            unWeeklyList: unWeeklyList,
            company_id: company[i].company_id,
            company_name: company[i].company_name,
            children: companyWeeklyData
          })
        }
        return this.success(tempData);
      }
    }catch(e){
      return this.fail('服务器开小差');
    }
  }

  /*获取公司的人数，已写周报人数*/
  async adminGetCompanyCount(){
      let company = await this.model('company').select();
      let tempFlagData = [];
      let companyNumber;
      let companyWeeklyNumber;
      /*计算一周时间戳*/
      let currentYear = new Date().getFullYear();
      let currentMonth = new Date().getMonth();
      let currentDay = new Date().getDate();
      let currentTimeStamp = new Date(currentYear, currentMonth, currentDay, 0, 0, 0).getTime();
      let currentDayNum = new Date().getDay();
      if(currentDayNum == 0) currentDayNum = 7;
      let startWeekNum = currentDayNum - 1;
      let endWeekNum =  7 - currentDayNum + 1;
      let startWeekStamp = currentTimeStamp - 1000 * 3600 * 24 * startWeekNum;
      let endWeekStamp = currentTimeStamp + 1000 * (3600 * 24 * endWeekNum - 1);
      try{
          for(let i=0;i<company.length;i++){
              companyNumber = await this.model('user').where({
                  company_id: company[i].company_id
              }).count('usernum');

              companyWeeklyNumber = await this.model('week').where({
                  company_id: company[i].company_id,
                  time: {'>': startWeekStamp, '<': endWeekStamp}
              }).count('usernum');

              tempFlagData.push({
                  companyNumber: companyNumber,
                  companyWeeklyNumber: companyWeeklyNumber
              })
          }
          return this.success(tempFlagData);
      }catch(e){
          return this.fail('服务器开小差');
      }
  }

}
