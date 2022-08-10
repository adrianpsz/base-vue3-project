<template>
  <HeaderComponent />
  <MessagesComponent />
  <main class="mb-5">
    <router-view />
  </main>
  <FooterComponent />
</template>
<script>
import FooterComponent from "@/components/layout/FooterComponent";
import HeaderComponent from "@/components/layout/HeaderComponent";
import MessagesComponent from "@/components/layout/MessagesComponent";

export default {
  name: "App",
  components: { MessagesComponent, HeaderComponent, FooterComponent },
};
</script>

<style lang="scss">
@import "@/scss/app.scss";
</style>
