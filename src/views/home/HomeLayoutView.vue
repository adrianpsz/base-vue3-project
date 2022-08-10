<template>
  <div class="container mb-5">
    <div class="row">
      <div class="col-12 col-md-4 col-xl-2">
        <ul class="list-unstyled home-menu-list">
          <li>
            <router-link :to="{ name: 'home' }">
              {{ $t("Home") }}
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'home.changePassword' }">
              {{ $t("Change password") }}
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'home.news' }">
              {{ $t("Last news") }}
            </router-link>
          </li>
        </ul>
        <div v-show="isAdmin" class="mb-5">
          <h4 class="mt-5">{{ $t("Admin panel") }}</h4>
          <ul class="list-unstyled home-menu-list">
            <li>
              <router-link :to="{ name: 'admin' }">
                {{ $t("Admin") }}
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'admin.users' }">
                {{ $t("Users") }}
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'admin.news' }">
                {{ $t("Last news") }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div
        id="home-content"
        class="col-12 col-md-8 col-xl-10 border-start border-2"
      >
        <div class="row">
          <div class="col-12">
            <h2>
              {{ $t("Dashboard") }},
              <small
                >{{ $t("Hello") }} <strong>{{ username }}</strong> ({{
                  $t("Roles")
                }}: {{ userRoles }})</small
              >
            </h2>
            <hr />
          </div>
        </div>
        <router-view v-slot="{ Component, route }">
          <Transition name="route" mode="out-in">
            <div :key="route.name">
              <component :is="Component"></component>
            </div>
          </Transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HomeLayoutView",
  computed: {
    ...mapGetters("user", ["user", "isAdmin"]),
    username() {
      return this.user.name;
    },
    userRoles() {
      if (Object.prototype.hasOwnProperty.call(this.user, "roles"))
        return this.user.roles.map((v) => v.name).join(", ");
      return "";
    },
  },
};
</script>
<style lang="scss">
.route-enter-from {
  opacity: 0;
  //transform: translateY(100px);
}

.route-enter-active {
  transition: all 0.3s ease-in;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(200px);
}

.route-leave-active {
  transition: all 0.3s ease-out;
}
</style>
