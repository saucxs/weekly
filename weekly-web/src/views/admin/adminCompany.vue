<template>
  <div class="member-list" v-if="userInfo.role == 1">
    <div class="title">公司管理</div>
    <div class="button-style">
      <el-button type="primary" @click="addCompanyDialog()">添加公司</el-button>
    </div>
    <div class="member-box">
      <el-table
        :data="companyList"
        border
        style="width: 100%">
        <el-table-column
          prop="company_id"
          label="公司ID"
          width="140">
        </el-table-column>
        <el-table-column
          prop="company_name"
          label="公司名">
        </el-table-column>
        <el-table-column
          prop="usernum"
          label="负责人ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="username"
          label="负责人姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="手机号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="100">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          width="160">
        </el-table-column>
        <el-table-column
          prop="update_time"
          label="更新时间"
          width="160">
        </el-table-column>
        <el-table-column
          label="操作"
          width="90">
          <template slot-scope="scope">
            <el-button @click="editCompanyDialog(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteCompanyDialog(scope.row)" type="text" size="small">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <!--dialog-->
      <el-dialog
        :title="dialogTitle"
        :visible.sync="confirmCreateVisiable"
        :before-close="handleClose"
        width="600px"
        center>
       <div>
        <el-form label-position="right" label-width="100px" :model="formUser">
          <el-form-item label="公司ID">
            <el-input v-model="formUser.company_id" maxlength="20" v-if="dialogTitle == '添加公司'"></el-input>
            <el-input v-model="formUser.company_id" maxlength="20" v-if="dialogTitle == '修改公司'" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="公司名称">
            <el-input v-model="formUser.company_name" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="负责人ID">
            <el-input v-model="formUser.usernum" maxlength="20" v-if="dialogTitle == '添加公司'"></el-input>
            <el-input v-model="formUser.usernum" maxlength="20" v-if="dialogTitle == '修改公司'" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="负责人姓名">
            <el-input v-model="formUser.username" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="formUser.telephone" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formUser.email" maxlength="60"></el-input>
          </el-form-item>
        </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button v-if="dialogTitle == '添加公司'" type="primary" :loading="loadingFlag" @click="successConfirm('add')">确 定</el-button>
          <el-button v-if="dialogTitle == '修改公司'" type="primary" :loading="loadingFlag" @click="successConfirm('edit')">确 定</el-button>
        </span>
      </el-dialog>
      <!--dialog small-->
      <el-dialog
        :title="dialogTitle"
        :visible.sync="confirmDeleteVisiable"
        :before-close="handleClose"
        width="400px"
        center>
        <p>{{dialogBody}}</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button type="primary" :loading="loadingFlag" @click="confirmDelete()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    data(){
      return {
        searchContent: '',
        companyList: [],
        dialogTitle: '',
        confirmCreateVisiable: false,
        formUser: {
          company_id: '',
          company_name: '',
          usernum: '',
          username: '',
          telephone: '',
          email: ''
        },
        confirmDeleteVisiable: false,
        dialogBody: '',
        loadingFlag: false,
        selectedItem: ''
      }
    },
    created(){
     this.queryCompany();
    },
    computed: {
      ...mapGetters([
        "userInfo",
      ])
    },
    methods: {
      ...mapActions([
        "getAllCompanyList",
        "addUpdateCompany",
        "deleteCompany"
      ]),
      queryCompany(){
        this.getAllCompanyList().then(res => {
          if(res.errno == 0){
            this.companyList = res.data;
          }else{
            this.$message.error(res.errmsg|| '服务器开小差');
          }
        })
      },
      addCompanyDialog(){
        this.confirmCreateVisiable = true;
        this.dialogTitle = '添加公司';
      },
      editCompanyDialog(item){
        this.confirmCreateVisiable = true;
        this.dialogTitle = '修改公司';
//        console.log(item,'item');
        this.formUser = item;
      },
      successConfirm(type){
//        console.log(type);
        if(!this.formUser.company_id){ this.$message.warning('请输入公司id');}
        else if(!this.formUser.company_name){ this.$message.warning('请输入公司名称');}
        else if(!this.formUser.usernum){ this.$message.warning('请输入负责人id');}
        else if(!this.formUser.username){ this.$message.warning('请输入负责人姓名');}
        else if(!this.formUser.telephone){ this.$message.warning('请输入手机号');}
        else if(this.formUser.telephone && !(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.formUser.telephone))){ this.$message.warning('请输入正确手机号');}
        else if(!this.formUser.email){ this.$message.warning('请输入邮箱');}
        else if(this.formUser.email && !(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(this.formUser.email))){ this.$message.warning('请输入正确邮箱');}
        else{
          this.formUser.type = type;
          this.addUpdateCompany(this.formUser).then(res => {
            if (res.errno == 0) {
              this.$message.success(res.data || '添加成功');
              this.queryCompany();
              this.confirmCreateVisiable = false;
              this.formUser = {};
            }else{
              this.$message.error(res.errmsg|| '服务器开小差');
            }
          })
        }

      },
      handleClose(){
        this.confirmCreateVisiable = false;
        this.formUser = {};
        this.confirmDeleteVisiable = false;
        this.selectedItem = '';
        this.queryCompany();
      },
      deleteCompanyDialog(item){
        this.selectedItem = item;
        this.confirmDeleteVisiable = true;
        this.dialogTitle = '确认移除';
        this.dialogBody = '确认移除，' + this.selectedItem.company_name + '(' + this.selectedItem.company_id + ')吗？'
      },
      confirmDelete(){
        this.loadingFlag = true;
        this.deleteCompany(this.selectedItem).then( res => {
          if(res.errno == 0){
            this.$message.success('删除成功');
            this.confirmDeleteVisiable = false;
            this.queryCompany();
          }else{
            this.$message.error(res.errmsg || '服务器出了小差');
          }
          this.loadingFlag = false;
        })
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .member-list{
    & .button-style{
      text-align: right;
      margin-bottom: 10px;
      }
    & .pagination-box{
        text-align: right;
        margin: 10px 0px;
      }
  }

</style>
