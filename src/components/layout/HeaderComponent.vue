<template>
  <div id="page-header">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link :to="{ name: 'index' }" class="navbar-brand">
          {{ APP_TITLE }}
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link :to="{ name: 'contact' }" class="nav-link">
                {{ $t("Contact") }}
              </router-link>
            </li>
          </ul>
          <ul v-if="isAuthenticated" class="navbar-nav">
            <li class="nav-item">
              <router-link :to="{ name: 'home' }" class="nav-link">
                {{ $t("Home") }}
              </router-link>
            </li>
            <li class="nav-item">
              <a
                id="logout"
                href="#"
                @click.prevent="logout()"
                class="nav-link"
              >
                {{ $t("Logout") }}
              </a>
            </li>
          </ul>
          <ul v-else class="navbar-nav">
            <li class="nav-item">
              <router-link :to="{ name: 'login' }" class="nav-link">
                {{ $t("Login") }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'register' }" class="nav-link">
                {{ $t("Register") }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";
import { APP, URLS } from "@/consts";

export default {
  name: "HeaderComponent",
  computed: {
    ...mapGetters("user", ["isAuthenticated"]),
  },
  setup() {
    return {
      APP_TITLE: APP.title,
    };
  },
  methods: {
    async logout() {
      await axios.post(URLS.LOGOUT_URL, {});
      this.$store.dispatch("user/clearApiToken");
      await this.$router.push({ name: "index" });
    },
  },
};
</script>
