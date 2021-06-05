<template>
  <div class="post-property">
    <div style="position:relative">
      <div class="tds-round-container">
        <div v-for=" (title , index) in formTitle" :key="index">
          <div class="tds-round-notification" :class="{opac : index == counter}"></div>
          <p>{{title}}</p>
        </div>
      </div>
      <hr>
    </div>

    <keep-alive>
      <component :is = "columns"> </component> 
    </keep-alive>

    
  </div>
</template>

<script>
import formOne from '~/components/forms/FormOne.vue'
import formTwo from '~/components/forms/FormTwo.vue'
import formThree from '~/components/forms/FormThree.vue'
import formFour from '~/components/forms/FormFour.vue'
export default {
  components: {
    formOne,
    formTwo,
    formThree,
    formFour
  },
  data() {
    return {
      formTitle: ['LOCATION', 'PRICE', 'DESCRIPTION', 'PICTURES']
    }
  },
  computed: {
    counter() {
      return this.$store.state.postproperty.counter
    },
    columns(){
      return this.$store.state.postproperty.showForm[this.counter]
    },
    form() {
      return this.$store.state.postproperty.form
    },
  },
    destroyed(){
    this.$store.commit('postproperty/resetCount')
  },
  
  }
  

</script>

<style>


</style>