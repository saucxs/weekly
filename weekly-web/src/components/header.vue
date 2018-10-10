<template>
  <header class="header">
    <div class="header-box">
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <a class="header-logo" href="/weekly/writeWeekly">
            <i class="el-icon-edit-outline icon-white-style"></i>
            <h1>&nbsp;|&nbsp;{{systemName}}</h1>
          </a>
        </el-col>
        <el-col :span="11">
          <el-row type="flex" justify="end">
            <el-dropdown>
              <div class="header-user-name">{{userInfo.username}}<i class="el-icon-caret-bottom el-icon--right"></i></div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <a class="a-style" @click="changPassword()">修改密码</a>
                </el-dropdown-item>
                <el-dropdown-item>
                  <a class="a-style" @click="signOut()">退出</a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <!--修改密码-->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="changePawwordVisiable"
      width="400px"
      :before-close="handleClose"
      center>
      <el-form label-position="right" label-width="80px" :model="changePasswordForm">
        <el-form-item label="原密码">
          <el-input maxlength="16" oninput="this.value=this.value.replace(/[^\w]/g,'') " v-model="changePasswordForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input maxlength="16" oninput="this.value=this.value.replace(/[^\w]/g,'')" v-model="changePasswordForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input maxlength="16" oninput="this.value=this.value.replace(/[^\w]/g,'')" v-model="changePasswordForm.confirmNewPassword"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button type="primary" :loading="loadingFlag" @click="confirmChangePassword()">确 定</el-button>
        </span>
    </el-dialog>
  </header>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
   export default {
    name: 'Header',
    data() {
      return {
        dialogTitle: '',
        loadingFlag: false,
        changePawwordVisiable: false,
        changePasswordForm: {
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        }
      }
    },
     // beforeRouteEnter: (to, from, next) => {
     //   next(vm => {
     //     vm.getUserInfo();
     //   });
     // },
    computed: {
      ...mapGetters([
        "userInfo",
        "systemName"
      ])
    },
     methods: {
       ...mapActions([
         "getUserInfo",
         "logout",
         "changePassword"
       ]),
       signOut() {
         this.logout().then(res => {
           if(res.errno == 0){
             this.$router.push({ path: '/weekly/login' });
             this.$store.commit("USER_INFO", {});
           }else{
             this.$message.error(res.errmsg|| '服务器开小差');
           }
         })
       },
       changPassword() {
         this.changePawwordVisiable = true;
         this.dialogTitle = '修改密码'
       },
       handleClose(){
        this.clearAll();
        this.changePawwordVisiable = false;
       },
       clearAll(){
         this.changePasswordForm.oldPassword = '';
         this.changePasswordForm.newPassword = '';
         this.changePasswordForm.confirmNewPassword = '';
       },
       confirmChangePassword() {
         if(!this.changePasswordForm.oldPassword){
           this.$message.warning( '请输入原密码');
         }else if(!this.changePasswordForm.newPassword){
           this.$message.warning( '请输入新密码');
         }else if(!this.changePasswordForm.confirmNewPassword){
           this.$message.warning( '请输入确认新密码');
         }else{
           if (this.changePasswordForm.newPassword != this.changePasswordForm.confirmNewPassword) {
             this.$message.warning( '新密码和确认密码不一致');
           } else {
             var passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
             if (passwordReg.test(this.changePasswordForm.newPassword)) {
               let params = {
                 usernum: this.userInfo.usernum,
                 oldpassword: this.changePasswordForm.oldPassword,
                 newpassword: this.changePasswordForm.newPassword
               }
               this.loadingFlag = true;
               this.changePassword(params).then(res => {
                 if (res.errno === 0) {
                   this.clearAll();
                   this.changePawwordVisiable = false;
                   this.$message.success( '密码修改成功');
                 } else {
                   this.$message.error(res.errmsg);
                 }
                 this.loadingFlag = false;
               }).catch()
             } else {
               this.$message.warning('密码需满足至少6-16位,必须含有数字和字母');
             }
           }
         }
       }
     }
  }

</script>

<style lang="postcss" scoped>
.header {
  color: #fff;
  font-size: 16px;
  background: #3a79ff;
  height: 46px;
  line-height: 46px;
  font-weight: 700;
  box-shadow: 0 2px 10px 0 rgb(0, 0, 0, 0.4);
  & .header-box{
    width: 1360px;
    margin: 0 auto;
    background: #3a79ff;
    & .header-logo{
        color: #fff;
        display: flex;
        align-items: center;
      & .icon-white-style{
        font-size: 20px;
      }
      & > h1 {
         display: inline-block;
         font-size: 18px;
         margin: 0;
       }
    }
  }
  & .header-user-name {
    cursor: pointer;
    color: #fff;
  }
}
</style>
