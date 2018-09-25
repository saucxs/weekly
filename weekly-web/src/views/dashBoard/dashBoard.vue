<template>
    <div class="dash-board" v-if="userInfo.role == 2 || userInfo.role == 3">
      <div class="title">首页</div>
      <el-row :gutter="40" class="panel-group">
        <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
            <div class="card-panel-icon-wrapper icon-people">
              <i class="el-icon-edit"></i>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">部门人数</div>
              <count-to :start-val="0" :end-val="departmentMember.length" :duration="1000" class="card-panel-num"/>
            </div>
          </div>
        </el-col>
        <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('messages')">
            <div class="card-panel-icon-wrapper icon-message">
              <i class="el-icon-edit"></i>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">未写周报</div>
              <count-to :start-val="0" :end-val="departmentMember.length-weeklyListTotal" :duration="1000" class="card-panel-num"/>
            </div>
          </div>
        </el-col>
        <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('purchases')">
            <div class="card-panel-icon-wrapper icon-money">
              <i class="el-icon-edit"></i>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">已写周报</div>
              <count-to :start-val="0" :end-val="weeklyListTotal" :duration="1000" class="card-panel-num"/>
            </div>
          </div>
        </el-col>
        <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('shoppings')">
            <div class="card-panel-icon-wrapper icon-shopping">
              <i class="el-icon-edit"></i>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">历史周报</div>
              <count-to :start-val="0" :end-val="myHistoryTotal" :duration="1000" class="card-panel-num"/>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import CountTo from 'vue-count-to'
  export default {
    components: {
      CountTo
    },
    data(){
      return {
        departmentMember: [],
        weeklyTableData: [],
        weeklyListTotal: 0,
        myHistoryData: [],
        myHistoryTotal: 0
      }
    },
    created(){
      /*获取部门人员列表*/
      this.departmentMemberList();
      /*获取已写周报列表*/
      this.departmrntWeeklyList();
      /*历史周报*/
      this.weeklyList()
    },
    computed: {
      ...mapGetters([
        "userInfo",
      ])
    },
    methods: {
      ...mapActions([
        "getDepartmentWeeklyList",
        "getDepartmentMemberList",
        "getWeeklyList",
      ]),
      handleSetLineChartData(type) {
        this.$emit('handleSetLineChartData', type)
      },
      departmentMemberList(){
        this.getDepartmentMemberList().then(res => {
          if(res.errno == 0){
            this.departmentMember = res.data.data.map( item => {
              return {
                username: item.username,
                usernum: item.usernum
              }
            });
          }else{
            this.$message.error(res.errmsg|| '服务器开小差');
          }
        })
      },
      departmrntWeeklyList(){
        this.queryDepartmentWeeklyList(1,10)
      },
      queryDepartmentWeeklyList(currentPage, pageSize){
        /*获取已写周报列表*/
        this.getDepartmentWeeklyList({currentPage, pageSize}).then(res => {
          if(res.errno == 0){
            this.weeklyTableData = res.data.data;
            this.weeklyListTotal = res.data.count;
          }else{
            this.$message.error('服务器出了小差');
          }
        })
      },

//      history
      weeklyList(){
        this.queryWeeklyList(1,10)
      },
      queryWeeklyList(currentPage, pageSize){
        this.getWeeklyList({pageNum: currentPage, pageSize: pageSize}).then(res => {
          if(res.errno == 0){
            this.myHistoryData = res.data.data;
            this.myHistoryTotal = res.data.count;
          }else{
            this.$message.warning('服务器出了小差');
          }
        })
      },

    }
  }
</script>

<style lang="postcss" scoped>
.dash-board{
    & i{
        font-size: 46px;
      }
    margin-top: 18px;
    & .card-panel-col{
      margin-bottom: 32px;
      }
    & .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #eee;
      border-radius: 4px;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
      &:hover {
        & .card-panel-icon-wrapper {
          color: #fff;
        }
        & .icon-people {
          background: #40c9c6;
        }
        & .icon-message {
          background: #36a3f7;
        }
        & .icon-money {
          background: #f4516c;
        }
        & .icon-shopping {
          background: #34bfa3
        }
      }
      & .icon-people {
        color: #40c9c6;
      }
      & .icon-message {
        color: #36a3f7;
      }
      & .icon-money {
        color: #f4516c;
      }
      & .icon-shopping {
        color: #34bfa3
      }
      & .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      & .card-panel-icon {
        float: left;
        font-size: 48px;
      }
      & .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        & .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }
        & .card-panel-num {
          font-size: 20px;
        }
      }
    }
}
</style>
