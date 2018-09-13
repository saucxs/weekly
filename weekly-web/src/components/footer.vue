<template>
    <footer class="footer">
      <div class="footer-link-wrap">
        <a href="http://www.mwcxs.top/" target="_blank">交流学习社区</a>
        <a href="http://www.cnblogs.com/chengxs" target="_blank" >safeguardEagle</a>
        <a href="https://www.chengxinsong.cn/" target="_blank" >程新松博客网站</a>
        <a href="https://github.com/saucxs" target="_blank">saucxs的github</a>
      </div>
      <div class="footer-link-wrap">Copyright© 2018，mwcxs.top版权所有
        <a href="http://www.miitbeian.gov.cn" target="_blank">辽ICP备16015497号-2</a>
      </div>
    </footer>
</template>

<script>
   export default {
    name: 'Footer',
    data() {
      return {

      }
    },
    computed: {

    }
  }

</script>

<style lang="postcss" scoped>
  .footer {
    padding: 20px 0px;
    & .footer-link-wrap {
        color: #999;
        font-size: 12px;
        text-align: center;
        /*line-height: 24px;*/
      & > a {
          color: #999;
        }
      &:last-child {
         margin-top: 10px;
       }
      &:not(:last-child) {
        & > a:not(:last-child) {
          &::after {
             content: "丨";
           }
        }
      }
    }
  }
</style>
