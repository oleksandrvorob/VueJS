<template>
    <section class="similarProperties">
        <h1> <span class="tds-underline">Similar</span> Properties </h1>
        <Card :properties="similarProps"></Card>
        
    </section>
</template>

<script>
import Card from '~/components/Card'

export default {
  props: ["posts"],
  components:{
    Card
  },
    data(){
        return{

        }
    },
    computed:{
        similarProps(){
            return this.posts.slice(0, 4);
        }
    },
    methods:{
        
    }
}
</script>

<style>
  
 

</style>
