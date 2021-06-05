<template>
    <div class="content" align="center">
        <header class="tds-titles" align="center">
      <strong> Partnered</strong> Brands
      <hr>
    </header>
        <div class="tds-relative">
            <div class="tds-absolute">
                <div style="width:100vw; display:flex;" class="tds-animation">
                  <infinite-slide-bar :duration='duration'>
                    <div v-for="(brand, index) in brands" :key="index" class="tds-brand-image" style="margin-top:20px;" @click="gotoLink(brand.url)" @mouseover="pause" @mouseleave="unPause">
                        <img :src="baseUrl+brand.logo" />
                    </div>
									</infinite-slide-bar>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        data() {
            return {
								brands: [],
								baseUrl: process.env.API_URL,
								duration: '60s'
            }
				},

				methods: {
					async getBrands(){
						const brands = await this.$axios.$get('brands/all')
						this.brands = brands
						console.log(brands)
					},

					gotoLink(url){
						window.open(url, '_blank')
					},

					pause(){
						this.duration = "0s"
					},

					unPause(){
						this.duration = "60s"
					}
				},
				created(){
					this.getBrands()
				}
    }
</script>

<style>

</style>
