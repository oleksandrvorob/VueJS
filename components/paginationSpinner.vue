<template>
  <transition name="fade">
    <div class="pagination-spinner" v-if="isActive">
      <div id="loading"></div>
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    isActive() {
      return this.$store.state.agents.show
    }
  }
}
</script>

<style>
.pagination-spinner{
  height: 100%;
  width: 100%;
  min-height: 100px;
  background: rgba(255, 255, 255, 0.81);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
</style>
