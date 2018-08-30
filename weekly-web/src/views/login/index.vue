<template>
<<<<<<< HEAD
  <div class="login-container" id="loginContainer">
    <img src="~assets/img/city.jpg" alt="" id="canvasImg" @load="handleRain">
    <canvas id="bgcanvas"></canvas>
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
             label-width="0px"
             class="card-box login-form">
      <h3 class="title">催收管理系统</h3>
      <el-form-item prop="staffCode">
        <span class="svg-container"></span>
        <el-input name="staffCode" type="text" @keyup.enter.native="handleLogin" v-model="loginForm.staffCode" autoComplete="on"
                  placeholder="账户"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container"></span>
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                  autoComplete="on" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <router-link to="/sendpwd" class="forget-pwd" v-if="forgetPwd">
        忘记密码?(或首次登录)
      </router-link>
    </el-form>
=======
  <div id="login">
    <div class="loginHeader">
      <h1>{{systemName}}</h1>
    </div>
    <div class="login_contenter">
      <div class="content_box">
        <div class="content_box_form">
          <h1>登&nbsp;&nbsp;录</h1>
          <p class="form_content" >
            <input minlength="6" maxlength="30" type="text" name="userName" placeholder="用户名/手机/邮箱" v-model="username" />
          </p>
          <p class="form_content" >
            <input minlength="6" maxlength="16" type="password" placeholder="密码"  v-model="password" />
          </p>
          <button class="loginBtn" @click="submit">登录</button>
        </div>
      </div>
    </div>
>>>>>>> d4afed3073315e7605657ff0849635410e90669a
  </div>
</template>

<script>
<<<<<<< HEAD
  import RainyDay from 'assets/lib/rainyday'

  export default {
    name: 'login',
    data () {
      const validateAccount = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入账户名'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          staffCode: '',
          password: ''
        },
        loginRules: {
          staffCode: [
            { required: true, trigger: 'blur', validator: validateAccount }
          ],
          password: [
            { required: true, trigger: 'blur', validator: validatePass }
          ]
        },
        canvasEngine: null,
        loading: false,
        showDialog: false,
        forgetPwd: false
      }
    },
    mounted () {
      document.addEventListener('keyup', this.handleEnter)
    },
    methods: {
      handleEnter (e) {
        const event = e || window.event
        if (event.keyCode === 13) {
          this.handleLogin()
        }
      },
      handleRain () {
        const engine = new RainyDay('bgcanvas', 'canvasImg', window.innerWidth, window.innerHeight)
        engine.gravity = engine.GRAVITY_NON_LINEAR
        engine.trail = engine.TRAIL_DROPS
        engine.VARIABLE_GRAVITY_ANGLE = Math.PI / 8
        engine.rain([
          engine.preset(0, 2, 0.5),
          engine.preset(4, 4, 1)
        ], 50)
        this.canvasEngine = engine
      },
      handleLogin () {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/login', this.loginForm).then(res => {
              this.loading = false
              this.$router.push({ path: '/' })
            }).catch(err => {
              this.$message.error(err)
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }

  }
</script>

<style lang="scss" scoped>
  .login-container {
    position: relative;
    height: 100%;
    overflow: hidden;

  #canvasImg {
    display: none;
  }

  #bgcanvas {
    position: absolute;
    top: 0px;
    left: 0px;
  }

  .title {
    text-align: center;
    margin-bottom: 50px;
    font-size: 40px;
    color: #fff;
  }
  .login-form {
    width: 400px;
    padding: 50px;
    position: absolute;
    z-index: 101;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .forget-pwd {
    font-size: 16px;
    color: #fff;
    float: right;
    text-decoration: none;
  }

  }
</style>
=======
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'login',
    data() {
      return {
        username: "",
        password: "",
      };
    },
    computed: {
      ...mapGetters([
        'systemName'
      ])
    },
    methods: {
      ...mapActions([
        "login",
        "getUserInfo",
      ]),
      submit(){
        var _this = this;
        var username =  _this.username;
        var password = _this.password;
        var param = {
          username : username,
          password : password
        }
        console.log(param,'param');
        if(username && password){
          this.login(param).then(res => {
            console.log(res,'res');
            if(res.errno == 0 ){
              _this.$router.push({ path: '/writeWeekly' });
              _this.getUserInfo().then(res => {
                console.log(res,'bbbbbbbbbbbbbbbbbb');
              })
            }else{
              console.log('aaaa');
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .loginHeader {
    height: 60px;
    padding: 14px 0 14px 10%;
  }

  .login_icon {
    display: block;
    width: 334px;
    height: 72px;
    display: inline-block;
  }

  .login_contenter {
    width: 100%;
    background-position: 100% 100%;
  }
  .login_contenter_bg{
    position:absolute;
    z-index: -100;
    width: 100%;
    height: 490px;
  }
  .content_box {
    width: 805px;
    height: 480px;
    padding: 50px 0px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .content_box_img_bg{
    position:absolute;
  }
  .content_box_form {
    box-sizing: border-box;
    display: inline-block;
    width: 320px;
    height: 380px;
    vertical-align: top;
    text-align: center;
    background-color: #ffffff;
    float: right;
    padding: 20px;
    margin-top: 2px;
  }
  .clear {
    clear: both;
  }
  h1 {
    list-style-type: none;
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #000000;
    letter-spacing: 10px;
  }
  .form_content {
    width: 100%;
    height: 36px;
    border: 1px solid #ddd6db;
    border-radius: 5px;
    margin: 30px 0;
    position: relative;
    padding: 0;
    text-align: left;
  }
  .form_content input {
    width: 88%;
    height: 34px;
    margin: 0 6px;
    position: absolute;
    outline: none;
    border: none;
  }
  input:focus::-webkit-input-placeholder {
    color: transparent;
  }
  .form_content img {
    width: 16px;
    height: 16px;
    display: inline-block;
    margin: 8px 4px;
  }
  .phoneYZ {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-top: 20px;
  }
  .dxyz {
    width: 50%;
    display: block;
    float: left;
  }
  .dxyz img {
    vertical-align: middle;
  }
  .dxyz a {
    text-decoration: none;
    color: #4f5870;
  }
  .forget {
    display: block;
    width: 30%;
    float: right;
  }
  .forget a {
    text-decoration: none;
    color: #5375F1;
    font-size: 14px;
  }
  .loginBtn {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 5px;
    background-color: #4764c0;
    color: #ffffff;
    border: none;
    cursor:pointer;
  }
  .registerBtn {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin-top: 30px;
    color: #4f5870;
  }
  .registerBtn a {
    text-decoration: none;
    color:#5375F1;
  }
  .showUserTips {
    display: block;
    width: 100%;
    border: 1px solid red;
    float: left;
    margin-top: -20px;
    z-index: 1000;
  }
  .border {
    border: 1px solid #55aaff;
  }
  .footer {
    width: 100%;
    text-align: center;
  }
  .footer ul {
    list-style-type: none;
    margin: 50px auto 20px auto;
    width: 430px;
    text-align: center;
  }
  .footer ul li {
    float: left;
  }
  .footer ul li {
    text-decoration: none;
    font-family: PingFang-SC-Medium;
    font-size: 16px;
    color: #22366d;
    letter-spacing: 0;
    border-right: 1px solid #000000;
    border-left: 1px solid #000000;
    width: 84px;
    display: inline-block;
    font-weight: 700;
  }
  .footer ul li a {
    text-decoration: none;
  }
  .footer ul li:nth-last-of-type(1) {
    border-right: none;
  }
  .footer ul li:nth-of-type(1) {
    border-left: none;
  }
  .footerBottom {
    width: 375px;
    height: 48px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #22366d;
    letter-spacing: 0;
    line-height: 24px;
    margin: 16px auto 42px auto;
  }
  .errorTip{
    font-size: 14px;
    color:#ed4747;
  }
  .viewPassword{
    position: absolute;
    cursor: pointer;
    right: 10px;
    top: 10px;
  }
  .colorViewPassword{
    position: absolute;
    cursor: pointer;
    right: 10px;
    top: 10px;
    color:#5579ee;
  }
</style>


>>>>>>> d4afed3073315e7605657ff0849635410e90669a
