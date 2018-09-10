<template>
  <div class="menu" id="menu">
     <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :router = "false"
      :default-active="$route.path"
      active-text-color="#ffd04b">
       <template v-for="item in menuList[1].children">
         <el-submenu v-if="item.isNest" :key="item.meta.zhName" :index="item.meta.zhName">
           <router-link :to="item.path">
             <i :class="item.icon"></i>{{item.meta.zhName}}
           </router-link>
           <template v-for="child in item.children">
           <el-menu-item v-if="false" :key="child.meta.path" :index="child.meta.path" >
             <router-link :to="child.meta.path">
               <i :class="child.icon"></i>
                 <span slot="title">{{child.meta.zhName}}</span>
             </router-link>
           </el-menu-item>
           </template>
         </el-submenu>
         <el-menu-item v-if="!item.isNest" :key="item.meta.path" :index="item.meta.path">
           <router-link :to="item.path">
             <i :class="item.icon"></i>{{item.meta.zhName}}
           </router-link>
         </el-menu-item>
       </template>
    </el-menu>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: "asideItem",
    data(){
      return{
        router: true
      }
    },
    computed: {
      ...mapGetters([
        "userInfo",
      ]),
      menuList(){
        return this.$router.options.routes.filter(
          item => item.meta
        );
      }
    },
    methods: {
      allowUse(id) {
        return this.userInfo.menuId.split(',').indexOf(id) > -1;
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
