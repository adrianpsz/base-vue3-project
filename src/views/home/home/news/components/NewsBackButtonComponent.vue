<template>
  <div class="row mb-3">
    <div class="col-12">
      <router-link :to="route" class="btn btn-success">
        <font-awesome-icon icon="fa-solid fa-chevron-left"></font-awesome-icon>
        {{ $t("Back") }}
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "NewsBackButtonComponent",
  data() {
    return {
      route: {},
    };
  },
  mounted() {
    this.route = this.$store.getters["news/lastRoute"];
  },
};
</script>
