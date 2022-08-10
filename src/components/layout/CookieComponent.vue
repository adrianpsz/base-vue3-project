<template>
  <div id="cookie-message" class="d-none" ref="cookieMessage">
    <p class="text-center">
      {{ $t("The website uses cookies in order to personalise the website.") }}
      <br />
      <router-link
        :to="{ name: 'privacy' }"
        class="cookie-message-privacy-page small"
      >
        {{ $t("More information") }}
      </router-link>
      &nbsp;|
      <a
        id="accept-cookie-message"
        href="#"
        class="small"
        @click.prevent="closeMessage()"
      >
        {{ $t("Close") }}
      </a>
    </p>
  </div>
</template>
<script>
import Cookies from "@/utils/cookies";

export default {
  name: "CookieComponent",
  data() {
    return {
      cookieName: "cookie-message",
    };
  },
  mounted() {
    if (!Cookies.getCookie(this.cookieName)) {
      this.$refs.cookieMessage.classList.remove("d-none");
    }
  },
  methods: {
    closeMessage() {
      Cookies.setCookie(this.cookieName, 1, 365);
      this.$refs.cookieMessage.classList.add("d-none");
    },
  },
};
</script>
