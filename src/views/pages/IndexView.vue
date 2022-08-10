<template>
  <div>
    <div id="page-hero">
      <div class="container">
        <div class="rol">
          <div class="col-12">
            <img
              class="img-fluid"
              :srcset="`${heroes.small}  600w,
                ${heroes.big}  1600w`"
              sizes="(max-width: 600px) 600px, 1600px"
              :src="heroes.big"
              alt="hero"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="container py-5">
      <div class="col-12">
        <h2>{{ $t("Last news") }}</h2>
        <hr />
      </div>
      <div class="row">
        <div
          v-for="(n, index) in news"
          :key="index"
          class="col-12 col-md-6 mb-3"
        >
          <NewsComponent :image-url="imageUrl" :news="n" />
        </div>
      </div>
      <div class="row">
        <div class="col-12 pagination-wrapper text-center">
          <pagination-component :url="newsUrl" @onData="news = $event" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateAppMeta } from "@/utils/app";
import PaginationComponent from "@/components/layout/PaginationComponent";
import { URLS } from "@/consts";
import NewsComponent from "@/components/pages/NewsComponent";

export default {
  name: "IndexView",
  components: { NewsComponent, PaginationComponent },
  setup() {
    const heroes = {
      big: require("@/assets/images/hero-1600w.png"),
      small: require("@/assets/images/hero-600w.png"),
    };

    return {
      heroes,
      newsUrl: URLS.ACTIVE_NEWS,
      imageUrl: URLS.IMAGE,
    };
  },
  created() {
    updateAppMeta({
      title: this.$t("Homepage"),
    });
  },
  data() {
    return {
      news: [],
    };
  },
};
</script>
