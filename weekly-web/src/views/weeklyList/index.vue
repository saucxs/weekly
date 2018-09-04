<template>
    <div class="weekly-list">
      <div class="title">历史周报</div>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    data(){
      return {

      }
    },
    created(){
      this.getCurrentWeekly().then(res => {
        if(res.errno == 0){
          this.weeklyContent = res.data.content;
        }
      })
    },
    computed: {
      ...mapGetters([])
    },
    methods: {
      ...mapActions([
        "getCurrentWeekly",
      ]),
    }
  }
</script>

<style lang="postcss" scoped>
.weekly-list{

}
</style>
