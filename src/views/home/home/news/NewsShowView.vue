<template>
  <div>
    <news-back-button-component></news-back-button-component>
    <div v-if="!isFetching" class="row">
      <div class="col-12 mb-3">
        <h3>{{ news.title }}</h3>
      </div>
      <div class="col-12 mb-3">
        <image-browser-component
          :url="imageUrl"
          :images="news.images"
        ></image-browser-component>
      </div>
      <div class="col-12 mb-3">{{ news.message }}</div>
    </div>
  </div>
</template>
<script>
import { updateAppMeta } from "@/utils/app";
import { URLS } from "@/consts";
import ImageBrowserComponent from "@/components/image/ImageBrowserComponent";
import NewsBackButtonComponent from "@/views/home/home/news/components/NewsBackButtonComponent";

export default {
  name: "NewsShowView",
  components: { NewsBackButtonComponent, ImageBrowserComponent },
  async created() {
    updateAppMeta({
      title: this.$t("News"),
    });
    await this.fetch();
  },
  setup() {
    return {
      imageUrl: URLS.IMAGE,
    };
  },
  data() {
    return {
      isFetching: true,
      news: null,
    };
  },
  methods: {
    async fetch() {
      try {
        this.news = await this.$store.dispatch(
          "news/getNews",
          this.$route.params.id
        );
        this.isFetching = false;
      } catch (e) {
        console.log(e);
        this.$store.dispatch("app/setErrorMessage", e.response.data.error);
        await this.$router.push({ name: "home.news" });
      }
    },
  },
};
</script>
