<template>
  
</template>

<script>
export default {
fetch ({ redirect }) {
    return redirect('/')
  },

  head() {
    return {
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
    
        { hid: 'SeePropertyPage', name: 'SeePropertyPage', content:  'this.post.description' },
        { hid: 'og-title', property: 'og:title', content:  'Find apartments for rent and  houses for sale in Nigeria - 2Dots Properties'},
        { title: 'Find apartments for rent and  houses for sale in Nigeria - 2Dots Properties'},
        { hid: 'site_name', property: 'og:site_name', content: 'this.post.description' },
        { hid: 'url', property: 'og:url', content: 'https://2dotsproperties.com' },
        { hid: 'image', property: 'og:image', content: 'https://2dots.ams3.digitaloceanspaces.com/FB-Cover.jpg' },
        { hid: 'description', property: 'og:description', content: 'this.post.description' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '2Dots Properties' },
        { name: 'twitter:title', content: 'Find apartments for rent and  houses for sale in Nigeria - 2Dots Properties' },
        { name: 'twitter:description', content: 'this.post.description' },
        { name: 'twitter:image', content: 'https://2dots.ams3.digitaloceanspaces.com/FB-Cover.jpg' },
        { name: 'twitter:image:alt', content: 'https://2dots.ams3.digitaloceanspaces.com/FB-Cover.jpg' }
      ]
    }
  }
}
</script>

<style>

</style>
