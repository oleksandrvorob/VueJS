<template>
  <transition name="slide-fade">
    <div class="notification tds-notification" :class="notificationType" v-if="isActive"> 
      <button class="delete" @click="reset()"></button>
      {{msg}}
    </div>
  </transition>
</template>

<script>
export default {
  computed:{
    notificationType(){
      return this.$store.state.notify.notificationType
    },
    isActive(){
      return this.$store.state.notify.isActive
    },
    msg(){
      return this.$store.state.notify.msg
    },

  },
  methods:{
    reset(){
        this.$store.commit('notify/reset')
        console.log("Closed");
        
    }
  }
}
</script>

<style>


</style>
