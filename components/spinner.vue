<template>
  <transition name="fade">
    <div class="spinner-overlay" v-if="isActive">
      <div id="loading" ></div>
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
     isActive(){
      return this.$store.state.spinner.isActive
    },
  }
}
</script>

<style>
  
</style>
