<template>
  <div class="member-list" v-if="userInfo.role == 1">
    <div class="title">系统管理-登入和登出日志</div>
    <div class="search-group">
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-col :span="16">
          <el-input placeholder="请输入内容" maxlength="20" v-model="searchContent" clearable class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="search()">查询</el-button>
          </el-input>
        </el-col>
      </el-col>
    </div>
    <div class="member-box">
      <el-table
        :data="logList"
        border
        style="width: 100%">
        <el-table-column
          label="登入/登出"
          width="140">
          <template slot-scope="scope">
            {{scope.row.flag == '1'?'登入':'登出'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="usernum"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="login_time"
          label="登入时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="logout_time"
          label="登出时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="login_ip"
          label="登录IP">
        </el-table-column>
      </el-table>
      <div class="pagination-box" v-if="logList.length>0">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          layout="total, prev, pager, next"
          :total="logListTotal">
        </el-pagination>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    data(){
      return {
        searchContent: '',
        logList: [],
        logListTotal: 0,
        currentPage: 1,
      }
    },
    created(){
     this.queryLog();
    },
    computed: {
      ...mapGetters([
        "userInfo",
      ])
    },
    methods: {
      ...mapActions([
        "getLoginLog"
      ]),
      search(){
        this.queryLogList(1, 10);
      },
      queryLog(){
        this.queryLogList(1, 10)
      },
      queryLogList(currentPage, pageSize){
        this.getLoginLog({pageNum: currentPage, pageSize: pageSize, searchContent: this.searchContent}).then(res => {
          if(res.errno == 0){
            this.logList = res.data.data;
            this.logListTotal = res.data.count;
          }else{
            this.$message.warning('服务器出了小差');
          }
        })
      },
      handleCurrentChange(currentPage) {
        this.queryLogList(currentPage,10)
      },
    }
  }
</script>

<style lang="postcss" scoped>
  .member-list{
    & .pagination-box{
        text-align: right;
        margin: 10px 0px;
      }
    & .search-group{
        margin-bottom: 10px;
        height: 40px;
      }
  }

</style>
