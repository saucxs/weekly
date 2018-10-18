<template>
    <div class="dash-board">
      <el-row v-if="userInfo.role == 2 || userInfo.role == 3">
        <div class="title">首页</div>
        <el-row :gutter="40" class="panel-group">
          <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
            <div class="card-panel" @click="handleSetData('depNum')">
              <div class="card-panel-icon-wrapper icon-people">
                <i class="el-icon-edit"></i>
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">部门人数</div>
                <count-to :start-val="0" :end-val="departmentNumber" :duration="1000" class="card-panel-num"/>
              </div>
            </div>
          </el-col>
          <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
            <div class="card-panel" @click="handleSetData('unWeekly')">
              <div class="card-panel-icon-wrapper icon-message">
                <i class="el-icon-edit"></i>
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">未写周报</div>
                <count-to :start-val="0" :end-val="unWeeklyNumber" :duration="1000" class="card-panel-num"/>
              </div>
            </div>
          </el-col>
          <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
            <div class="card-panel" @click="handleSetData('weekly')">
              <div class="card-panel-icon-wrapper icon-money">
                <i class="el-icon-edit"></i>
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">已写周报</div>
                <count-to :start-val="0" :end-val="alreadyWeeklyNumber" :duration="1000" class="card-panel-num"/>
              </div>
            </div>
          </el-col>
          <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
            <div class="card-panel" @click="handleSetData('hisWeekly')">
              <div class="card-panel-icon-wrapper icon-shopping">
                <i class="el-icon-edit"></i>
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">历史周报</div>
                <count-to :start-val="0" :end-val="myWeeklyNumber" :duration="1000" class="card-panel-num"/>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-row>
      <el-row v-if="userInfo.role == 1">
        <div class="title">首页-公司列表</div>
        <el-row :gutter="40" class="panel-group">
          <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
            <div class="card-panel" @click="handleSetDataAdmin('companyNum')">
              <div class="card-panel-icon-wrapper icon-people">
                <i class="el-icon-edit"></i>
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">公司个数</div>
                <count-to :start-val="0" :end-val="companyNumber" :duration="1000" class="card-panel-num"/>
              </div>
            </div>
          </el-col>
          <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
            <div class="card-panel" @click="handleSetDataAdmin('totalNum')">
              <div class="card-panel-icon-wrapper icon-message">
                <i class="el-icon-edit"></i>
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">总人数</div>
                <count-to :start-val="0" :end-val="totalUserNumber" :duration="1000" class="card-panel-num"/>
              </div>
            </div>
          </el-col>
          <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
            <div class="card-panel" @click="handleSetDataAdmin('totalWeekly')">
              <div class="card-panel-icon-wrapper icon-money">
                <i class="el-icon-edit"></i>
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">总周报</div>
                <count-to :start-val="0" :end-val="totalWeeklyNumber" :duration="1000" class="card-panel-num"/>
              </div>
            </div>
          </el-col>
          <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
            <div class="card-panel" @click="handleSetDataAdmin('hisWeekly')">
              <div class="card-panel-icon-wrapper icon-shopping">
                <i class="el-icon-edit"></i>
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">历史周报</div>
                <count-to :start-val="0" :end-val="myWeeklyNumber" :duration="1000" class="card-panel-num"/>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-row>
    </div>
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
        departmentNumber: 0,
        alreadyWeeklyNumber: 0,
        unWeeklyNumber: 0,
        myWeeklyNumber: 0,
        companyNumber: 0,
        totalUserNumber: 0,
        totalWeeklyNumber: 0
      }
    },
    created(){
      this.getBoard().then(res => {
        if(res.errno == 0){
          if(this.userInfo.role == 2 || this.userInfo.role == 3){
            this.departmentNumber = res.data.departmentNumber;
            this.alreadyWeeklyNumber = res.data.alreadyWeeklyNumber;
            this.unWeeklyNumber = res.data.unWeeklyNumber;
            this.myWeeklyNumber = res.data.myWeeklyNumber;
          }else if(this.userInfo.role == 1){
            this.companyNumber = res.data.companyNumber;
            this.totalUserNumber = res.data.totalUserNumber - 1;
            this.totalWeeklyNumber = res.data.totalWeeklyNumber;
            this.myWeeklyNumber = res.data.myWeeklyNumber;
          }
        }else{
          this.$message.error(res.errmsg|| '服务器开小差');
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
        "getBoard",
      ]),
      handleSetData(type){
        if(type == 'depNum'){
          this.$router.push({
            path: `/weekly/memberList`,
          })
        }else if(type == 'unWeekly'){
          this.$router.push({
            path: `/weekly/weeklyView`,
          })
        }else if(type == 'weekly'){
          this.$router.push({
            path: `/weekly/weeklyView`,
          })
        }else if(type == 'hisWeekly'){
          this.$router.push({
            path: `/weekly/weeklyList`,
          })
        }
      },
      handleSetDataAdmin(type){
        if(type == 'companyNum'){
          this.$router.push({
            path: `/weekly/adminCompany`,
          })
        }else if(type == 'totalNum'){
          this.$router.push({
            path: `/weekly/memberList`,
          })
        }else if(type == 'totalWeekly'){
          this.$router.push({
            path: `/weekly/weeklyView`,
          })
        }else if(type == 'hisWeekly'){
          this.$router.push({
            path: `/weekly/weeklyList`,
          })
        }
      }

    }
  }
</script>

<style lang="postcss" scoped>
.dash-board{
    & i{
        font-size: 46px;
      }
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
