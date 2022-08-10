<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <p class="fw-bold mb-5 h1">404</p>
        <p>
          <router-link :to="{ name: 'index' }">
            {{ $t("Go to homepage") }}
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { updateAppMeta } from "@/utils/app";

export default {
  name: "NotFoundView",
  created() {
    updateAppMeta({
      title: this.$t("Not found"),
    });
  },
};
</script>
