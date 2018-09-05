<template>
    <div class="weekly-list">
      <div class="title">历史周报</div>
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
        weeklyTableData: []
      }
    },
    created(){
      this.getWeeklyList().then(res => {
        if(res.errno == 0){
          this.weeklyTableData = res.data;
//          if(this.weeklyTableData.length>0){
//            for(var i=0;i<this.weeklyTableData.length;i++){
//              this.weeklyTableData[i].startDate = formatDateTime(this.weeklyTableData[i].startDate);
//              this.weeklyTableData[i].endDate = formatDateTime(this.weeklyTableData[i].endDate);
//            }
//          }
        }
      })
    },
    computed: {
      ...mapGetters([])
    },
    methods: {
      ...mapActions([
        "getWeeklyList",
      ]),
      handleClick(row) {
        console.log(row);
      },
      editClick(row){
        console.log(row,'row');

      }
    }
  }
</script>

<style lang="postcss" scoped>
.weekly-list{

}
</style>
