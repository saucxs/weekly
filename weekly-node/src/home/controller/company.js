'use strict'
const Base = require('./base');
module.exports = class extends Base {
  /*获取所有的公司列表*/
  async getAllCompanyListAction() {
    try {
      if(this.user.role == 1 || this.user.role == 2){
        let company = await this.model('company').select();
        return this.success(company);
      }else{
        return this.fail('你没有权限');
      }
    } catch(e) {
      return this.fail(e);
    }
  }
  /*新增公司*/
  async addUpdateCompanyAction() {
    try{
      let {id,create_time, type, company_id, company_name, usernum, username, telephone, email} = this.post();
      if(this.user.role == 1){
        if(type == 'add'){
          let companyExistId = await this.model('company').where({
            company_id
          }).select();
          if(!think.isEmpty(companyExistId)) {
            return this.fail("公司ID已经存在");
          }
          let companyExistName = await this.model('company').where({
            company_name
          }).select();
          if(!think.isEmpty(companyExistName)) {
            return this.fail("公司名称已经存在");
          }
          let companyExistLeaderId = await this.model('user').where({
            usernum
          }).select();
          if(!think.isEmpty(companyExistLeaderId)) {
            return this.fail("负责人ID已经存在");
          }
          let dateTime = new Date();
          let create_time = dateTime.getFullYear() + '-' +  Number(dateTime.getMonth() + 1 )  + '-' + dateTime.getDate() + ' '+ dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds();
          await this.model('company').add({
            company_id, company_name, usernum, username, telephone, email, create_time
          });
          const salt = 'weekly';
          let password = think.md5(salt + '123456');
          await this.model('user').add({
            usernum, username, telephone, role: 2, role_name: '总监', password, email, company_id, company_name
          });
          await this.model('role').addMany([{
            company_id, role: 2, role_name: '总监'
          }, {
            company_id, role: 3, role_name: '部门经理'
          }, {
            company_id, role: 4, role_name: '成员'
          }])
          return this.success("添加成功");
        }else if(type == 'edit'){
          let dateTime = new Date();
          let update_time = dateTime.getFullYear() + '-' +  Number(dateTime.getMonth() + 1 )  + '-' + dateTime.getDate() + ' '+ dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds();
          await this.model('company').where({
            id, company_id, create_time
          }).update({
            company_name, update_time
          })
          return this.success("修改成功");
        }
      }else{
        return this.fail('你没有权限');
      }
    }catch(e){
      return this.fail(e);
    }
  }

  /*删除公司*/
  async deleteCompanyAction() {
    let {id, company_id, company_name} = this.post();
    try {
      if(this.user.role == 1){
        await this.model('company').where({id, company_id, company_name}).delete();
        await this.model('department').where({company_id}).delete();
        await this.model('role').where({company_id}).delete();
        await this.model('user').where({company_id}).delete();
        await this.model('week').where({company_id}).delete();
        return this.success("删除成功");
      }else{
        return this.fail('你没有权限');
      }
    } catch(e) {
      return this.fail(`删除失败${e}`)
    }
  }

  /*公司新增部门*/
  async addDepartmentAction() {
    let {department_id, department_name, type, id, company_id, company_name} = this.post();
    try {
      if(type == 'add'){
        if(this.user.role == 1 && company_id && company_name){
          let userExistId = await this.model('department').where({
            company_id, department_id
          }).select();
          if(!think.isEmpty(userExistId)) {
            return this.fail("部门ID已经存在");
          }
          let userExistName = await this.model('department').where({
            company_id, department_name
          }).select();
          if(!think.isEmpty(userExistName)) {
            return this.fail("部门名称已经存在");
          }
          await this.model('department').add({
            company_id: company_id, company_name: company_name, department_id, department_name
          });
        }else if(this.user.role == 2){
          let userExistId = await this.model('department').where({
            company_id: this.user.company_id, department_id
          }).select();
          if(!think.isEmpty(userExistId)) {
            return this.fail("部门ID已经存在");
          }
          let userExistName = await this.model('department').where({
            company_id: this.user.company_id, department_name
          }).select();
          if(!think.isEmpty(userExistName)) {
            return this.fail("部门名称已经存在");
          }
          await this.model('department').add({
            company_id: this.user.company_id, company_name: this.user.company_name, department_id, department_name
          });
        }
        return this.success("添加成功");
      }else if(type == 'edit'){
        if(this.user.role == 1 && company_id && company_name){
          await this.model('department').where({
            id, company_id: company_id, company_name: company_name
          }).update({
            department_name
          })
        }else if(this.user.role == 2){
          await this.model('department').where({
            id, company_id: this.user.company_id, company_name: this.user.company_name
          }).update({
            department_name
          })
        }
        return this.success("修改成功");
      }

    } catch(e) {
      return this.fail("添加失败", e);
    }
  }

  /*公司删除部门*/
  async deleteDepartmentAction() {
    let company_id = this.user.company_id || this.post('company_id');
    let {department_id} = this.post();
    try {
      await this.model('department').where({company_id, department_id}).delete();
      await this.model('user').where({company_id, department_id}).delete();
      await this.model('week').where({company_id, department_id}).delete();
      return this.success("删除成功");
    } catch(e) {
      return this.fail(`删除失败${e}`)
    }
  }

  /*获取所有的人列表*/
  async getAllMemberListAction(){
      let page = this.post('pageNum');
      let pagesize = this.post('pageSize');
      let company_id = this.post('company_id');
      if(!page){ page = '1' }
      if(!pagesize){ pagesize = '10' }
      let allMemberList;
      try {
          allMemberList = await this.model('user').field('id, company_id, company_name, department_id, department_name, email, role, role_name, username, usernum,telephone')
              .where({
                 company_id: company_id
              }).order("company_id asc, department_id asc, role asc").page(page, pagesize).countSelect();
          return this.success(allMemberList);
      } catch(e) {
          return this.fail(e);
      }
  }

}
