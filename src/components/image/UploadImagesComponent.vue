<template>
  <div>
    <div v-for="(image, index) in images" :key="index" class="input-group mb-3">
      <input
        :id="'file' + index"
        type="file"
        class="form-control form-file"
        name="images[]"
      />
      <label class="input-group-text" :for="'file' + index">Upload</label>
    </div>
    <button
      v-show="this.images < this.max"
      @click.prevent="newImage()"
      class="btn btn-outline-info btn-sm"
    >
      <font-awesome-icon icon="fa-solid fa-plus" />
      {{ $t("New image") }}
    </button>
  </div>
</template>
<script>
export default {
  name: "UploadImagesComponent",
  props: {
    max: Number,
  },
  data() {
    return {
      images: 0,
    };
  },
  methods: {
    newImage() {
      if (this.images < this.max) this.images++;
    },
  },
};
</script>
