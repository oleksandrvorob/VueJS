<template>
  <div>
    <Banner/>
    <div class="container">
      <div>
        <div class="tds-faq-flex">
          <div style="max-width:788px;margin:auto;" class="tds-content-faq">
            <div class="tds-faq-title">
              <strong>
                <span class="tds-underline">Frequen</span>tly Asked
              </strong> Questions
            </div>
            <p>
              <b>How do I upload a new listing?</b>
              <br>You will need to register and open an account on the platform to upload a new listing. Click on Sign Up to open a new account and start uploading your property listings. 

              <br>
            </p>

            <p>
              <b>What is the difference between a Free (Regular) listing and a Priority listing?</b>
              <br>Free (Regular) listings have less visibility and are usually placed at 
              the bottom or last page of property searches. Priority listings have more 
              visibility and are displayed at the top of search pages. This ensures 
              potential clients get to see more of Priority listings, with a greater 
              probability of sales or rentals for such properties.
            </p>

            <p>
              <b>What kind of images and pictures can be uploaded on 2DotsProperties.com?</b>
              <br>Our platform supports most picture formats and also we automatically create a slide 
              show of all your property images (including floor plans) for all categories 
              of users, regardless of subscription plan status.
            </p>

            <p>
              <b>What are your charges for advertising a property?</b>
              <br>We have different plans to fit different user budgets and purpose. All plans and payment
              instructions are available on the
              <nuxt-link to="/promote-property">Advertise with Us</nuxt-link> page accessible from the homepage
            </p>

            <p>
              <b>How do I place a Banner Ad or Partnered Brand Logo?</b>
              <br>
                You can place a Banner Ad or Partnered Brand logo from the 
                “Advertise with Us” link. The banner /logo sizes, placement 
                locations and prices are clearly indicated on that page. 
                The banners / logos are automatically placed by the platform 
                and removed after the expiration of the duration.
            </p>

            <p>
              <b>What are Boosts?</b>
              <br>Boosts are additional opportunities for priority listings 
              to appear at the top of search pages. Users can use Boosts 
              to increase the probability of potential clients seeing listed 
              properties during searches. Boosts attract an additional charge 
              per priority listing. Only Priority listings can be boosted

            </p>

            <p>
              <b>How do I get more information about a property that interests me?</b>
              <br>The fastest way to do that is to call or message the listing agent directly.
              Agents are responsible for all information posted with their listed properties.
              <!-- <a href="#">mojisola@acewashndry.com </a> 
              or on call us on <a href="tel:+2348029788013">+2348029788013 </a>-->
            </p>

            <p>
              <b>How do I post a question on the 2DotsProperties.com Forum?</b>
              <br>You would need to be a registered user to post questions 
              or replies on the property forum. All registered users can post 
              questions and receive replies from other users, agents and other 
              property experts.
            </p>

            <p>
              <b>What are Property Requests?</b>
              <br>These are specific or unique requests for properties from individuals 
              or agents. Any user can post property requests but agents and other 
              users need a subscription 
              to be able to see the full details of any posted property request.
            </p>

            <p>
              <b>Any other questions?</b>
              <br>Please contact us using the details on our
              <nuxt-link to="/contact"> Contact Us </nuxt-link>page.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>



<script>
import Banner from '~/components/static_components/Banner.vue'
import AdsCard from '~/components/static_components/AdsCard.vue'
export default {
  name: 'Faqs',
  components: {
    Banner,
    AdsCard
  },
  data() {
    return {
      title: 'FAQs - 2Dots Properties'
    }
  },
  methods: {
    hideSearchBar(payload) {
      this.$store.commit('common/updateIsIndex', payload)
    },
    updateTopSpaces(m, p) {
      this.$store.commit('common/updateSpace', {
        marginTop: m,
        paddingTop: p
      })
    }
  },
  created() {
    this.updateTopSpaces(64, 0)
    this.hideSearchBar(false)
  },
  beforeDestroy() {
    this.hideSearchBar(true)
    this.updateTopSpaces(136, 50)
  },
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'Faqs',
          name: 'Faqs',
          content: 'Frequently Asked Questions'
        }
      ]
    }
  }
}
</script>




