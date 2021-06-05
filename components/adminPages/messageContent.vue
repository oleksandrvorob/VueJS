<template>
  <div class="edit-user-modal tds-message-component">
    <span class="close-btn-holder">
      <button type="button" class="modal-admin" @click="closeModal" style="cursor:pointer">×</button>
    </span>
    <div class="tds-dashboard-profile">
      <p> <b>Name: </b> {{messagecontent.name}}</p>
      <p> <b>Phone No: </b> <a :href="'tel:' + messagecontent.phone" > {{messagecontent.phone}} </a> </p>
      <p>
          <b> Email : </b> <a target="_blank" :href="'mailto:'+ messagecontent.email">{{messagecontent.email}}</a>
      </p>
      <div> <b>Body: </b>{{messagecontent.body}} </div>
      <p class="date">
        <b>Date :</b> {{messagecontent.created_at}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['messagecontent'],
  methods: {
    closeModal() {
      this.$store.commit('admin/OpenMessage', false)
    }
  }
}
</script>

<style>
.tds-message-component .tds-dashboard-profile {
  padding: 30px !important;
  max-height: 75vh;
  overflow: auto;
}
.edit-user-modal .date {
  margin-top: 55px;
}
.tds-dashboard-profile {
  overflow: hidden;
}
.tds-message-component {
}
</style>
