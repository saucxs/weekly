<template>
  <div class="member-list">
    <el-row v-if="userInfo.role == 2">
      <div class="title">部门管理</div>
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
            <el-button type="primary" @click="addDepartmentDialog()">添加部门</el-button>
          </div>
        </el-col>
      </el-row>
      <div class="member-box">
        <el-table
          :data="departmentList"
          border
          style="width: 100%">
          <el-table-column
            prop="company_id"
            label="公司ID"
            width="160">
          </el-table-column>
          <el-table-column
            prop="company_name"
            label="公司名"
            width="200">
          </el-table-column>
          <el-table-column
            prop="department_id"
            label="部门ID"
            width="200">
          </el-table-column>
          <el-table-column
            prop="department_name"
            label="部门名称">
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="editDepartmentDialog(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="deleteDepartmentDialog(scope.row)" type="text" size="small">移除</el-button>
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
          <el-form label-position="right" label-width="80px" :model="formUser">
            <el-form-item label="部门ID">
              <el-input v-if="dialogTitle == '添加部门'" v-model="formUser.department_id" maxlength="20"></el-input>
              <el-input v-if="dialogTitle == '修改部门'" :disabled="true" v-model="formUser.department_id" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="部门名称">
              <el-input v-model="formUser.department_name" maxlength="20"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button v-if="dialogTitle == '添加部门'" type="primary" :loading="loadingFlag" @click="successConfirm('add')">确 定</el-button>
          <el-button v-if="dialogTitle == '修改部门'" type="primary" :loading="loadingFlag" @click="successConfirm('edit')">确 定</el-button>
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
    </el-row>
    <el-row v-if="userInfo.role == 1">
      <div class="title">公司-部门管理</div>
      <el-row>
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
            <el-button type="primary" @click="addDepartmentDialog()">添加部门</el-button>
          </div>
        </el-col>
      </el-row>
      <div class="member-box">
        <el-table
          :data="departmentList"
          border
          style="width: 100%">
          <el-table-column
            prop="company_id"
            label="公司ID"
            width="160">
          </el-table-column>
          <el-table-column
            prop="company_name"
            label="公司名"
            width="200">
          </el-table-column>
          <el-table-column
            prop="department_id"
            label="部门ID"
            width="200">
          </el-table-column>
          <el-table-column
            prop="department_name"
            label="部门名称">
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="editDepartmentDialog(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="deleteDepartmentDialog(scope.row)" type="text" size="small">移除</el-button>
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
          <el-form label-position="right" label-width="80px" :model="formUser">
            <el-form-item label="部门ID">
              <el-input v-model="formUser.department_id" maxlength="20" v-if="dialogTitle == '添加部门'"></el-input>
              <el-input v-model="formUser.department_id" maxlength="20" v-if="dialogTitle == '修改部门'" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="部门名称">
              <el-input v-model="formUser.department_name" maxlength="20"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button v-if="dialogTitle == '添加部门'" type="primary" :loading="loadingFlag" @click="successConfirm('add')">确 定</el-button>
          <el-button v-if="dialogTitle == '修改部门'" type="primary" :loading="loadingFlag" @click="successConfirm('edit')">确 定</el-button>
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
    </el-row>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    data(){
      return {
        departmentList: [],
        currentPage: 1,
        departmentListTotal: 0,
        dialogTitle: '',
        formUser: {
          department_id: '',
          department_name: '',
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
        companyId: '',
        companyOptions: [],
        companyMap: []
      }
    },
    created(){
      if(this.userInfo.role == 1){
        this.queryCompanyList()
      }else if(this.userInfo.role == 2){
        this.queryDepartmentList();
      }

    },
    computed: {
      ...mapGetters([
        "userInfo",
      ])
    },
    methods: {
      ...mapActions([
        "addDepartment",
        "deleteDepartment",
        "getAllDepartmentList",
        "getRole",
        "getAllCompanyList"
      ]),
      changeCompany(){
        this.queryDepartmentList();
      },
      queryCompanyList(){
        this.getAllCompanyList().then(res => {
          if(res.errno == 0){
            this.companyOptions = res.data;
            this.companyId = this.companyOptions[0].company_id;
            for(let i=0;i<this.companyOptions.length;i++){
              this.companyMap[this.companyOptions[i].company_id] = this.companyOptions[i].company_name;
            }
            this.queryDepartmentList();
          }else{
            this.$message.error(res.errmsg || '服务器出了小差');
          }
        })
      },
      search(){
        this.queryDepartmentList();
      },
      queryDepartmentList(){
        if(this.userInfo.role == 1){
          this.getAllDepartmentList({company_id: this.companyId}).then( res => {
            if(res.errno == 0){
              this.departmentList = res.data;
            }else{
              this.$message.error(res.errmsg || '服务器出了小差');
            }
          })
        }else if(this.userInfo.role == 2){
          this.getAllDepartmentList({searchContent: this.searchContent}).then( res => {
            if(res.errno == 0){
              this.departmentList = res.data;
            }else{
              this.$message.error(res.errmsg || '服务器出了小差');
            }
          })
        }
      },
      addDepartmentDialog(){
        this.confirmCreateVisiable = true;
        this.dialogTitle = '添加部门';
      },
      editDepartmentDialog(item){
        this.confirmCreateVisiable = true;
        this.dialogTitle = '修改部门';
        this.formUser = item;
      },
      handleClose(){
        this.confirmCreateVisiable = false;
        this.loadingFlag = false;
        this.confirmDeleteVisiable = false;
        this.formUser = {};
        this.queryDepartmentList();
      },
      successConfirm(type){
        if(!this.formUser.department_id){ this.$message.warning('请输入部门id');}
        else if(!this.formUser.department_name){ this.$message.warning('请输入部门名称');}
        else{
          this.formUser.type = type;
          this.loadingFlag = true;
          this.formUser.company_id = this.companyId;
          this.formUser.company_name = this.companyMap[this.companyId];
          this.addDepartment(this.formUser).then(res => {
            if(res.errno == 0){
              this.$message.success(res.data || '添加成功');
              this.queryDepartmentList();
              this.confirmCreateVisiable = false;
              this.formUser = {};
            }else{
              this.$message.error(res.errmsg || '服务器出了小差');
            }
            this.loadingFlag = false;
          })
        }
      },
      deleteDepartmentDialog(item){
        this.selectedItem = item;
        this.confirmDeleteVisiable = true;
        this.dialogTitle = '确认移除'
        this.dialogBody = '确认移除，' + this.selectedItem.department_name + '(' + this.selectedItem.department_id + ')吗？'
      },
      confirmDelete(){
        this.loadingFlag = true;
        if(this.userInfo.role == 1){
          this.deleteDepartment({company_id: this.companyId, department_id: this.selectedItem.department_id}).then( res => {
            if(res.errno == 0){
              this.$message.success('删除成功');
              this.confirmDeleteVisiable = false;
              this.queryDepartmentList();
            }else{
              this.$message.error(res.errmsg || '服务器出了小差');
            }
            this.loadingFlag = false;
          })
        }else if(this.userInfo.role == 2){
          this.deleteDepartment({department_id: this.selectedItem.department_id}).then( res => {
            if(res.errno == 0){
              this.$message.success('删除成功');
              this.confirmDeleteVisiable = false;
              this.queryDepartmentList();
            }else{
              this.$message.error(res.errmsg || '服务器出了小差');
            }
            this.loadingFlag = false;
          })
        }
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
