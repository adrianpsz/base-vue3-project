<template>
  <div>Hi Admin</div>
</template>

<script>
import { updateAppMeta } from "@/utils/app";

export default {
  name: "AdminView",
  created() {
    updateAppMeta({
      title: this.$t("Admin"),
    });
  },
};
</script>
