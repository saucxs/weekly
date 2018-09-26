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
  /*公司新增部门*/
  async addDepartmentAction() {
    let {department_id, department_name, type, id} = this.post();
    console.log(department_id,department_name, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    try {
      if(type == 'add'){
        let userExistId = await this.model('department').where({
          department_id
        }).select();
        if(!think.isEmpty(userExistId)) {
          return this.fail("部门ID已经存在");
        }
        let userExistName = await this.model('department').where({
          department_name
        }).select();
        if(!think.isEmpty(userExistName)) {
          return this.fail("部门名称已经存在");
        }
        await this.model('department').add({
          company_id: this.user.company_id, company_name: this.user.company_name, department_id, department_name
        });
        return this.success("添加成功");
      }else if(type == 'edit'){
        await this.model('department').where({
          id, company_id: this.user.company_id, company_name: this.user.company_name
        }).update({
          department_id, department_name
        })
        return this.success("修改成功");
      }

    } catch(e) {
      return this.fail("添加失败", e);
    }
  }

  /*公司删除部门*/
  async deleteDepartmentAction() {
    let company_id = this.user.company_id;
    let {department_id} = this.post();
    try {
      await this.model('department').where({company_id, department_id}).delete();
      return this.success("删除成功");
    } catch(e) {
      return this.fail(`删除失败${e}`)
    }
  }

  /*各个公司的已写周报列表*/
  async getAllCompanyWeeklyAction() {
    let list = this.post();
    let searchContent = list.searchContent;
    let page = list.page;
    let pagesize = list.pagesize;
    if(!page){page = '1' }
    if(!pagesize){ pagesize = '10' };
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

    let companyList;
    let weeklyDataList = [];
    let companyWeeklyList;
    let tempData;

    try {
      companyList = await this.model('company').select();
      console.log(companyList,'11111111111111111111111111111111111')
      companyWeeklyList = await this.model('week').where({
        time: {'>': startWeekStamp, '<': endWeekStamp},
      }).order(['company_id']).page(page, pagesize).countSelect();
      console.log(companyWeeklyList,'222222222222222222222222222222222222222222222222222');
      for(let i=0;i<companyWeeklyList.length;i++){
        for(let j=0;j<companyList.length;j++){
          if(companyWeeklyList[i].company_id == companyList[j].company_id){
            tempData = {
              company_id: companyWeeklyList[i].company_id,
              company_name: companyList[j].company_name,
              children: companyWeeklyList
            };
            weeklyDataList.push(tempData);
          }
        }
      }
      return this.success(companyWeeklyList, weeklyDataList);
    } catch(e) {
      return this.fail(e);
    }
  }

}
