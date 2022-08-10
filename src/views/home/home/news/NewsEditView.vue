<template>
  <div>
    <div class="row mb-3">
      <div class="col-12">
        <router-link :to="{ name: 'home.news' }" class="btn btn-success">
          <font-awesome-icon
            icon="fa-solid fa-chevron-left"
          ></font-awesome-icon>
          {{ $t("Back") }}
        </router-link>
      </div>
    </div>
    <form
      v-if="!isFetching"
      id="update-news-form"
      @submit.prevent="formSubmit($event)"
    >
      <div class="row mb-3">
        <div class="col-12 col-md-8 offset-md-4">
          <h3>
            {{ news.title }}
            <news-is-active-component
              :is-active="news.active"
            ></news-is-active-component>
          </h3>
        </div>
      </div>

      <input type="hidden" name="_method" value="PUT" />
      <div class="row mb-3">
        <label for="title" class="col-md-4 col-form-label text-md-end"
          >{{ $t("Title") }}
        </label>
        <div class="col-md-6">
          <input
            id="title"
            type="text"
            class="form-control"
            :class="[form.hasError('title') ? 'is-invalid' : '']"
            name="title"
            v-model="form.getField('title').value"
            required
            autocomplete="off"
            :disabled="isLoading"
            v-autofocus
          />

          <span
            v-if="form.hasError('title')"
            class="invalid-feedback"
            role="alert"
          >
            <strong>{{ form.getError("title") }}</strong>
          </span>
        </div>
      </div>
      <div class="row mb-3">
        <label for="message" class="col-md-4 col-form-label text-md-end"
          >{{ $t("Message") }}
        </label>
        <div class="col-md-6">
          <textarea
            id="message"
            type="text"
            class="form-control"
            :class="[form.hasError('message') ? 'is-invalid' : '']"
            name="message"
            v-model="form.getField('message').value"
            required
            autocomplete="off"
            rows="5"
            :disabled="isLoading"
          ></textarea>

          <span
            v-if="form.hasError('message')"
            class="invalid-feedback"
            role="alert"
          >
            <strong>{{ form.getError("message") }}</strong>
          </span>
        </div>
      </div>
      <div class="row mb-3">
        <label for="message" class="col-md-4 col-form-label text-md-end"
          >{{ $t("Images") }}
        </label>
        <div class="col-md-6">
          <update-images-component
            :class="[form.hasError('images') ? 'is-invalid' : '']"
            :max="maxImages - news.images.length"
            :image-url="imageUrl"
            :delete-url="imageDeleteUrl"
            :reorder-url="imageReorderUrl"
            :models="news ? news.images : []"
          ></update-images-component>

          <span
            v-if="form.hasError('images')"
            class="invalid-feedback"
            role="alert"
          >
            <strong>{{ form.getError("images") }}</strong>
          </span>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12 col-md-6 offset-md-4">
          <button type="submit" class="btn btn-success" :disabled="isLoading">
            {{ $t("Update news") }}
            <font-awesome-icon
              v-if="isLoading"
              icon="fa-solid fa-spinner"
              spin
              style="color: white"
            />
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { updateAppMeta } from "@/utils/app";
import { APP, URLS } from "@/consts";
import Form from "@/utils/form";
import UpdateImagesComponent from "@/components/image/UpdateImagesComponent";
import NewsIsActiveComponent from "@/views/home/home/news/components/NewsIsActiveComponent";

export default {
  name: "NewsEditView",
  components: { UpdateImagesComponent, NewsIsActiveComponent },
  async created() {
    updateAppMeta({
      title: this.$t("Edit news"),
    });
    await this.fetch();
  },
  setup() {
    return {
      maxImages: APP.maxImages,
      imageUrl: URLS.IMAGE,
      imageDeleteUrl: URLS.IMAGE_DELETE,
      imageReorderUrl: URLS.IMAGE_REORDER,
    };
  },
  data() {
    return {
      isLoading: false,
      isFetching: true,
      news: null,
      form: Form.create(this.$t)
        .addTextField("title", "")
        .addTextarea("message", "")
        .addEmpty("images"),
    };
  },
  methods: {
    async fetch() {
      try {
        this.news = await this.$store.dispatch(
          "news/getNews",
          this.$route.params.id
        );
        this.form.populate(this.news);
        this.isFetching = false;
      } catch (e) {
        this.$store.dispatch("app/setErrorMessage", e.response.data.error);
        await this.$router.push({ name: "home.news" });
      }
    },
    async formSubmit(event) {
      if (this.form.isValid()) {
        this.isLoading = true;
        try {
          await this.$store.dispatch("news/updateNews", {
            id: this.news.id,
            data: this.form.getFormData(event),
          });
          Object.assign(this.$data, this.$options.data.call(this));
          await this.fetch();
        } catch (e) {
          this.form.responseErrors(e.response);
        }
        this.isLoading = false;
      }
    },
  },
};
</script>
