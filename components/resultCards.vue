<template>
    <div class="tds-result-card-contianer">
        <div  v-for="(result, index) in results" :key="index">
        <div class="tds-result-card">
            <div class="img-holder" @click="$router.push(`/properties/${result.permalink}`)">
            <p>
                <span class="bta bta-boost" v-if="result.boost > 0" >BOOSTED AD</span>
                <span class="bta bta-priority" v-if="result.priority > 0">PRIORITY LISTING</span>
            </p>
            <vue-load-image>

                <img slot="image" :src="baseUrl+result.card_thumbnail" />
                <img slot="preloader" src="~/static/img/fallback.jpg"/>
            </vue-load-image>
            </div>
            <div class="search-content-holder">

                <div id="search-item-title">
                    <span>
                        <nuxt-link :to="'/properties/'+result.permalink">
                            {{result.title | truncate(220)}}
                        </nuxt-link>
                    </span>
                    <span>
                        {{result.price | currency}}
                    </span> </div>
                <div class="search-content-description">
                    {{ result.description | truncate(80) }}
                </div>

                <div class="search-content-footer">
                    <span>
                        <img src="/img/location.png" width="15"> {{result.location}}
                    </span>
                    <span class="search-share-image">
                        <!-- <img src="/img/save_icon.png" width="20px" class="search-save-icon"/>  -->
                        <img src="/img/clock.svg" width="15px" class="search-share-icon"/>
                        Added {{result.days_in_words}}
                    </span>
                </div>
            </div>

        </div>
            <div v-if="index === 3">
                <Banner
                    :loaded="loaded"
                    :desktop="desktop"
                    :mobile="mobile"
                    :url="url"
                    />
            </div>
        </div>

        <Banner
            :loaded="loaded"
            :desktop="desktopTwo"
            :mobile="mobileTwo"
            :url="urlTwo"
        />
    </div>
</template>

<script>
import VueLoadImage from 'vue-load-image'
import Banner from '~/layouts/SearchPromo'

export default {
    components: {
        'vue-load-image': VueLoadImage,
        Banner
    },

    data(){
        return{
            baseUrl: process.env.API_URL,
            timerOne:0,
            timerTwo:1,
            initialvalOne:0,
            initialvalTwo:1,
            desktop: null,
            desktopTwo: null,
            mobile: null,
            mobileTwo: null,
            url: null,
            urlTwo: null
        }
    },
    methods: {
        getBanner(){
            this.$store.dispatch('promo/getBanners', "MEDIUM")
        },
        TimerFunction(){
            if((this.timerTwo + 2) < this.medium.length){
                this.timerTwo = this.timerTwo + 2
            }
            else{
                if(this.initialvalTwo == 0){
                    this.initialvalTwo = 1
                    this.timerTwo = this.initialvalTwo
                    }
                    else{
                    this.initialvalTwo = 0
                    this.timerTwo = this.initialvalTwo
                    }
            }
            if((this.timerOne + 2) < this.medium.length){
                this.timerOne = this.timerOne + 2
            }
            else{
                    if(this.initialvalOne   == 0){
                        this.initialvalOne = 1
                        this.timerOne = this.initialvalOne
                    }
                else{
                this.initialvalOne = 0
                    this.timerOne = this.initialvalOne
                }
            }

            this.desktop = this.medium[this.timerOne].desktop
            this.mobile = this.medium[this.timerOne].mobile
            this.url = this.medium[this.timerOne].url

            this.desktopTwo = this.medium[this.timerTwo].desktop
            this.mobileTwo = this.medium[this.timerTwo].mobile
            this.urlTwo = this.medium[this.timerTwo].url
        }
    },
    computed:{
        results(){
            return this.$store.state.search.searchResults
        },
        loaded() {
            return this.$store.state.promo.loaded
        },
        medium(){
            return this.$store.state.promo.medium
        }
    },
    filters: {
        truncate:(value, limit)=>{
            if ( value.length > limit ) {
                return value.trim().slice(0, limit) + "..."
                }
            else{
                return value
                }
        }

    },
    created(){
        this.getBanner()
    },
    mounted(){
        this.Interval= setInterval(this.TimerFunction, 5000);
    },
    destroyed(){
        clearInterval(this.Interval)
    },

}
</script>

<style>
.tds-result-card-contianer .bta{
    height: 20px;
    width: 110px;
    font-size: 9px;
    padding: 3px;
    text-align: center;
    border-radius: 20px;
    left: 10px;
    z-index: 9;
}
.tds-result-card-contianer .bta-boost{
  left:140px;
}

@media screen and (max-width: 500px){
  .tds-result-card-contianer .bta {
    left: 10px;
    top: 10px;

  }
  .tds-result-card-contianer .bta-boost{
    left: 10px;
    top: 35px;
  }
}
    .modal-content .tds-forum-filters ul .filter-radio{
        color: white !important;
    }
    .modal-content .b-radio.radio input[type=radio]:checked + .check{
        border-color: white !important;
    }
    .modal-content .b-radio.radio input[type=radio] + .check:before{
        background: white !important;
    }
    /* .modal-content .field.filter-radio{
        padding-left: 20px;
    } */
    .tds-result-card{
        min-height:250px;
        border: 1px solid #F2EFEF;
        display: flex;
        margin: 20px 0;
        height: 100%;
        border-radius: 4px;
        position: relative;
    }
    .tds-result-card .img-holder .vue-load-image{
        /* width: 400px; */
        height: 250px;
        cursor: pointer;
    }
    .tds-result-card .img-holder img{
        width: 400px;
        border-radius: 4px 0 0 4px;
        height: 100%;
        object-fit: cover;
    }
    .tds-result-card .search-content-holder{
        max-width: 700px;
        width: 100%;
        padding: 20px;
        position: relative;
    }
    #search-item-title a{
        color: #4a4a4a !important;
        font-weight: 500;
    }
    #search-item-title span:first-of-type{
        font-size:20px;
        width: 70%;
    }
    #search-item-title span:nth-last-of-type(1){
        color: #0cb8e0;
        font-weight: bold;
        font-size: 18px;
    }
    #search-item-title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
    }
    .search-content-description{
        font-size: 15px;
        color: #808080;
    }
    .search-content-footer{
        position: absolute;
        bottom: 20px;
        display: flex;
        justify-content: space-between;
        width:calc(100% - 40px);
        font-size: 12px;
    }
    .search-content-footer span:first-of-type{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .search-save-icon, .search-share-icon{
        margin-left:15px;
    }
    .tds-result-card-contianer{
        margin-left: 20px;
    }

    .search-share-image{
        display: flex;
    }

    .search-share-image img{
        margin-right: 5px;

    }
    @media screen and (max-width:1200px) {
        .tds-result-card-contianer{
            margin:0;
        }
    }
    @media screen and (max-width:380px){
        #search-item-title span:nth-last-of-type(1) {
            font-size: 13px;
        }
        #search-item-title span:first-of-type{
            font-size: 13px;
            height: 75px;
            overflow: hidden;
        }
        #search-item-title span:first-of-type {
            width: 100%;
        }
    }
    @media screen and (max-width:600px) {
        .search-content-description{
            display: none;
        }
        #search-item-title{
            flex-wrap: wrap;
            flex-direction: column-reverse;
            margin-top: 10px;
        }

        #search-item-title a{
            color: #808080 !important;
        }
        .search-content-footer{
            bottom: 5px;
        }

        .search-content-footer span:first-of-type{
            display: none;
        }
        #search-item-title span:first-of-type{
            font-size: 13px;
        }

        #search-item-title span:nth-last-of-type(1){
            margin-top: -15px;
        }
        .tds-result-card .img-holder .vue-load-image{
            width: 100%;
            height: 160px;
        }
        .tds-result-card {
            min-height: 160px;
            height: 100%;
            margin: 5px 0;
        }
        .tds-result-card .search-content-holder{
            padding: 10px 5px 10px 10px;
        }
        .search-save-icon, .search-share-icon {
            margin-left: 0;
        }
        .search-share-image{
            display: grid;
            grid-template-columns: auto auto;
            justify-content: space-between;
        }
    }


</style>
