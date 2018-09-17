<template>
  <div class="member-list">
    <div class="title"><span v-if="userInfo.role == '2'">公司经理</span><span v-else>部门成员</span>管理</div>
    <div class="button-style">
      <el-button type="primary" @click="addMember()">添加成员</el-button>
    </div>
    <div class="member-box">
      <el-table
        :data="memberList"
        border
        style="width: 100%">
        <el-table-column
          prop="usernum"
          label="工号"
          width="160">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="company_name"
          label="公司名称">
        </el-table-column>
        <el-table-column
          prop="department_name"
          label="部门名称"
          width="140">
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="职位"
          width="120">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="160">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="联系方式"
          width="160">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button v-if="scope.row.usernum !== userInfo.usernum" @click="deleteMember(scope.row)" type="text" size="small">移除</el-button>
            <span v-else>--</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-box" v-if="memberList.length>0">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          layout="total, prev, pager, next"
          :total="memberListTotal">
        </el-pagination>
      </div>
      <!--dialog-->
      <el-dialog
        :title="dialogTitle"
        :visible.sync="confirmCreateVisiable"
        :before-close="handleClose"
        width="600px"
        center>
      ` <div>
        <el-form label-position="right" label-width="80px" :model="formUser">
          <el-form-item label="姓名">
            <el-input v-model="formUser.username" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="工号">
            <el-input v-model="formUser.usernum" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formUser.email" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="formUser.telephone" maxlength="11"></el-input>
          </el-form-item>
          <!--<el-form-item label="部门名称">-->
            <!--<el-select v-model="formUser.department_id" filterable placeholder="请选择">-->
              <!--<el-option-->
                <!--v-for="item in departmentListOptions"-->
                <!--:key="item.department_id"-->
                <!--:label="item.department_name"-->
                <!--:value="item.department_id">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button type="primary" :loading="loadingFlag" @click="successConfirm()">确 定</el-button>
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
        memberList: [],
        currentPage: 1,
        memberListTotal: 0,
        dialogTitle: '',
        formUser: {
          username: '',
          usernum: '',
          email: '',
          telephone: ''
        },
        confirmCreateVisiable: false,
        loadingFlag: false,
        departmentListOptions: [],
        selectedItem: '',
        confirmDeleteVisiable: false,
        dialogBody: ''
      }
    },
    created(){
     this.queryMemberList(1, 10);
    },
    computed: {
      ...mapGetters([
        "userInfo",
      ])
    },
    methods: {
      ...mapActions([
        "getDepartmentMemberList",
        "addUser",
        "deleteUser"
      ]),
      handleCurrentChange(currentPage){
        this.queryMemberList(currentPage,10)
      },
      queryMemberList(pageNum, pageSize){
        this.getDepartmentMemberList({pageNum, pageSize}).then( res => {
          if(res.errno == 0){
            console.log(res,'res')
            this.memberList = res.data.data;
            this.memberListTotal = res.data.count;
          }else{
            this.$message.error('服务器出了小差');
          }
        })
      },
      addMember(){
        this.confirmCreateVisiable = true;
        this.dialogTitle = '添加人员'
      },
      handleClose(){
        this.confirmCreateVisiable = false;
        this.loadingFlag = false;
        this.confirmDeleteVisiable = false;
      },
      successConfirm(){
        if(!this.formUser.username){ this.$message.warning('请输入姓名');}
        else if(!this.formUser.usernum){ this.$message.warning('请输入工号');}
        else if(!this.formUser.email){ this.$message.warning('请输入邮箱');}
        else if(!this.formUser.telephone){ this.$message.warning('请输入手机号');}
        else{
          this.loadingFlag = true;
          this.addUser(this.formUser).then(res => {
            if(res.errno == 0){
              this.$message.success('添加人员成功');
              this.confirmCreateVisiable = false;
              this.formUser = {};
            }else{
              this.$message.error('服务器出了小差');
            }
            this.loadingFlag = false;
          })
        }
      },
      deleteMember(item){
        console.log(item,'item');
        this.selectedItem = item;
        this.confirmDeleteVisiable = true;
        this.dialogTitle = '确认移除'
        this.dialogBody = '确认移除' + this.selectedItem.username + '(' + this.selectedItem.usernum + ')吗？'
      },
      confirmDelete(){
        this.loadingFlag = true;
        this.deleteUser({usernum: this.selectedItem.usernum}).then( res => {
          if(res.errno == 0){
            this.$message.success('删除成功');
            this.confirmDeleteVisiable = false;
            this.queryMemberList(1, 10);
          }else{
            this.$message.error('服务器出了小差');
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
