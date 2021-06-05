<template>
  <div>
      <forum page="FILTER"/>
  </div>
</template>

<script>
import forum from "~/components/forum"
export default {
  components:{
      forum
  },
middleware: ['forum']

}
</script>

<style>

</style>
