<template>
  <footer>
    <div class="tds-footer-flex">
      <div>
        <img src="/img/Logo.png" alt="logo" class="tds-footer-logo" />
      </div>
      <ul>
        <li v-for="(link, index) in footerLinks" :key="index">
          <nuxt-link :to="link.url">{{link.title.toUpperCase()}}</nuxt-link>
        </li>
      </ul>
      <div class="tds-rights">© {{currentYear}} All rights Reserved</div>
      <div class="tds-social-icons-holder">
        <span v-for="apps in apps_stores" :key="apps">
          <img :src="apps" class="tds-app-images" />
        </span>
        <span v-for="(icons, index) in social_icons" :key="index">
          <a :href="icons.link">
            <img :src="icons.img" class="tds-social-icons" />
          </a>
        </span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      footerLinks: [
        {
          title: 'about us',
          url: '/about'
        },
        {
          title: 'contact',
          url: '/contact'
        },
        {
          title: 'terms & conditions',
          url: '/terms-and-conditions'
        },
        {
          title: 'faqs',
          url: '/faqs'
        },
        {
          title: 'privacy policy',
          url: '/privacy-policy'
        }
      ],
      social_icons: [
        {
          img: '/img/facebook.png',
          link: 'https://www.facebook.com/2dotsproperties'
        },
        {
          img: '/img/instagram.png',
          link: 'https://www.instagram.com/2dotsproperties_ng/'
        },
        {
          img:'/img/linkedin.png',
          link:'https://www.linkedin.com/company/2dotsproperties'
        },
        { 
          img: '/img/twitter.png', 
          link: 'https://twitter.com/2dotsproperties' 
        }
      ],
      apps_stores: ['/img/app_store.png', '/img/playstore.png']
    }
  },
  computed: {
    currentYear() {
      return this.$store.state.common.fullYear
    }
  }
}
</script>

<style>
footer {
}
.tds-social-icons-holder {
  display: flex;
  justify-content: center;
  align-items: center;
}
.tds-social-icons {
  height: 20px;
  margin: 0 15px;
}
.tds-app-images {
  height: 40px;
  margin: 7px 15px;
}
footer img {
  height: 40px;
}
.tds-footer-logo {
  height: 40px;
}
.tds-footer-flex {
  background: #1c1c1c;
  height: 55px;
  padding: 20px 20px;
  margin-top: 49px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
footer ul {
  display: flex;
  font-size: 12px;
}
footer li a {
  margin: 0 11px;
  color: white;
  font-weight: 500;
}
footer li a:hover {
  opacity: 0.5;
  color: white;
}
.tds-rights {
  font-size: 10px;
}
@media screen and (max-width: 1229px) {
  .tds-footer-flex {
    background: #1c1c1c;
    height: 100%;
    padding: 20px 20px;
    margin-top: 49px;
    text-align: center;
    color: white;
    display: block;
    align-items: center;
    justify-content: space-between;
  }
  footer ul {
    display: block;
    font-size: 12px;
  }
  footer ul li {
    padding: 20px !important;
  }
}
</style>
