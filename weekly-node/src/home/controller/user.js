const Base = require('./base');
module.exports = class extends Base {
    async loginAction() {
        let {username, password} = this.post();
        const salt = 'weekly';
        password = think.md5(salt + password);
        console.log(password,'111111111111111111111111111111111111111111111111');
        try {
            let user = await this.model('user').where({
                username,
            }).find();
            if(user.password && user.password == password) {
                // login success
                await this.session('userInfo',{username, userId:user.id});
                return this.success("登陆成功");
            } else {
                return this.fail("用户名或密码错误")
            }
        }
        catch(e) {
            console.log(e);
            return this.fail("登录失败")
        }
    }
    async queryuserAction() {
        try {
           console.log(this.user,'22222222222222222222222222');
            return this.success(this.user);
        } catch(e) {
            console.log(e);
            return this.fail(e);
        }
    }
    async logoutAction() {
        try {
            await this.session(null);
            return this.success("登出成功");
        } catch(e) {
            return this.fail(`登出失败${e}`)
        }
    }

    async changepassAction () {
        let {
            username,
            oldpassword,
            newpassword
        } = this.post()
        try {
            let user = await this.model('user').where({
                username,
            }).find();
            if(user.password && user.password == oldpassword) {
                // login success
                const salt = 'gshl';
                newpassword = think.md5(salt + newpassword);
                await this.model('user').where({
                    username
                }).update({
                    username,
                    password: newpassword
                })
                return this.success("修改成功");
            } else {
                return this.fail("原密码错误");
            }
        } catch(e) {
            return this.fail('修改失败');
        }
    }
    async registerAction() {
        let {username, password} = this.post();
        try {
            let userExist = await this.model('user').where({
                username
            }).select();
            if(!think.isEmpty(userExist)) {
                return this.fail("用户名已经存在");
            }
            const salt = 'gshl';
            password = think.md5(salt + password);
            await this.model('user').add({
                user,
                password
            });
            return this.success("注册成功");
        } catch(e) {
            return this.fail("注册失败", e);
        }
    }
}
