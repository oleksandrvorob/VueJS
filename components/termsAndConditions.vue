<template>
  <div class="tds-About">
    <Banner />
    <div class="container tds-margin">
      <div style="max-width:788px; padding: 0 15px;margin:auto;">
        <article class="About-text terms-and-conditions">
          <div class="tds-faq-title">
            <strong>
              <span class="tds-underline">Terms &</span>
            </strong> Conditions
          </div>
          <p>
            By using our website or apps if applicable, you accept explicitly the terms and conditions laid out 
            in this agreement. You may not use any of our services if you are not up to legal age of 18, 
            or if you do not accept our terms and conditions. We reserve the right to change the Terms 
            and Conditions at any time.
          </p>
          <p>
            You agree to defend, indemnify and hold harmless 2DotsProperties.com, its employees, 
            shareholders, officers and directors from and against any claims, losses, suits, 
            liabilities or expenses (including attorney's fees) arising out of, or related to any 
            breach of this Agreement or use of the Services. 
          </p>
          <p>
            We do not guarantee that the service will work at all times. We would make all reasonable 
            efforts to keep the service always on and working. However, we would not be liable for 
            service outage or other acts out of our direct control that could limit the use of the 
            service.
          </p>
          <p>
            Information posted on this website could come directly from us or third parties.  
            Either parties do not provide any guarantees or warranties about the accuracy, completeness or timeliness 
            of the information posted on this website
          </p>
          <p>
            We are a property listing service, and as such, we may include links to other websites. 
            We have no control or responsibility over the contents hosted by third party websites
          </p>
          <p>
            You agree that any disputes relating to the services provided by us will be settled under 
            laws and courts within the jurisdiction of Nigeria.
          </p>
          <div>
            <p style="font-size:20px">
              <b>Advertiser Terms</b>
            </p>
            <p>An advertiser must confirm their authorization to act on behalf of, and keep to this Agreement, any third party for which advertising is generated.</p>
            <p>You are solely responsible for all advertised content and property listings. You are also responsible for correctness and accuracy of your posted listings at any point in time.</p>

            <p>You shall indemnify and defend 2DotsProperties.com and its partners from any third party claim or liability (including reasonable legal fees) arising out of your use of our services</p>
            <p>Property Ads must contain only one property listing per Ad. We may modify or remove content at any time to comply with our terms and conditions.</p>
            <p>You also consent that 2DotsProperties.com will display your content on its website, and might distribute your contents to third party partners.</p>
            <p>You shall not advertise anything illegal, pornographic or engage in any fraudulent business practice while using this platform and its related services.</p>
            <p>You grant 2DotsProperties.com and its partners, the rights to display and distribute your content. You also guarantee that your content or website do not violate any applicable laws.</p>
            <p>Any listed property or other advertisements may be cancelled by the advertiser at any time after listing. Absolutely no refunds will be done for any payments made to 2DotsProperties.com for property listings or other advertisements on the site.</p>
            <p>2DotsProperties.com will not be liable for any damages or losses incurred by the advertiser due to interrupted service or errors, however caused.</p>
            <p>2DotsProperties.com reserves the right to terminate this agreement at any time upon the violation of this agreement, without notice. We also reserve the right to change our policies at any time,  without notice </p>
            <p style="font-size:20px">
              <b>Property Forum Guidelines</b>
            </p>
            <p>All users are responsible for posts made with their registered user name and password. 2DotsProperties.com will not be liable for any legal issues arising from posts by registered users of the forum.</p>
            <p>The forum is strictly for posting enquires and information sharing on property and real estate matters. Absolutely No advertisements will be allowed on the forum.</p>
            <p>No illegal, adult or obscene material will be allowed on the forum. Offending users would be reported to the law enforcement agencies, and accounts locked and deleted, appropriately.</p>
            <p>We reserve the right to modify or delete posts that contravene any section of this agreement. In addition, offending user accounts and the contents will be banned and removed from the forum.</p>
          </div>
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

<style>
.terms-and-conditions p {
  padding-top: 20px;
}
.terms-and-conditions {
  /* padding-left: 10px; */
}
</style>

