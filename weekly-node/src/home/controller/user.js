const Base = require('./base');
module.exports = class extends Base {
    async loginAction() {
        let {username,password} = this.post();
        const salt = 'weekly';
        password = think.md5(salt + password);
        console.log(password,'1111111111111111111');
        try {
            let user = await this.model('user').where({username}).find();
            if(user.cust_password && user.cust_password == password){
                await this.session('userInfo',{username:user.cust_name, userId:user.id});
                return this.success('登陆成功');
            }else{
                return this.fail("用户名或密码错误");
            }
        }catch(item){
            return this.fail("登录失败");
        }
    }
}