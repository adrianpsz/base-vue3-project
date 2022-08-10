<template>
  <div>{{ $t("You are logged in!") }}</div>
</template>

<script>
import { updateAppMeta } from "@/utils/app";

export default {
  name: "HomeView",
  created() {
    updateAppMeta({
      title: this.$t("Home"),
    });
  },
};
</script>
