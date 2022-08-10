<template>
  <article class="row">
    <div class="col-12 col-xl-6 mb-3">
      <image-browser-component
        :url="imageUrl"
        :images="news.images"
      ></image-browser-component>
    </div>
    <div class="col-12 col-xl-6">
      <header>
        <h2 class="mb-1">{{ news.title }}</h2>
        <p class="meta small mb-1">
          {{ news.user.name }}
          , {{ news.created_at }}
        </p>
      </header>
      <p>{{ news.message }}</p>
    </div>
  </article>
</template>
<script>
import ImageBrowserComponent from "@/components/image/ImageBrowserComponent";

export default {
  name: "NewsComponent",
  components: { ImageBrowserComponent },
  props: {
    imageUrl: String,
    news: Object,
  },
};
</script>
