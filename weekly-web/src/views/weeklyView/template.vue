<template>
  <router-view></router-view>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    data(){
      return {

      }
    },
    created(){

    },
    computed: {
      ...mapGetters([
        "userInfo",
      ])
    },
    methods: {
      ...mapActions([
        "getCurrentWeekly",
        "addWeekly",
        "getDepartmentWeeklyList",
        "getDepartmentMemberList",
        "getUnWeeklyList"
      ]),
    }
  }
</script>

<style lang="postcss" scoped>

</style>
