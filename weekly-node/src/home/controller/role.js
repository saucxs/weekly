'use strict'
const Base = require('./base');
module.exports = class extends Base {
  /*获取role*/
  async getRoleAction() {
    let {department_id} = this.post();
    try {
      if(department_id){
        let departmentLeaderExist = await this.model('user').where({
          department_id, role: 3
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

    } catch(e) {
      return this.fail(e);
    }
  }
}
