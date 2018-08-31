<template>
  <div class="menu">
     <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      router = router
      active-text-color="#ffd04b">
      <el-menu-item index="/writeWeekly">
        <i class="el-icon-menu"></i>
        <span slot="title">写周报</span>
      </el-menu-item>
       <el-menu-item index="/weeklyList">
         <i class="el-icon-location"></i>
         <span slot="title">历史周报</span>
       </el-menu-item>
      <!--<el-submenu index="/aManage">-->
        <!--<template slot="title">-->
          <!--<i class="el-icon-location"></i>-->
          <!--<span slot="title">模块管理一</span>-->
        <!--</template>-->
        <!--<el-menu-item index="/aManage">-->
          <!--<template slot="title">XXX管理</template>-->
        <!--</el-menu-item>-->
      <!--</el-submenu>-->
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "asideItem",
    data(){
      return{
        router: true
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>

<style lang="postcss" scoped>
  .menu {
    transition: width 0.28s ease-out;
    width: 180px;
    background: #545c64;
    & .el-menu{
      width: 100%;
      border-right: none;
      overflow: auto;
    }
  }
</style>
