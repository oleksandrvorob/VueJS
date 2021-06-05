<template>
  <div class="tds-About">
    <Banner />
    <div class="container tds-margin">
        <div style="max-width:788px; padding: 0 15px; margin:auto;">
          <div class="tds-faq-title">
            <strong>
              <span class="tds-underline">About</span>
            </strong> Us
          </div>
          <article class="About-text">
            2DotsProperties.com was founded to take advantage of existing gaps in dynamic property markets. Our first platform is focused on the Nigerian real estate market.
            <br />We help property seekers evaluate the options in the residential and commercial property markets.
            <br />We form strategic alliances with agents, owners and property developers to market their properties to a global audience. Our platform offers unique opportunities to showcase and track effectiveness of your property listings.
            <br />
          </article>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '~/components/static_components/Banner.vue'
import AdsCard from '~/components/static_components/AdsCard.vue'
export default {
  components: {
    AdsCard,
    Banner
  }
}
</script>
