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
    <div class="row mb-3">
      <div class="col-12 col-md-8 offset-md-4">
        <h3>{{ $t("New news") }}</h3>
      </div>
    </div>

    <form
      id="create-news-form"
      @submit.prevent="formSubmit($event)"
      enctype="multipart/form-data"
    >
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
          <upload-images-component
            :max="maxImages"
            :class="[form.hasError('images') ? 'is-invalid' : '']"
          ></upload-images-component>

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
            {{ $t("Add news") }}
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
import Form from "@/utils/form";
import UploadImagesComponent from "@/components/image/UploadImagesComponent";
import { APP } from "@/consts";

export default {
  name: "NewsCreateView",
  components: { UploadImagesComponent },
  created() {
    updateAppMeta({
      title: this.$t("Create news"),
    });
  },
  setup() {
    return {
      maxImages: APP.maxImages,
    };
  },
  data() {
    return {
      isLoading: false,
      form: Form.create(this.$t)
        .addTextField("title", "")
        .addTextarea("message", "")
        .addEmpty("images"),
    };
  },
  methods: {
    async formSubmit(event) {
      if (this.form.isValid()) {
        this.isLoading = true;
        try {
          this.$store.dispatch("news/createNews", this.form.getFormData(event));
          Object.assign(this.$data, this.$options.data.call(this));
          await this.$router.push({ name: "home.news" });
        } catch (e) {
          this.form.responseErrors(e.response);
        }
        this.isLoading = false;
      }
    },
  },
};
</script>
