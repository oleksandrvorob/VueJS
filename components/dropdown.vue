<template>
  <div class="dropdownbtn" align="center">
    <no-ssr>
      <b-dropdown style="height:auto">
        <button class="button is-white tds-no-border-radius tds-btn-dropdown" slot="trigger" style>
          <span>
            <strong>{{Location}}</strong>
          </span>
          <b-icon icon="menu-down"></b-icon>
        </button>

        <b-dropdown-item
          class="tds-home-dropdown"
          v-for="(state, index)  in LocationsData"
          :key="index"
        >
          <nuxt-link :to="'/q/search?state='+state.state">
            <b>{{state.state | capitalize }}</b>
          </nuxt-link>
          <span style="max-width:800px; position: relative; display: flex;flex-wrap: wrap;">
            <nuxt-link
              :to="'/q/search?lga=' + area"
              v-for="(area, index) in state.area"
              :key="index"
              @click="logged(area)"
              class="states"
            >{{area | capitalize}} |</nuxt-link>
          </span>
        </b-dropdown-item>
      </b-dropdown>
    </no-ssr>
  </div>
</template>

<script>
import LocationsData from './forms/formlocations.json'
import { mapMutations } from 'vuex'
console.log(LocationsData)
export default {
  data() {
    return {
      LocationsData: LocationsData,
      Location: 'ALL LOCATIONS COVERED'
    }
  },
  methods: {
    logged(area) {
      console.log(area)

      this.$store.commit('banner/Location', area)
      this.Location = area
    }
  },
  filters: {
    capitalize(value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    
  }
}
</script>
<style>
</style>

