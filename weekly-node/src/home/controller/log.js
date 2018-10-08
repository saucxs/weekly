'use strict'
const Base = require('./base');
module.exports = class extends Base {
  /*获取登入和登出列表*/
  async getLoginLogAction() {
      let page = this.post('pageNum');
      let pagesize = this.post('pageSize');
      if(!page){ page = '1' }
      if(!pagesize){ pagesize = '10' }
      let searchContent = this.post('searchContent');
      try {
          if(this.user.role == 1){
              let logList = await this.model('log').where({
                  'usernum': ["like", "%"+searchContent+"%"],
              }).order("id desc").page(page, pagesize).countSelect();
              return this.success(logList);
          }else{
              return this.fail('你没有权限');
          }
      } catch(e) {
          return this.fail(e);
      }

  }

}
