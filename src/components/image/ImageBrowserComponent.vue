<template>
  <div>
    <div v-if="images.length > 0" class="image-browser">
      <img class="img-fluid" :src="currentImageSrc" :alt="currentImageAlt" />
      <div
        v-if="showPrevButton"
        @click.prevent="prevImage()"
        class="ib-button ib-button-prev"
      >
        <font-awesome-icon icon="fa-solid fa-chevron-left" class="text-white" />
      </div>
      <div
        v-if="showNextButton"
        @click.prevent="nextImage()"
        class="ib-button ib-button-next"
      >
        <font-awesome-icon
          icon="fa-solid fa-chevron-right"
          class="text-white"
        />
      </div>
    </div>
    <div v-else>
      {{ $t("No images") }}
    </div>
  </div>
</template>
<script>
export default {
  name: "ImageBrowserComponent",
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    url: String,
  },
  data() {
    return {
      currenIndex: 0,
    };
  },
  computed: {
    currentImageAlt() {
      return this.images[this.currenIndex].filename;
    },
    currentImageSrc() {
      if (this.currenIndex < this.images.length)
        return this.url + "/" + this.images[this.currenIndex].filename;
      return "";
    },
    showPrevButton() {
      return this.images.length > 1 && this.currenIndex > 0;
    },
    showNextButton() {
      return (
        this.images.length > 1 && this.currenIndex < this.images.length - 1
      );
    },
  },
  methods: {
    prevImage() {
      this.currenIndex--;
      if (this.currenIndex < 0) this.currenIndex = 0;
    },
    nextImage() {
      if (this.currenIndex < this.images.length - 1) {
        this.currenIndex++;
      }
    },
  },
};
</script>
