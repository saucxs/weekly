<template>
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
  </div>
</template>

<script>
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
