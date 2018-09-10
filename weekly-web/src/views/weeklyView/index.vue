<template>
  <div class="write-weekly">
    <div class="title">部门周报概览</div>
    <p>今天：<span>{{currentDate}}</span>，<span>{{currentWeek}}</span></p>
    <p>部门：<span>{{userInfo.department_name}}</span></p>
    <p>
      <label>未填写周报的：</label>
      <span>分别为：{{}}</span>
    </p>
    <el-table
      :data="weeklyTableData"
      border
      style="width: 100%">
      <el-table-column
        label="周报日期"
        width="200">
        <template slot-scope="scope">
          <span>{{scope.row.startDate | dateFormat}}</span>--<span>{{scope.row.endDate | dateFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="周报内容"
      >
      </el-table-column>
      <el-table-column
        label="最新一次提交日期"
        width="200">
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
        weeklyTableData: []
      }
    },
    created(){
      this.currentWeek = this.weekDay[this.day];

      let currentYear = new Date().getFullYear();
      let currentMonth = new Date().getMonth();
      let currentDay = new Date().getDate();
      let currentTimeStamp = new Date(currentYear, currentMonth, currentDay,0,0,0).getTime();
      //计算一周时间
      let currentDayNum = new Date().getDay();
      let startWeekNum = currentDayNum - 1;
      let endWeekNum =  7 - currentDayNum + 1;
      let startWeekStamp = currentTimeStamp - 1000*3600*24*startWeekNum;
      let endWeekStamp = currentTimeStamp + 1000*(3600*24*endWeekNum - 1);
      let startWeekDate = this.formatDateTime(startWeekStamp);
      let endWeekDate = this.formatDateTime(endWeekStamp);

      this.getCurrentWeekly().then(res => {
        if(res.errno == 0){
          this.weeklyContent = res.data.content;
          this.weeklyId = res.data.id;
        }
      })

      this.getDepartmentWeeklyList().then(res => {
        if(res.errno == 0){
          this.weeklyTableData = res.data;
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
        "getDepartmentWeeklyList"
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
.write-weekly{

}
</style>
