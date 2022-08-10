<template>
  <div>
    <div class="row mb3">
      <div class="col-12">
        <h3>{{ $t("List of news") }}</h3>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>{{ $t("ID") }}</th>
                <th class="w-15">{{ $t("Images") }}</th>
                <th>{{ $t("Title") }}</th>
                <th class="d-none d-lg-table-cell">{{ $t("Message") }}</th>
                <th>{{ $t("Active") }}</th>
                <th>{{ $t("Actions") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="n in news" :key="n.id">
                <td>{{ n.id }}</td>
                <td>
                  <image-browser-component
                    :url="imageUrl"
                    :images="n.images"
                  ></image-browser-component>
                </td>
                <td>
                  <router-link
                    :to="{ name: 'home.news.show', params: { id: n.id } }"
                    class="fw-bold"
                  >
                    {{ n.title }}
                  </router-link>
                  <br />
                  <small>{{ $t("Author") }}:</small> <br />
                  {{ n.user.name }} ({{ n.user.id }})
                </td>
                <td class="d-none d-lg-table-cell" v-html="n.message"></td>
                <td>
                  <toggle-news-activation-component
                    :active="n.active"
                    :url="activeUrl"
                    :id="n.id"
                  ></toggle-news-activation-component>
                </td>
                <td>
                  <router-link
                    :to="{ name: 'home.news.edit', params: { id: n.id } }"
                    class="btn btn-info btn-sm d-block w-100 mb-2"
                  >
                    {{ $t("Update") }}
                  </router-link>
                  <a
                    href="#"
                    class="btn btn-danger btn-sm d-block w-100"
                    @click="remove(n)"
                  >
                    {{ $t("Remove") }}
                    <font-awesome-icon
                      v-if="isLoading"
                      icon="fa-solid fa-spinner"
                      spin
                      style="color: white"
                    />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 pagination-wrapper text-center">
        <pagination-component
          :key="'pagination' + paginationKey"
          :url="newsUrl"
          :last-url="adminLastListUrl"
          :query="query"
          @onData="news = $event"
          @onUrlChange="updateLastUrl($event)"
        ></pagination-component>
      </div>
    </div>
  </div>
</template>
<script>
import PaginationComponent from "@/components/layout/PaginationComponent";
import { updateAppMeta } from "@/utils/app";
import { URLS } from "@/consts";
import ImageBrowserComponent from "@/components/image/ImageBrowserComponent";
import { mapGetters } from "vuex";
import ToggleNewsActivationComponent from "@/components/admin/ToggleNewsActivationComponent";

export default {
  name: "NewsIndexView",
  components: {
    ToggleNewsActivationComponent,
    ImageBrowserComponent,
    PaginationComponent,
  },
  created() {
    updateAppMeta({
      title: this.$t("News"),
    });
    this.$store.dispatch("news/setLastRoute", { name: "admin.news" });
  },
  setup() {
    return {
      newsUrl: URLS.ADMIN_NEWS,
      imageUrl: URLS.IMAGE,
      activeUrl: URLS.ADMIN_TOGGLE_NEWS,
    };
  },
  data() {
    return {
      isLoading: false,
      news: [],
      paginationKey: 0,
      query: {
        sort: "created_at",
      },
    };
  },
  computed: {
    ...mapGetters("news", ["adminLastListUrl"]),
  },
  methods: {
    async remove(news) {
      if (confirm(this.$t("Remove") + ": " + news.title + "?")) {
        this.isLoading = true;
        if (await this.$store.dispatch("news/removeNews", news.id)) {
          this.paginationKey++;
          this.isLoading = false;
        }
      }
    },
    updateLastUrl(url) {
      this.$store.dispatch("news/setAdminLastListUrl", url);
    },
  },
};
</script>
