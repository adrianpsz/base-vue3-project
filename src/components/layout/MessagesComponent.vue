<template>
  <div class="container mt-4 mb-4">
    <div class="row">
      <div class="col-12">
        <div
          v-if="errorMessage.length"
          class="alert alert-danger"
          role="alert"
          v-hide-error-after-seconds="5"
        >
          {{ $t(errorMessage) }}
        </div>
        <div
          v-if="successMessage.length"
          class="alert alert-success"
          role="alert"
          v-hide-success-after-seconds="5"
        >
          {{ $t(successMessage) }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "MessagesComponent",
  computed: {
    ...mapGetters("app", ["successMessage", "errorMessage"]),
  },
  directives: {
    "hide-success-after-seconds": {
      mounted: (el, binding) => {
        setTimeout(() => {
          binding.instance.$store.dispatch("app/setSuccessMessage", "");
        }, parseInt(binding.value) * 1000);
      },
    },
    "hide-error-after-seconds": {
      mounted: (el, binding) => {
        setTimeout(() => {
          binding.instance.$store.dispatch("app/setErrorMessage", "");
        }, parseInt(binding.value) * 1000);
      },
    },
  },
};
</script>
