<template>
  <section>

      <header class="tds-titles" align="center">
      <strong> Trending</strong> Properties
      <hr>
    </header>
  
    
     <Card :properties="properties"></Card>
  </section>
</template>

<script>
import Card from '~/components/Card'

export default {
  components:{
    Card
  },
  data() {
    return {
      
    }
  },
  computed: {
    properties(){
      return this.$store.state.properties.properties
    }
  },
  methods: {
    getPosts(){
      this.$store.dispatch('properties/getPost')
    }
  },
  created(){
    this.getPosts()
  }
}
</script>

