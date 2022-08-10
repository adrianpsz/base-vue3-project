<template>
  <span>
    <font-awesome-icon
      v-if="isActive"
      icon="fa-solid fa-check"
      class="text-success"
    />
    <font-awesome-icon v-else icon="fa-solid fa-xmark" class="text-danger" />
  </span>
</template>
<script>
export default {
  name: "NewsIsActiveComponent",
  props: {
    isActive: {
      type: Number,
      default: 0,
    },
  },
};
</script>
