<template>
  <span v-if="newWord !== null">
    <span v-for="(w, i) in newWord" :key="i">{{w}}</span>
  </span>
</template>

<script>
export default {
  props:['word'],
  computed:{
    newWord(){
      if(this.word){
        console.log(this.word.split(''))
        return this.word.split('')
      }
    }
  }
}
</script>

<style>

</style>
