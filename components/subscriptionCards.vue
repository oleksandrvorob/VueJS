<template>
  <div class="tds-subscription-cards">
    <div class="tds-subscription-grid">
      <div class="subscription-card">
        <p align="center">
          <b>Free</b>
        </p>
        <p class="tds-subcard-item-price" align="center">
          <sup>N</sup>00
          <span>/month</span>
        </p>
        <div class="tds-subcard-item">
          <p>
            <span>Regular Listings</span>
            <span>
              <b>3</b>
            </span>
          </p>
        </div>
        <div class="tds-subcard-item">
          <p>
            <span>Priority Listings</span>
            <span>
              <b>-</b>
            </span>
          </p>
        </div>
        <div class="tds-subcard-item">
          <p>
            <span>Additional packages</span>
            <span>
              <b>-</b>
            </span>
          </p>
        </div>
        <div class="tds-subcard-item"></div>
        <div class="tds-subcard-item"></div>
        <div class="tds-subcard-item"></div>
        <div class="tds-subcard-item"></div>
      </div>

      <div class="subscription-card">
        <p align="center">
          <b>Basic</b>
        </p>
        <p class="tds-subcard-item-price" align="center">
          <sup>N</sup>2,000
          <span>/month</span>
        </p>
        <div class="tds-subcard-item">
          <p>
            <span>Regular Listings</span>
            <span>
              <b>Unlimited</b>
            </span>
          </p>
        </div>
        <div class="tds-subcard-item">
          <p>
            <span>Priority Listings</span>
            <span>
              <b>5</b>
            </span>
          </p>
        </div>
        <div class="tds-subcard-item">
          <p>
            <span>Priority Boosts</span>
            <span>
              <b>5</b>
            </span>
          </p>
        </div>
        <div class="tds-subcard-item">
          <p>
            <span>
              Property Request
              <br>Views
            </span>
            <span>
              <b>Unlimited</b>
            </span>
          </p>
        </div>
        <div class="tds-subcard-item"></div>
        <div class="tds-subcard-item"></div>
        <div class="tds-subcard-item">
          
        </div>
        <p align="center">
          <button
            name="BASIC"
            class="button tds-primary-button"
            :class="{tdssubactive : currentplan('BASIC')}"
            @click="subscribe"
            :disabled="currentplan('BASIC')"
          >subscribe</button>
          </p>
        
      </div>

      <div class="subscription-card">
        <p align="center">
          <b>Classic</b>
        </p>
        <p class="tds-subcard-item-price" align="center">
          <sup>N</sup>5,000
          <span>/month</span>
        </p>
        <div class="tds-subcard-item">
          <p>
            <span>Regular Listings</span>
            <span>
              <b>Unlimited</b>
            </span>
          </p>
        </div>
        <div class="tds-subcard-item">
          <p>
            <span>Priority Listings</span>
            <span>
              <b>15</b>
            </span>
          </p>
        </div>
        <div class="tds-subcard-item">
          <p>
            <span>Priority Boosts</span>
            <span>
              <b>10</b>
            </span>
          </p>
        </div>
        <div class="tds-subcard-item">
          <p>
            <span>
              Buy additional
              <br>boosts at
            </span>
            <span>
              <b>
                ₦550/Boost
              </b>
            </span>
          </p>
        </div>
        <div class="tds-subcard-item">
          <p>
            <span>
              Property Request
              <br>Views
            </span>
            <span>
              <b>Unlimited</b>
            </span>
          </p>
        </div>
        <div class="tds-subcard-item"></div>
        <div class="tds-subcard-item"></div>

        <p align="center">
          <button
            name="CLASSIC"
            class="button tds-primary-button"
            :class="{tdssubactive : currentplan('CLASSIC')}"
            @click="subscribe"
            :disabled="currentplan('CLASSIC')"
          >subscribe</button>
        </p>
      </div>

      <div class="subscription-card">
        <p align="center">
          <b>Pro</b>
        </p>
        <p class="tds-subcard-item-price" align="center">
          <sup>N</sup>12,500
          <span>/month</span>
        </p>
        <div class="tds-subcard-item">
          <p>
            <span>Regular Listings</span>
            <span>
              <b>Unlimited</b>
            </span>
          </p>
        </div>
        <div class="tds-subcard-item">
          <p>
            <span>Priority Listings</span>
            <span>
              <b>40</b>
            </span>
          </p>
        </div>
        <div class="tds-subcard-item">
          <p>
            <span>Priority Boosts</span>
            <span>
              <b>20</b>
            </span>
          </p>
        </div>
        <div class="tds-subcard-item">
          <p>
            <span>
              Buy additional
              <br>boosts at
            </span>
            <span>
              <b>
                ₦500/Boost
              </b>
            </span>
          </p>
        </div>
        <div class="tds-subcard-item">
          <p>
            <span>
              Property Request
              <br>Views
            </span>
            <span>
              <b>Unlimited</b>
            </span>
          </p>
        </div>
        <div class="tds-subcard-item"></div>
        <div class="tds-subcard-item"></div>
        <p align="center">
          <button
            name="PRO"
            class="button tds-primary-button"
            :class="{tdssubactive : currentplan('PRO')}"
            @click="subscribe"
            :disabled="currentplan('PRO')"
          >subscribe</button>
        </p>
      </div>

      <div class="subscription-card">
        <p align="center">
          <b>Custom</b>
        </p>
        <p class="tds-subcard-item-price" align="center">
          <sup>N</sup>20,000
          <span>/month</span>
        </p>
        <div class="tds-subcard-item">
          <p>
            <span>Regular Listings</span>
            <span>
              <b>Unlimited</b>
            </span>
          </p>
        </div>
        <div class="tds-subcard-item">
          <p>
            <span>Priority Listings</span>
            <span>
              <b>60</b>
            </span>
          </p>
        </div>
        <div class="tds-subcard-item">
          <p>
            <span>Priority Boosts</span>
            <span>
              <b>30</b>
            </span>
          </p>
        </div>
        <div class="tds-subcard-item">
          <p>
            <span>Additional Priority Listings</span>
            <span>
              <b>₦500/AdList</b>
            </span>
          </p>
        </div>
        <div class="tds-subcard-item">
          <p>
            <span>
              Buy additional
              <br>boosts at
            </span>
            <span>
              <b>
                ₦500/Boost
              </b>
            </span>
          </p>
        </div>
        <div class="tds-subcard-item">
          <p>
            <span>Property Request Views</span>
            <span>
              <b>Unlimited</b>
            </span>
          </p>
        </div>
        <div class="tds-subcard-item">
          <p>
            <span>Social media boosts</span>
            <span>
              <b>5</b>
            </span>
          </p>
        </div>

        <p align="center">
          <button
            name="CUSTOM"
            class="button tds-primary-button"
            :class="{tdssubactive : currentplan('CUSTOM')}"
            :disabled="currentplan('CUSTOM')"
            @click="subscribe"
          >subscribe</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userPlan: ''
    }
  },
  computed: {
    userName() {
      let base64Url = this.storage.token.split('.')[1]
      return JSON.parse(atob(base64Url)).username
    },
  },
  methods: {
    currentplan(value) {
      if (value == this.userPlan) {
        return true
      } else {
        return false
      }
    },
    subscribe(e) { 
      this.$router.push({ path: '/promote-property/pricings', query: {plan: e.target.name} })
    },

    async getSubscriptionDetails() {
      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const userSub = await this.$axios.$get(`my-subscription/${this.userName}`)
        console.log(userSub)
        this.userPlan = userSub.plan
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted() {
    this.currentplan()
  },
  
  created(){
    this.getSubscriptionDetails()
  }
}
</script>

<style>
</style>
