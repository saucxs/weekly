const Base = require('../../common/controller/base');
module.exports = class extends Base {
    async __before() {
        let user = await this.session("cust_num");
        console.log(user,"user");
    }
}