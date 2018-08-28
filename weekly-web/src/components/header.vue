<template>
  <header class="header">
    <div class="header-box">
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <div class="header-logo">
            XXX后台管理
          </div>
        </el-col>
        <el-col :span="11">
          <el-row type="flex" justify="end">
            <el-dropdown>
              <div class="header-user-name">saucxs<i class="el-icon-caret-bottom el-icon--right"></i></div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <a href="/logout.htm">退出</a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </header>
</template>

<script>
   export default {
    name: 'Header',
    data() {
      return {
       
      }
    },
    computed: {

    }
  }

</script>

<style lang="postcss" scoped>
.header {
  color: #fff;
  font-size: 14px;
  background: #3a79ff;
  height: 46px;
  line-height: 46px;
  font-weight: 700;
  box-shadow: 0 2px 10px 0 rgb(0, 0, 0, 0.4);
  & .header-box{
    width: 1360px;
    margin: 0 auto;
    background: #3a79ff;
  }
  & .header-user-name {
    cursor: pointer;
    color: #fff;
  }
}
</style>
