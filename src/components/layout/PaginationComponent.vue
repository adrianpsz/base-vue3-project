<template>
  <nav>
    <ul v-if="!isOnePage" class="pagination">
      <li
        v-for="(link, index) in paginationLinks"
        :key="index"
        :aria-disabled="link.ariaDisabled"
        :aria-label="link.ariaLabel"
        :aria-current="link.ariaCurrent"
        class="page-item"
        :class="link.pageItemClass"
      >
        <span
          v-show="link.ariaDisabled"
          aria-hidden="true"
          class="page-link"
          v-html="link.label"
        ></span>
        <span v-show="link.active" class="page-link" v-html="link.label">
        </span>
        <a
          v-show="!link.active && !link.ariaDisabled"
          href="#"
          class="page-link"
          @click.prevent="loadData(link.url)"
          v-html="link.label"
        ></a>
      </li>
      <li class="spinner">
        <font-awesome-icon v-show="isLoading" icon="fa-solid fa-spinner" spin />
      </li>
    </ul>
    <div v-else class="text-center">
      <div class="out-spinner">
        <font-awesome-icon v-show="isLoading" icon="fa-solid fa-spinner" spin />
      </div>
    </div>
  </nav>
</template>
<script>
import axios from "axios";

export default {
  name: "PaginationComponent",
  emits: ["onData", "onUrlChange"],
  props: {
    lastUrl: {
      type: String,
      default: "",
    },
    url: String,
    query: {
      type: Object,
      default: () => {},
    },
  },
  async mounted() {
    await this.loadData(this.listUrl);
  },
  data() {
    return {
      isLoading: false,
      data: {},
      links: {},
      meta: {},
      metaLinks: [],
      urlQuery: this.query,
    };
  },
  computed: {
    listUrl() {
      return this.lastUrl.length === 0 ? this.url : this.lastUrl;
    },
    paginationLinks() {
      return this.metaLinks.map((link) => {
        const isNull = link.url === null;
        return {
          url: link.url,
          label: link.label,
          active: link.active,
          ariaDisabled: isNull,
          ariaLabel: isNull ? link.label : null,
          ariaCurrent: link.active ? "page" : null,
          pageItemClass: [
            isNull ? "disabled" : "",
            link.active ? "active" : "",
          ],
        };
      });
    },
    isOnePage() {
      return this.meta && this.meta.total <= this.meta.per_page;
    },
  },
  methods: {
    async loadData(url) {
      this.isLoading = true;

      try {
        const response = await axios.get(url);
        this.data = response.data.data;
        this.links = response.data.links;
        this.meta = response.data.meta;
        this.metaLinks = response.data.meta.links;
        if (this.data.length === 0 && this.links.prev != null) {
          await this.loadData(this.links.prev);
          return;
        }
        this.$emit("onData", this.data);
        this.$emit("onUrlChange", url);
      } catch (e) {
        this.$store.dispatch("app/setErrorMessage", e.message);
      }
      this.isLoading = false;
    },
  },
};
</script>
