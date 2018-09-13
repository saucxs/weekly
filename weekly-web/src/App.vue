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
  body {
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
  }
  .el-dialog .el-dialog__body{
    padding-bottom: 0px !important;
  }
  /*menu*/
  .el-menu-item {
    margin-bottom: 8px;
    margin-top: 4px;
    height: 42px;
    line-height: 42px;
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
    top: 0px;
    bottom: 0px;
    left: 0;
    display: block;
    width: 4px;
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
