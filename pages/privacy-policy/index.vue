<template>
  <div>
    <Banner/>
    <div class="container">
      <div >
          
            <div style="max-width:788px; margin:auto" class="tds-content-faq">
                <div class="tds-faq-title">
              <strong><span class="tds-underline">Privacy</span> </strong> Policy
            </div>
            
            <p>
                This policy details how we will collect, use and protect all personal 
                information pertaining to users of our website, apps and other services. 
                In this document, “We and 2DotsProperties.com” refers to the same entity.
            </p>
            <p>
                <b style="font-size:25px">Personal Data </b>
            </p>
            <p>
                We may collect certain personal data about you as you use our website and other services. Data collected may include your user account details
                 (including email address, telephone number) and other information you might provide to us in 
                your profile.
                <br>
                <br>
                We may also collect data about you when you log on to our services from third 
                party websites or applications.
            </p>

            <p>
                <b style="font-size:25px">Personal Data Processing</b>
            </p>

            <p>
                Personal data collected might be used for the some of the following under listed functions:<br>
                -	Contacting users about changes in any of our policies, Terms and Conditions or any other critical website services news<br>
                -	email alerts delivery<br>
                -	Managing user requests and potential complaints about data correction or requests for data access <br>
                -	We might use predictive methods and intelligent routines to gather and provide to consenting users, insights about personal data<br> 
                -	We may share personal data with some of our third party service providers that act as data processors. Such third party processors are obligated to comply with applicable data protection laws <br>
                -	To satisfy legal requirements including potential incidents of fraud or law enforcement<br>
            </p>

            <p>
                <b style="font-size:25px">Data Security</b>
            </p>

            <p>
                We store all user data including personal data in a secure format with standard procedures 
                in place to safeguard such information. We may use third party cloud service providers 
                to store user data with all the necessary data security safeguards undertaken by such 
                third parties. We would not be 
                liable for any data breach that might occur due to our use of such third party cloud services.<br>
            </p>

            <p>
                We reserve the rights to delete user data that we have determined to 
                be dormant or using any other criteria we might consider relevant to determine the status.
            </p>
            <p>
                <b style="font-size:25px">Cookies</b>
            </p>
            <p>
                Cookies are text files that a website saves on a visitors computer to enable the website 
                remember browsing and preference information about a particular visitor. 
                Cookies do not contain information that can personally identify users.
            </p>

            <p>
                We may use cookies for the following types of activities:
            </p>

            <p>
                To remember a returning visitor or user computer, this enables us to customize their site browsing experience.<br>
                To track the performance of our website. We do so using statistical methods to track number of users and pages visited. This enables us to improve the user experience and our provided services.<br>
                We may use cookies for re-marketing purposes with third parties that may show you personalized advertising. Such cookies do not contain personally identifiable information that can be used to identify particular users.<br>
                
            </p>
            <p>
                <b style="font-size:25px">Changes To Our Privacy Policy</b>
            </p>
            <p>
                Any changes to our privacy policy may be posted on our site and communicated via email to our registered users. All changes posted on the website become effective immediately on the day of posting.<br>
                We reserve the right to change our privacy policy at any time without prior notice.<br>
            </p>

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
  name: 'Privacy_Policy',
  components: {
    Banner,
    AdsCard
  },
  data() {
    return {
      title: 'Privacy Policy - 2Dots Properties'
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
          hid: 'Privacy Policy',
          name: 'Privacy Policy',
          content: 'This policy details how we will collect, use and protect all personal information pertaining to users of our website, apps and other services. In this document, “We and 2DotsProperties.com” refers to the same entity.'
        }
      ]
    }
  }
}
</script>




