<template>
  <div class="write-weekly">
    <div class="title">部门周报概览</div>
    <p>今天：<span>{{currentDate}}</span>，<span>{{currentWeek}}</span></p>
    <p>部门：<span>{{userInfo.department_name}}</span></p>
    <p>
      <label>部门人员：<span v-for="(item, index) in departmentMember">{{item.username}}({{item.usernum}})，</span></label>
    </p>
    <p>
      <label>未填写周报(<span class="data-style">{{unWeeklyData.length}}人</span>)：<span v-for="(item, index) in unWeeklyData">{{item.username}}({{item.usernum}})，</span></label>
    </p>
    <p><label>已填周报(<span class="data-style">{{weeklyTableData.length}}人</span>)如下所示：</label></p>
    <el-table
      :data="weeklyTableData"
      border
      style="width: 100%">
      <el-table-column
        label="周报日期"
        width="180">
        <template slot-scope="scope">
          <span>{{scope.row.startDate | dateFormat}}</span>--<span>{{scope.row.endDate | dateFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="80">
      </el-table-column>
      <el-table-column
        prop="usernum"
        label="工号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="content"
        label="周报内容">
      </el-table-column>
      <el-table-column
        label="最新一次提交日期"
        width="160">
        <template slot-scope="scope">
          {{scope.row.time | dateTimeFormat}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    data(){
      return {
        weeklyContent: '',
        currentDate: new Date().toLocaleDateString(),
        day: new Date().getDay(),
        weekDay:  ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        currentWeek: '',
        weeklyId: '',
        weeklyTableData: [],
        departmentMember: [],
        unWeeklyData: []
      }
    },
    created(){
      this.currentWeek = this.weekDay[this.day];
      this.getCurrentWeekly().then(res => {
        if(res.errno == 0){
          this.weeklyContent = res.data.content;
          this.weeklyId = res.data.id;
        }
      })
      /*获取已写周报列表*/
      this.getDepartmentWeeklyList().then(res => {
        if(res.errno == 0){
          this.weeklyTableData = res.data;
          var usernumList = this.weeklyTableData.map( item => {
            return {
              usernum: item.usernum
            }
          })
          /*获取未写周报列表*/
          var params = {
            usernumList: usernumList
          }
          console.log(params,'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqq')
          this.getUnWeeklyList(params).then(res => {
            if(res.errno == 0){
              this.unWeeklyData = res.data;
            }
          })
        }
      })
      /*获取已写周报人员列表*/
      this.getDepartmentMemberList().then(res => {
        if(res.errno == 0){
          this.departmentMember = res.data.map( item => {
            return {
              username: item.username,
              usernum: item.usernum
            }
          });
        }
      })
    },
    computed: {
      ...mapGetters([
        "userInfo",
      ])
    },
    methods: {
      ...mapActions([
        "getCurrentWeekly",
        "addWeekly",
        "getDepartmentWeeklyList",
        "getDepartmentMemberList",
        "getUnWeeklyList"
      ]),
      formatDateTime(item){
        var date = new Date(parseInt(item));
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h=h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        var second=date.getSeconds();
        second=second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
      },
      submitWeekly(){
        var params = {
          content: this.weeklyContent,
          date: this.currentDate,
          id:  this.weeklyId
        }
        this.addWeekly(params).then(res => {
          if(res.errno == 0){
            this.$message.success(res.errmsg|| '提交成功');
          }else{
            this.$message.error(res.errmsg|| '服务器开小差');
          }
        })
      }
    }
  }
</script>

<style lang="postcss" scoped>
.write-weekly  .data-style{
  color: #5579ee;
}
</style>
