<template>
  <div class="zoom-image" v-if="picture">
    <span class="close-search-modal" @click="close()">×</span>
    <section class="zoom-image-holder">
      <img
        v-if="images.length > 0"
        :src="images[iterator].src"
        width="100"
      >
      <div>
        <span @click="changeimage()" class="arrow">◀</span>
        <span class="arrow" @click="changeimagePrev()">▶</span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ['images'],
  data() {
    return {
      iterator: 0,
    }
  },
  methods: {
    changeimage() {
        this.iterator++
        if (this.iterator === this.images.length) {
          this.iterator = 0
        }
        this.animated = false
    },
    close(){
      this.$store.commit('nav/Zoomin')
    },
    changeimagePrev() {
      this.animated = true

        if (this.iterator === 0) {
          this.iterator = this.images.length
        }
        this.iterator--
        this.animated = false
    }
  },
  computed: {
    picture() {
      return this.$store.state.nav.picture
    }
  }
}
</script>

<style>
.zoom-image .close-search-modal{
  top:0;
}
.zoom-image {
  z-index: 55;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  padding-top: 4%;
  background: rgba(0, 0, 0, 0.8);
  left: 0;
}
.zoom-image .zoom-image-holder {
  height: 80%;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.zoom-image img {
  transition: all 0.5s ease-in;
  z-index: 15;
  width: auto;
  height: 100%;
}
.zoom-image .arrow {
  color: deepskyblue;
  font-size: 25px;
  cursor: pointer;
}
.zoom-image section div {
  display: flex;
  justify-content: space-between;
  right: 0;
  position: absolute;
  width: 80%;
  margin: auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.bounce-animated {
  opacity: 0.6;
}
</style>
