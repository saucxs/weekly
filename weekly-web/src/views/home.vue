<template>
  <div id="app">
    <header-bar></header-bar>
    <div class="container">
      <menu-bar ref="lefeMenu" class="sidebar-container"></menu-bar>
      <div class="right-box">
        <div class="content">
          <router-view></router-view>
        </div>
        <footer-bar></footer-bar>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import headerBar from '../components/header'
  import menuBar from "../components/menu";
  import footerBar from "../components/footer";
  export default {
    data() {
      return {

      }
    },
    components: {
      headerBar,
      menuBar,
      footerBar
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
  /*a:focus,a:active{*/
    /*color: #000;*/
  /*}*/

  .container {
    height: calc(100% - 46px);
    width: 1366px;
    margin: auto;
    display: flex;
  & .sidebar-container{
      transition: width 0.28s ease-out;
      width: 180px;
      overflow: auto;
      border-right: 1px solid #e6e6e6;
    }
    & .right-box{
        height: 100%;
        width: calc(100% - 180px);
        margin-left: 10px;
        overflow: auto;
      & .content{
          min-height: calc(100% - 122px);
          padding: 20px 40px;
          background-color: #fff;
          & .title {
              position: relative;
              margin-left: 12px;
              margin-bottom: 14px;
              font-size: 18px;
              color: #333333;
              text-align: left;
              line-height: 24px;
          &::before {
             position: absolute;
             left: -12px;
             content: "";
             width: 4px;
             height: 20px;
             margin-top: 2px;
             background-color: #3a79ff;
           }
          }
        }
      }
  }
</style>
