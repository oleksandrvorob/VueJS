<template>
    <div v-if="searchModal">
        <div class="searchmodal-background">
            
                <span class="close-search-modal" @click="toggleModal">&times;</span>
            
            <searchform/>
        </div>
    </div>
</template>

<script>
import searchform from "~/components/searchform"
export default {
    data(){
        return{
            // searchModal:true
        }
    },
    components:{
        searchform
    },
    methods:{
        toggleModal(){
            this.$store.commit('nav/toggleModal')
        }
    },
    computed:{
        searchModal(){
            return this.$store.state.nav.modal
        }
    }
}
</script>

<style>
.searchmodal-background{
    height:100vh;
    position: fixed;
    top:0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.803);
    width:100%;
    right:0;
    /* padding-top: 40vmin; */
    display: grid;
    justify-content: center;
    align-items: center;
}
.close-search-modal{
    color:white;
    font-size:30px;
    position: fixed;
    top: 20vmin;
    right:20px;
    cursor: pointer;
}
</style>
