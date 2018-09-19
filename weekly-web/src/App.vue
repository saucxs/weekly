<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: 'App',
    computed: {
      ...mapGetters(["userInfo"])
    },
    data(){
      return {

      }
    },
    mounted() {

    },
    methods:{
      ...mapActions([
        "getUserInfo",
      ]),
    }
  }
</script>

<style lang="postcss">
  html{
    height: 100%;
  }
  body {
    width: 100%;
    height: 100%;
    background-color: #eee !important;
    margin: 0;
    padding: 0;
    overflow-y: hidden;
  }
  #app {
    height: 100%;
  }
  a {
    text-decoration: none;
    color: #000;
  }
  .a-style{
      padding: 0px 30px;
    }
  .el-dialog .el-dialog__body{
    padding-bottom: 0px !important;
  }
  /*header*/
  .el-dropdown-menu__item{
      width: 120px !important;
    }
  /*menu*/
  .el-menu-item {
    padding-bottom: 8px;
    height: 50px;
    line-height: 50px;
  }
  .el-submenu .el-menu-item{
    min-width: 146px !important;
    padding-left: 50px !important;
  }

  .el-menu-item > a{
    display: block;
    color: #ccc;
  }
  .el-menu .is-active{
    outline: 0;
    background-color: rgb(67, 74, 80) !important;
  }
  .el-menu .is-active a{
    color: #fff !important;
  }
  .el-menu .is-active:before {
    position: absolute;
    bottom: 0px;
    left: 0;
    display: block;
    width: 4px;
    height: 50px;
    background-color: #3a79ff;
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    content: "";
  }
  .el-menu .is-active:after{
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    border-right: 3px solid #3a79ff;
    transform: scaleY(.0001);
    opacity: 0;
    transition: transform .15s cubic-bezier(.215,.61,.355,1),opacity .15s cubic-bezier(.215,.61,.355,1);
  }
  /*重写弹窗样式*/
  .el-dialog {
    & .el-dialog__header{
      padding: 9px 20px;
      border-bottom: 2px solid #3a79ff;
      text-align: left;
      line-height: 0;
    }
    & .el-dialog__body{
      padding: 20px;
    }
    & .el-dialog__footer{
      padding: 0 20px 20px;
      border-top: 0;
    }
    & .el-dialog__headerbtn{
      top: 14px;
    }
  }
  /*滚动条*/
  *::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  *::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #777;
  }
  /*输入框*/
  *::placeholder {
    font-size: 12px;
  }




</style>
