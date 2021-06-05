<template>
  <div>
    <div class="container tds-page-content">
      <div>
        <header align="center" class="tds-titles"><strong>Edit</strong> Post
      <hr></header>
      </div>
      <editForm/>
    </div>
  </div>
</template>
<style>

</style>
<script>
import editForm from '~/components/editPostProperty'
export default {
  components: {
    editForm
  },
  name: 'Editproperty',
  data() {
    return {
      title: 'Edit Property - 2Dots Property'
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'EditPropertyPage',
          name: 'EditPropertyPage',
          content: 'Property Edit'
        }
      ]
    }
  },
  middleware: 'auth',
  methods: {
    updateTopSpaces(m, p) {
      this.$store.commit('common/updateSpace', {
        marginTop: m,
        paddingTop: p
      })
    }
  },
  created() {
    this.updateTopSpaces(100, 50)
  },
  beforeDestroy() {
    this.updateTopSpaces(136, 50)
  }
}
</script>