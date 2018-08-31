<template>
  <div class="write-weekly">
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
        currentWeek: ''
      }
    },
    created(){
      this.currentWeek = this.weekDay[this.day];
      var currentYear = new Date().getFullYear();
      var currentMonth = new Date().getMonth();
      var currentDate = new Date().getDate();
      //计算一周时间
      var startWeekDate = currentDate - this.day  + 1;
      var endWeekDate =  currentDate + 7 - this.day;
      var startWeek = currentYear + '/' +  currentMonth + '/' +  startWeekDate + '00:00:00';
      var endWeek = currentYear + '/' +  currentMonth + '/' +  endWeekDate + '23:59:59';
      var startWeekStamp = new Date(startWeek);

      this.getCurrentWeekly().then(res => {
        if(res.errno == 0){
          this.weeklyContent = res.data.content;
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
      submitWeekly(){
        var params = {
          content: this.weeklyContent,
          date: this.currentDate
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
