<template>
  <section class="banner">
    <div class="tds-banner-text">
      <div class="tds-banner-heading">
        <img src="img/Logo.png" height="125" width="78">
      </div>
      <div class="tds-banner-subheading">FIND YOUR IDEAL HOME OR OFFICE</div>


      <div align="center" style="margin-top:30px" class="tds-group-button-banner">
        <button
          v-for="(category, index) in categories"
          :key="index.id"
          class="tds-btn button"
          :class="{ tds : category.clicked}"
          @click="selectedCategory(index)"
        >{{category.name}}</button>
      </div>



      <div class="tds-button-group-dropdown-mobile" align="center" style="margin-top:30px">
        <b-dropdown aria-role="list" v-model="category">
          <button class="tds-btn button" slot="trigger">
            <span v-if="name"> {{name}} </span>
            <span v-if="name === '' "> Select Purpose </span>
            <b-icon icon="menu-down"></b-icon>
          </button>
          <b-dropdown-item value disabled > Any </b-dropdown-item>
          <b-dropdown-item
            aria-role="listitem"
            v-for="(category, index) in categories"
            :key="index.id"
            @click="selectedCategory(index)"
            align="center"
          >{{category.name}}</b-dropdown-item>
        </b-dropdown>
      </div>


      <search style="margin-top:30px;"/>
      <drop-down/>
    </div>
  </section>
</template>


<style>

</style>


<script>
import dropDown from './dropdown.vue'
import search from './searchform.vue'
export default {
  components: {
    dropDown,
    search
  },
  data() {
    return {
      category:''
    }
  },
  computed: {
    slug() {
      return this.$store.state.banner.selectedSlug
    },
    name(){
      return this.$store.state.banner.selectedName
    },
    categories() {
      return this.$store.state.banner.categories
    }
  },
  methods: {
    selectedCategory(index) {
      this.$store.commit('banner/toggleCategory', index)
    }
  },
  watch: {
    
  }
}
</script>

