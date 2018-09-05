<template>
  <div class="write-weekly">
    <div class="title">写周报</div>
    <p>今天：<span>{{currentDate}}</span>，<span>{{currentWeek}}</span></p>
    <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="请输入内容"
      v-model="weeklyContent">
    </el-input>
    <p>
      <el-button type="primary" plain @click="submitWeekly">提交周报</el-button>
    </p>
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
        weeklyId: ''
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
    },
    computed: {
      ...mapGetters([

      ])
    },
    methods: {
      ...mapActions([
        "getCurrentWeekly",
        "addWeekly",
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
