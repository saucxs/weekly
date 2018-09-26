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

  /*获取所有的人*/
  async getAllMemberListAction(){
      let page = this.post('pageNum');
      let pagesize = this.post('pageSize');
      let searchContent = this.post('searchContent');
      if(!page){ page = '1' }
      if(!pagesize){ pagesize = '10' }
      let allMemberList;
      try {
          allMemberList = await this.model('user').field('id, company_id, company_name, department_id, department_name, email, role, role_name, username, usernum,telephone')
              .where({
                  'username|usernum|company_name|department_name': ["like", "%"+searchContent+"%"],
              }).order("company_id asc, department_id asc, role asc").page(page, pagesize).countSelect();
          return this.success(allMemberList);
      } catch(e) {
          return this.fail(e);
      }
  }

}
