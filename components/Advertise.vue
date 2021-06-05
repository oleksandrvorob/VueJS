<template>
  <div class="container tds-advertise-cards">
    <header class="tds-titles">Advertise with us
      <hr>
    </header>
    <div class="column is-full tds-column-grey">
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt</div>
    <div class="tds-advertise-cards-show">
      <div
        class="tds-cards"
        v-for="(advertise , index) in advertise"
        :key="index"
        :class="{ tdssubActive : (index == subActive) }"
      >
        <h1 class="tds-card-header">
          {{advertise.title}}
          <br>
          {{advertise.value}}
        </h1>
        <p class="tds-card-footer">
          <sup>N</sup>
          {{advertise.price}}
        </p>
        <p style="font-size:12px;">Per Month</p>
      </div>
    </div>

    <div class="column is-full tds-column-grey-empty"></div>
    <AdvertisePayment/>
  </div>
</template>

<script>
import AdvertisePayment from '~/components/AdvertisePayment.vue'
export default {
  data() {
    return {
      advertise: [
        { title: 'Advertise property', price: '00', value: '(FREE)' },
        { title: 'Advertise property', price: 20, value: '(PAID)' },
        { title: 'Banner Ads', price: 45000 },
        { title: 'Partnered Brands', price: 5000 }
      ],
      subActive: 0
    }
  },
  components: {
    AdvertisePayment
  }
}
</script>

<style>
@import '~/static/mobile.css';

</style>
