<template>
    <div>
        <div class="footerads tds-footer-grid" v-if="!loaded">
            <div class="tds-mini-jumbotron">

            </div>
            <div class="tds-mini-jumbotron-content">
                <div> <remodify :word="'Advertise'"/>/market your property on www.2dotsproperties.com
                </div>
                <div>
                    <n-link to="/promote-banner" class="button is-rounded tds-primary-button"> Place <remodify :word="'Advert'"/></n-link>
                </div>
            </div>
        </div>

        <div  class="desktop-large">
            <img  :src=baseUrl+desktop @click="visit(url)" class="promo-link">
        </div>
        <div>
            <img  v-if="!loaded" src="/img/ads_banner.png" class="mobile-ads-footer" @click="advertise" />
            <img  v-if="loaded" :src="baseUrl+mobile" @click="visit()" class="mobile-ads-footer"/>
        </div>
    </div>

</template>

<script>
import remodify from '~/components/remodify'
export default {
    components:{
        remodify
    },
    props: [
        "desktop",
        "url",
        "mobile",
        "loaded"
    ],
    data(){
        return {
            baseUrl: process.env.API_URL,
        }
    },
    methods:{
        advertise(){
            this.$router.push('/promote-banner')
        },
        visit(){
            window.open(this.url, '_blank');
        },
    }
}
</script>

<style>
.desktop-large{
    display: flex;
    justify-content: center;

}
.mobile-ads-footer{
    display:none;
}
.footerads{
    height:158px;
    overflow: hidden;
}
.tds-mini-jumbotron{
    background: #0CB8E0;
    height:158px;
}
.tds-mini-jumbotron-content{
    background: #3E3E3E;
    height: 154px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.tds-mini-jumbotron-content div{
    width:332px;
    color:white;
    font-size:20px;
    font-weight: bold;
    text-align: center;
}
.tds-mini-jumbotron-content div button{
    background:#0CB8E0;
    width: 227px;
    outline: none;
    border: none;
    height: 49px;
    color: white;
    font-weight: bold;
}
.tds-footer-grid{
    display:grid;
    grid-template-columns: 1fr 2fr;
    position: relative;
}
.tds-footer-trans{
    transform: rotate(45deg);
    position: absolute;
    width: 316px;
    height: 316px;
    background: #0CB8E0;
    z-index: 1;
    top:  -159px;
    left: 243px;
}
@media screen and (max-width:700px) {
    .tds-footer-trans{
        right:50%;
        /* left: auto; */
    }
}

@media screen and (max-width:1540px) {
    .tds-footer-grid {
        display: grid;
        grid-template-columns: 0.5fr 2fr;
        position: relative;
    }
    .tds-footer-trans {
        left: 89px;
    }
}
@media screen and (max-width: 1280px) {
    .tds-mini-jumbotron-content {
        display: grid;
        justify-content: flex-end;
        padding-right: 30px;
    }
}
@media screen and (max-width: 1007px) {
    .tds-footer-trans {
        left: 59px;
    }
}

@media screen and (max-width: 870px) {
    .tds-footer-trans {
        left: -49px;
    }
    .tds-mini-jumbotron-content div button{
        width: 127px;
        height: 29px;
    }
    .tds-mini-jumbotron-content div {
        width: 238px;
        font-size: 13px;
    }
    .tds-footer-grid {
        display: grid;
        grid-template-rows: auto auto;
        position: relative;
    }

}
@media (min-width:470px) and (max-width:570px) {
    .tds-footer-trans {
        transform: rotate(25deg);
        left: -129px;
    }
    .footerads{
        margin:10px;
    }
    .desktop-large{
        display: none;
    }
    /* .mobile-ads-footer{
        display:block;

    }  */
}
@media screen and (max-width:470px) {
    .footerads{
        display: none;
    }
    .mobile-ads-footer{
        display: block;
        width:100%;
    }
    .desktop-large{
        display: none;
    }
}

</style>
