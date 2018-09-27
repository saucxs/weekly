<template>
  <div class="member-list">
    <el-row v-if="userInfo.role == 2 || userInfo.role == 3">
      <div class="title"><span v-if="userInfo.role == 2">公司</span><span v-else>部门成员</span>管理</div>
      <el-row>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <el-col :span="16">
            <el-input placeholder="请输入内容" maxlength="20" v-model="searchContent" clearable class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="search()">查询</el-button>
            </el-input>
          </el-col>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="button-style">
            <el-button type="primary" @click="addMember('add')">添加成员</el-button>
          </div>
        </el-col>
      </el-row>
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
              <el-button v-if="scope.row.usernum !== userInfo.usernum" @click="addMember('edit',scope.row)" type="text" size="small">编辑</el-button>
              <el-button v-if="scope.row.usernum !== userInfo.usernum" @click="deleteMember(scope.row)" type="text" size="small">移除</el-button>
              <el-button v-if="scope.row.usernum == userInfo.usernum" @click="addMember('edit',scope.row)" type="text" size="small">编辑</el-button>
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
          <div>
            <el-form label-position="right" label-width="80px" :model="formUser">
              <el-form-item label="姓名">
                <el-input v-model="formUser.username" maxlength="10"></el-input>
              </el-form-item>
              <el-form-item label="工号">
                <el-input v-model="formUser.usernum" maxlength="13"></el-input>
              </el-form-item>
              <el-form-item label="部门名称"  v-if="userInfo.role == 2">
                <el-select v-model="formUser.department_id" @change="changeDepartment()" placeholder="请选择">
                  <el-option
                    v-for="item in departmentListOptions"
                    :key="item.department_id"
                    :label="item.department_name"
                    :value="item.department_id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="部门职务"  v-if="userInfo.role == 2">
                <el-select v-model="formUser.role" placeholder="请选择">
                  <el-option
                    v-for="item in roleListOptions"
                    :key="item.role"
                    :label="item.role_name"
                    :value="item.role">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formUser.email" maxlength="60"></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="formUser.telephone" maxlength="11" oninput="this.value=this.value.replace(/[^\d]/g,'')" ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button v-if="dialogTitle == '添加人员信息'" type="primary" :loading="loadingFlag" @click="successConfirm('add')">确 定</el-button>
          <el-button v-if="dialogTitle == '修改人员信息'" type="primary" :loading="loadingFlag" @click="successConfirm('edit')">确 定</el-button>
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
    </el-row>
    <el-row v-if="userInfo.role == 1">
      <div class="title">所有人员管理</div>
      <el-row class="search-style">
        <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
          <el-col :span="12">
            <label>公司:</label>
            <el-select v-model="companyId" @change="changeCompany()">
              <el-option
                v-for="item in companyOptions"
                :key="item.company_id"
                :label="item.company_name"
                :value="item.company_id">
              </el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <div class="button-style">
            <el-button type="primary" @click="addMemberAdmin('add')">添加成员</el-button>
          </div>
        </el-col>
      </el-row>
      <div class="member-box">
        <el-table
          :data="memberListAdmin"
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
        </el-table>
        <div class="pagination-box" v-if="memberListAdmin.length>0">
          <el-pagination
            background
            @current-change="handleCurrentChangeAdmin"
            :current-page.sync="currentPage"
            layout="total, prev, pager, next"
            :total="memberListTotalAdmin">
          </el-pagination>
        </div>
        <!--dialog-->
        <el-dialog
          :title="dialogTitle"
          :visible.sync="confirmCreateVisiable"
          :before-close="handleClose"
          width="600px"
          center>
          <div>
            <el-form label-position="right" label-width="80px" :model="formUser">
              <el-form-item label="姓名">
                <el-input v-model="formUser.username" maxlength="10"></el-input>
              </el-form-item>
              <el-form-item label="工号">
                <el-input v-model="formUser.usernum" maxlength="13"></el-input>
              </el-form-item>
              <el-form-item label="部门名称"  v-if="userInfo.role == 1 || userInfo.role == 2">
                <el-select v-model="formUser.department_id" @change="changeDepartment()" placeholder="请选择">
                  <el-option
                    v-for="item in departmentListOptions"
                    :key="item.department_id"
                    :label="item.department_name"
                    :value="item.department_id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="部门职务"  v-if="userInfo.role == 1 || userInfo.role == 2">
                <el-select v-model="formUser.role" placeholder="请选择">
                  <el-option
                    v-for="item in roleListOptions"
                    :key="item.role"
                    :label="item.role_name"
                    :value="item.role">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formUser.email" maxlength="60"></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="formUser.telephone" maxlength="11" oninput="this.value=this.value.replace(/[^\d]/g,'')" ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button v-if="dialogTitle == '添加人员信息'" type="primary" :loading="loadingFlag" @click="successConfirm('add')">确 定</el-button>
          <el-button v-if="dialogTitle == '修改人员信息'" type="primary" :loading="loadingFlag" @click="successConfirm('edit')">确 定</el-button>
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
    </el-row>
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
          company_id: '',
          company_name: '',
          department_id: '',
          department_name: '',
          role: '',
          role_name: '',
          telephone: ''
        },
        confirmCreateVisiable: false,
        loadingFlag: false,
        departmentListOptions: [],
        selectedItem: '',
        confirmDeleteVisiable: false,
        dialogBody: '',
        departmentListMap: [],
        roleListOptions: [],
        roleListMap: [],
        searchContent: '',
        searchContentAdmin: '',
        memberListAdmin: [],
        memberListTotalAdmin: 0,
        companyListMap: [],
        companyListOptions: [],
        companyId: '',
        companyOptions: [],
        companyMap: []
      }
    },
    created(){
      if(this.userInfo.role == 1){
        this.queryMemberListAdmin(1, 10);
        this.queryCompanyList();
      }else{
        this.queryMemberList(1, 10);
      }

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
        "deleteUser",
        "getAllDepartmentList",
        "getRole",
        "getAllMemberList",
        "getAllCompanyList"
      ]),
      queryCompanyList(){
        this.getAllCompanyList().then(res => {
          if(res.errno == 0){
            this.companyOptions = res.data;
            this.companyId = this.companyOptions[0].company_id;
            for(let i=0;i<this.companyOptions.length;i++){
              this.companyMap[this.companyOptions[i].company_id] = this.companyOptions[i].company_name;
            }
            this.queryMemberListAdmin(1,10);
          }else{
            this.$message.error(res.errmsg || '服务器出了小差');
          }
        })
      },
      handleCurrentChange(currentPage){
        this.queryMemberList(currentPage,10)
      },
      handleCurrentChangeAdmin(currentPage){
        this.queryMemberListAdmin(currentPage,10)
      },
      changeDepartment(){
        this.queryRole();
      },
      changeCompany(){
        this.queryMemberListAdmin(1,10);
      },
      queryMemberList(pageNum, pageSize){
        this.getDepartmentMemberList({pageNum, pageSize,searchContent: this.searchContent}).then( res => {
          if(res.errno == 0){
            this.memberList = res.data.data;
            this.memberListTotal = res.data.count;
          }else{
            this.$message.error(res.errmsg || '服务器出了小差');
          }
        })
      },
      queryMemberListAdmin(pageNum, pageSize){
        this.getAllMemberList({pageNum, pageSize, company_id: this.companyId}).then( res => {
          if(res.errno == 0){
            this.memberListAdmin = res.data.data;
            this.memberListTotalAdmin = res.data.count;
          }else{
            this.$message.error(res.errmsg || '服务器出了小差');
          }
        })
      },
      queryDepartment(){
        if(this.companyId){
          this.getAllDepartmentList({company_id: this.companyId}).then( res => {
            if(res.errno == 0){
              if(res.data.length>0){
                this.departmentListOptions = res.data.map(item => {
                  this.departmentListMap[item.department_id] = item.department_name;
                  return {
                    department_id: item.department_id,
                    department_name: item.department_name
                  }
                })
              }else{
                this.departmentListOptions = [];
              }
            }else{
              this.$message.error(res.errmsg || '服务器出了小差');
            }
          })
        }else{
          this.getAllDepartmentList().then( res => {
            if(res.errno == 0){
              if(res.data.length>0){
                this.departmentListOptions = res.data.map(item => {
                  this.departmentListMap[item.department_id] = item.department_name;
                  return {
                    department_id: item.department_id,
                    department_name: item.department_name
                  }
                })
              }
            }else{
              this.$message.error(res.errmsg || '服务器出了小差');
            }
          })
        }
      },
      queryCompany(){
        this.getAllCompanyList().then( res => {
          if(res.errno == 0){
            if(res.data.length>0){
              this.companyListOptions = res.data.map(item => {
                this.companyListMap[item.company_id] = item.company_name;
                return {
                  company_id: item.company_id,
                  company_name: item.company_name
                }
              })
            }
          }else{
            this.$message.error(res.errmsg || '服务器出了小差');
          }
        })
      },
      queryRole(){
        if(this.formUser.department_id){
          this.getRole({company_id: this.companyId, department_id: this.formUser.department_id}).then( res => {
            if(res.errno == 0){
              if(res.data.length>0){
                this.roleListOptions = res.data.map(item => {
                  this.roleListMap[item.role] = item.role_name;
                  return {
                    role: item.role,
                    role_name: item.role_name
                  }
                })
                this.formUser.role = this.roleListOptions[0].role;
              }else{
                this.roleListOptions = [];
              }
            }else{
              this.$message.error(res.errmsg || '服务器出了小差');
            }
          })
        }
      },
      addMember(type,item){
        this.confirmCreateVisiable = true;
        if(type == 'add'){
          this.dialogTitle = '添加人员信息';
        }else if(type == 'edit'){
          this.dialogTitle = '修改人员信息';
          this.formUser = item;
        }
        if(this.userInfo.role == 2){
          this.queryDepartment();
          this.queryRole();
        }
      },
      addMemberAdmin(type,item){
        this.confirmCreateVisiable = true;
        if(type == 'add'){
          this.dialogTitle = '添加人员信息';
        }else if(type == 'edit'){
          this.dialogTitle = '修改人员信息';
          this.formUser = item;
        }
        if(this.userInfo.role == 1){
          this.queryDepartment();
          this.queryRole();
        }
        if(this.userInfo.role == 2){
          this.queryDepartment();
          this.queryRole();
        }
      },
      handleClose(){
        this.confirmCreateVisiable = false;
        this.loadingFlag = false;
        this.confirmDeleteVisiable = false;
        this.formUser = {};
      },
      successConfirm(type){
        if(!this.formUser.username){ this.$message.warning('请输入姓名');}
        else if(!this.formUser.usernum){ this.$message.warning('请输入工号');}
        else if(this.userInfo.role == 2 && !this.formUser.department_id){ this.$message.warning('请选择部门名称');}
        else if(this.userInfo.role == 2 && !this.formUser.role){ this.$message.warning('请选择角色');}
        else if(!this.formUser.email){ this.$message.warning('请输入邮箱');}
        else if(this.formUser.email && !(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(this.formUser.email))){ this.$message.warning('请输入正确邮箱');}
        else if(!this.formUser.telephone){ this.$message.warning('请输入手机号');}
        else if(this.formUser.telephone && !(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.formUser.telephone))){ this.$message.warning('请输入正确手机号');}
        else{
          this.formUser.department_name = this.departmentListMap[this.formUser.department_id];
          this.formUser.role_name = this.roleListMap[this.formUser.role];
          this.formUser.type = type;
          this.loadingFlag = true;
          this.addUser(this.formUser).then(res => {
            if(res.errno == 0){
              this.$message.success(res.data || '添加人员成功');
              this.queryMemberList(1, 10);
              this.confirmCreateVisiable = false;
              this.formUser = {};
            }else{
              this.$message.error(res.errmsg || '服务器出了小差');
            }
            this.loadingFlag = false;
          })
        }
      },
      deleteMember(item){
        this.selectedItem = item;
        this.confirmDeleteVisiable = true;
        this.dialogTitle = '确认移除'
        this.dialogBody = '确认移除，' + this.selectedItem.username + '(' + this.selectedItem.usernum + ')吗？'
      },
      deleteMemberAdmin(item){
        this.selectedItem = item;
        this.confirmDeleteVisiable = true;
        this.dialogTitle = '确认移除'
        this.dialogBody = '确认移除，' + this.selectedItem.username + '(' + this.selectedItem.usernum + ')吗？'
      },
      confirmDelete(){
        this.loadingFlag = true;
        this.deleteUser({usernum: this.selectedItem.usernum, department_id: this.selectedItem.department_id}).then( res => {
          if(res.errno == 0){
            this.$message.success('删除成功');
            this.confirmDeleteVisiable = false;
            this.queryMemberList(1, 10);
          }else{
            this.$message.error(res.errmsg || '服务器出了小差');
          }
          this.loadingFlag = false;
        })
      },
      search(){
        this.queryMemberList(1, 10);
      },
      searchAdmin(){
        this.queryMemberListAdmin(1, 10);
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
      & .search-style{
          margin-bottom: 10px;
        }
  }

</style>
