'use strict'
const Base = require('./base');
module.exports = class extends Base {
  /*获取部门role*/
  async getRoleAction() {
    let {company_id, department_id} = this.post();
    try {
      if(this.user.role == 2){
        if(department_id){
          let departmentLeaderExist = await this.model('user').where({
            company_id: this.user.company_id, department_id, role: 3
          }).select();
          if(!think.isEmpty(departmentLeaderExist)) {
            let role = await this.model('role').where({
              company_id: this.user.company_id,
              role: {'>': this.user.role + 1}
            }).select();
            return this.success(role);
          }else{
            let role = await this.model('role').where({
              company_id: this.user.company_id,
              role: {'>': this.user.role}
            }).select();
            return this.success(role);
          }
        }else{
          let role = await this.model('role').where({
            company_id: this.user.company_id,
            role: {'>': this.user.role}
          }).select();
          return this.success(role);
        }
      }else if(this.user.role == 1){
        if(department_id){
          let companyLeaderExist = await this.model('user').where({
            company_id, role: 2
          }).select();
          console.log(companyLeaderExist, '3333333333333333333333333333333333');
          console.log(think.isEmpty(companyLeaderExist), '4444444444444444444444444');
          /*role 2-总监，3-部门经理，4-组员*/
          if(!think.isEmpty(companyLeaderExist)) {
            //总监不为空
            let departmentLeaderExist = await this.model('user').where({
              company_id, department_id, role: 3
            }).select();
            if(!think.isEmpty(departmentLeaderExist)){
            //  部门不为空
              let role = await this.model('role').where({
                company_id: company_id,
                role: 4
              }).select();
              return this.success(role);
            }else{
              let role = await this.model('role').where({
                company_id: company_id,
                role:  {'>=': 3}
              }).select();
              return this.success(role);
            }
          }else{
            //为空
            let role = await this.model('role').where({
              company_id: company_id,
              role: {'>=': 2}
            }).select();
            return this.success(role);
          }
        }
      }
    } catch(e) {
      return this.fail(e);
    }
  }
}
