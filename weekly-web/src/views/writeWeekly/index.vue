<template>
  <div class="write-weekly">
    <p>今天：{{currentDate}}</p>
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
        currentDate: new Date().toLocaleDateString()
      }
    },
    methods: {
      ...mapActions([
        "getUserInfo",
        "addWeekly"
      ]),
      submitWeekly(){
        var params = {
          content: this.weeklyContent,
          date: this.currentDate
        }
        this.addWeekly(params).then(res => {
         console.log(res,'res');
        })
      }
    }
  }
</script>

<style lang="postcss" scoped>
.write-weekly{

}
</style>
