<template>
  <div class="text-center">
    <div v-if="isActive === 1">
      <font-awesome-icon
        icon="fa-solid fa-check"
        class="text-success"
      ></font-awesome-icon>
      <br />
      <button @click.prevent="toggle()" class="btn btn-danger btn-sm">
        {{ $t("Deactivate") }}
        <font-awesome-icon
          v-if="isLoading"
          icon="fa-solid fa-spinner"
          spin
          style="color: white"
        />
      </button>
    </div>
    <div v-else>
      <font-awesome-icon
        icon="fa-solid fa-xmark"
        class="text-danger"
      ></font-awesome-icon>
      <br />
      <button @click.prevent="toggle()" class="btn btn-success btn-sm">
        {{ $t("Activate") }}
        <font-awesome-icon
          v-if="isLoading"
          icon="fa-solid fa-spinner"
          spin
          style="color: white"
        />
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  props: {
    url: String,
    active: Number,
    id: Number,
  },
  data() {
    return {
      isLoading: false,
      isActive: this.active,
    };
  },
  methods: {
    async toggle() {
      try {
        this.isLoading = true;
        const response = await axios.put(this.url + "/" + this.id, {});
        this.isActive = response.data.active;
      } catch (e) {
        console.log(e);
      }
      this.isLoading = false;
    },
  },
};
</script>
