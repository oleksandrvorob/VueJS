<template>
  <section>
      <div class="container tds-page-content tds-property-request">
          <propertyRequest/>
      </div>
    
  </section>
</template>
    
    <script>
import propertyRequest from '~/components/propertyRequest'
export default {
  components: {
    propertyRequest
  },
  name: 'PropertyResquestPage',
  methods: {
    updateTopSpaces(m, p) {
      this.$store.commit('common/updateSpace', { marginTop: m, paddingTop: p })
    }
  },
  created() {
    this.updateTopSpaces(100, 50)
  },
  beforeDestroy() {
    this.updateTopSpaces(136, 50)
  },
   data(){
        return {
        }
    },
  head() {
    return {
      title: "Post Property Requests - 2Dots Properties",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'Post Property Requests',
          name: 'Post Property Requests',
          content: 'Post Property Requests'
        }
      ]
    }
  },
    middleware: 'auth'
}
</script>
    
<style>
.property-request-form {
  /* display: grid; */
  margin-top: 70px;
  max-width: 860px;
  margin: 70px auto 0 auto;
}
.tds-special-form .button {
  border-radius: 8px;
  margin-left: 0;
}
.tds-special-form label {
  text-align: left;
  max-width: 250px;
}
@media screen and (min-width: 769px) {
  .tds-special-form .field-label {
    /* margin-right: 100px; */
    text-align: right;
  }
  .tds-special-form .field.is-horizontal {
    margin-bottom: 20px !important;
  }
}
@media screen and (min-width: 769px) {
  .field-body {
    flex-grow: 3;
  }
}
</style>
