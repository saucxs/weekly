<template>
    <div>
        <span>{{text}}</span>
        <p>测试测试</p>
         <p>{{text}}</p>
        <p>测试测试</p>
         <p>{{text}}</p>
        <p>测试测试</p>
         <p>{{text}}</p>
        <p>测试测试</p>
         <p>{{text}}</p>
        <p>测试测试end</p>
        <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
        <div v-if="maskModal" class="mask"></div>
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
       
    </div>
</template>

<script>
export default {
    data(){
        return {
            text:'概览页',
            dialogVisible: false,
            maskModal: false
        }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
}
</script>

<style lang="postcss" scoped>
.mask{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
}
</style>