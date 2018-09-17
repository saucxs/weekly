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
          label="最近一次提交日期"
          width="200">
          <template slot-scope="scope">
            {{scope.row.time | dateTimeFormat}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button v-if="new Date().getTime()>= scope.row.startDate && new Date().getTime()<=scope.row.endDate" @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
            <span v-else>--</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-box" v-if="weeklyTableData.length>0">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          layout="total, prev, pager, next"
          :total="weeklyListTotal">
        </el-pagination>
      </div>
      <!--dialog-->
      <el-dialog
        :title="dialogTitle"
        :visible.sync="confirmSubmitVisiable"
        :before-close="handleClose"
        width="600px"
        center>
        <p>周报日期：<span>{{editWeeklyDate}}</span></p>
        <el-input
          type="textarea"
          maxlength="500"
          :autosize="{ minRows: 4, maxRows: 6}"
          placeholder="请输入内容"
          v-model="editWeeklyContent">
        </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button type="primary" :loading="loadingFlag" @click="successConfirm()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    data(){
      return {
        weeklyTableData: [],
        dialogTitle: '',
        confirmSubmitVisiable: false,
        confirmTipMessage: '',
        editWeeklyContentRow: '',
        editWeeklyContent: '',
        editWeeklyDate: '',
        currentDate: new Date().toLocaleDateString(),
        loadingFlag: false,
        weeklyListTotal: 0,
        currentPage: 1
      }
    },
    created(){
     this.weeklyList();
    },
    computed: {
      ...mapGetters([])
    },
    methods: {
      ...mapActions([
        "getWeeklyList",
        "addWeekly"
      ]),
      dateFormatSpe(item){
        if(!item) return '--';
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
        return y + '.' + m + '.' + d;
      },
      handleCurrentChange(currentPage) {
        this.queryWeeklyList(currentPage,10)
      },
      weeklyList(){
        this.queryWeeklyList(1,10)
      },
      queryWeeklyList(currentPage, pageSize){
        this.getWeeklyList({pageNum: currentPage, pageSize: pageSize}).then(res => {
          if(res.errno == 0){
            this.weeklyTableData = res.data.data;
            this.weeklyListTotal = res.data.count;
          }else{
            this.$message.warning('服务器出了小差');
          }
        })
      },
      editClick(row){
        this.editWeeklyContentRow = row;
        this.confirmSubmitVisiable = true;
        this.dialogTitle = '修改周报'
        this.editWeeklyContent = this.editWeeklyContentRow.content;
        this.editWeeklyDate = this.dateFormatSpe(this.editWeeklyContentRow.startDate) + '--' + this.dateFormatSpe(this.editWeeklyContentRow.endDate);
      },
      successConfirm(){
        var params = {
          content: this.editWeeklyContent,
          date: this.currentDate,
          id:  this.editWeeklyContentRow.id
        }
        if(this.editWeeklyContent){
          this.loadingFlag = true;
          this.addWeekly(params).then(res => {
            if(res.errno == 0){
              this.$message.success(res.errmsg|| '提交成功');
              this.confirmSubmitVisiable = false;
              this.editWeeklyContentRow = '';
              this.weeklyList();
            }else{
              this.$message.error(res.errmsg|| '服务器开小差');
            }
            this.loadingFlag = false;
          })
        }else{
          this.$message.warning( '输入周报才能提交');
        }
      },
      handleClose(){
        this.confirmSubmitVisiable = false;
        this.editWeeklyContentRow = '';
      }
    }
  }
</script>

<style lang="postcss" scoped>
.weekly-list{
  & .pagination-box{
      text-align: right;
      margin: 10px 0px;
    }
}
</style>
