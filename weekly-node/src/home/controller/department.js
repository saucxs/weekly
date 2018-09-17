'use strict'
const Base = require('./base');
module.exports = class extends Base {
  /*获取未写周报部门人员列表*/
  async getUnDepartmentMemberListAction() {
    let list = this.post();
    if(!list.page){ list.page = '1' }
    if(!list.pagesize){ list.pagesize = '10' }
    console.log(list.usernumList, 'pppppppppppppppppppppppp');
    let usernumList = [];
    for(let i = 0; i < list.usernumList.length; i++) {
      usernumList[i] = list.usernumList[i].usernum;
    }
    if(list.usernumList.length > 0){
      try {
        let unWeeklyList;
        if(this.user.role == 2){
          unWeeklyList = await this.model('user').where({
            usernum: ['not in', usernumList],
            company_id: this.user.company_id,
            role: {'>=': this.user.role}
          }).order("role DESC").page(list.page, list.pagesize).countSelect();
        }else{
          unWeeklyList = await this.model('user').where({
            usernum: ['not in', usernumList],
            company_id: this.user.company_id,
            department_id: this.user.department_id,
            role: {'>=': this.user.role}
          }).order("role DESC").page(list.page, list.pagesize).countSelect();
        }
        return this.success(unWeeklyList);
      }catch(e){
        return this.fail('服务器开小差');
      }
    }else{
      try {
        let departmentMemberList;
        if(this.user.role == 2 ){
          departmentMemberList = await this.model('user').where({
            company_id: this.user.company_id,
            role: {'>=': this.user.role}
          }).order("role DESC").page(list.page, list.pagesize).countSelect();
        }else{
          departmentMemberList = await this.model('user').where({
            company_id: this.user.company_id,
            department_id: this.user.department_id,
            role: {'>=': this.user.role}
          }).order("role DESC").page(list.page, list.pagesize).countSelect();
        }
        return this.success(departmentMemberList);
      }catch(e){
        return this.fail('服务器开小差');
      }
    }
  }
  /*获取部门人员列表*/
  async getDepartmentMemberListAction() {
    let page = this.get('pageNum');
    let pagesize = this.get('pageSize');
    if(!page){ page = '1' }
    if(!pagesize){ pagesize = '10' }
    try {
      let departmentMemberList;
      if(this.user.role == 2){
        departmentMemberList = await this.model('user').where({
          company_id: this.user.company_id,
          role: {'>=': this.user.role}
        }).order("department_id asc , role asc").page(page, pagesize).countSelect();
      }else{
        departmentMemberList = await this.model('user').field('company_name, department_name, email, role, role_name, username, usernum,telephone').where({
          company_id: this.user.company_id,
          department_id: this.user.department_id,
          role: {'>=': this.user.role}
        }).order("department_id asc , role asc").page(page, pagesize).countSelect();
      }
      return this.success(departmentMemberList);
    }catch(e){
      return this.fail('服务器开小差');
    }
  }
  /*获取公司下所有部门*/
  async getAllDepartmentListAction() {
    let company_id = this.user.company_id;
    try {
      let department = await this.model('department').where(company_id).select();
      return this.success(department);
    } catch(e) {
      return this.fail(e);
    }
  }
}
