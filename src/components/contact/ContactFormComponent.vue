<template>
  <section id="contact-form">
    <div class="row">
      <div class="col-12">
        <h3>{{ $t("Send a message") }}</h3>
        <span class="marker line"></span>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p>
          {{
            $t(
              "If you have questions or suggestions please contact me via the following form."
            )
          }}
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div v-show="infoFlag === 1" class="alert alert-success my-2">
          {{ $t("The message has been sent properly.") }}
        </div>
        <div v-show="infoFlag === 2" class="alert alert-danger my-2">
          {{ $t("An error has occurred. Please try again later.") }}
        </div>
      </div>
    </div>
    <form @submit.prevent="submitForm()">
      <div class="row mb-3">
        <div class="col-12">
          <label for="name" class="small">{{ $t("Name and Surname") }}:</label>
          <br />
          <input
            id="name"
            name="name"
            type="text"
            class="form-control"
            :disabled="isLoading"
            v-model="form.getField('name').value"
            :placeholder="$t('Name and Surname')"
            required
          />
          <span v-if="form.hasError('name')" class="small text-danger">
            {{ form.getError("name") }}
          </span>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <label for="email" class="small">{{ $t("Email") }}:</label>
          <br />
          <input
            id="email"
            name="email"
            type="email"
            class="form-control"
            :disabled="isLoading"
            v-model="form.getField('email').value"
            placeholder="email@email.com"
            required
          />
          <span v-if="form.hasError('email')" class="small text-danger">{{
            form.getError("email")
          }}</span>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <label for="subject" class="small">{{ $t("Title") }}:</label>
          <br />
          <input
            id="subject"
            name="subject"
            type="text"
            class="form-control"
            :disabled="isLoading"
            v-model="form.getField('subject').value"
            :placeholder="$t('Title')"
            required
          />
          <span v-if="form.hasError('subject')" class="small text-danger">{{
            form.getError("subject")
          }}</span>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <label for="message" class="small">{{ $t("Message") }}:</label>
          <br />
          <textarea
            id="message"
            name="message"
            class="form-control"
            :disabled="isLoading"
            v-model="form.getField('message').value"
            :placeholder="$t('Message')"
            required
          ></textarea>
          <span v-if="form.hasError('message')" class="small text-danger">{{
            form.getError("message")
          }}</span>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <label for="message" class="small"
            >{{ $t("Write the correct sum") }}:
          </label>
          <br />
          <input
            class="ncaptcha form-control"
            type="text"
            name="captcha1"
            v-model="form.getField('captcha1').value"
            disabled
          />
          +
          <input
            class="ncaptcha form-control"
            name="captcha2"
            type="text"
            v-model="form.getField('captcha2').value"
            disabled
          />
          =
          <input
            class="ncaptcha form-control"
            type="number"
            name="captchaScore"
            step="1"
            min="0"
            v-model="form.getField('captchaScore').value"
          />
          <br />
          <span v-if="form.hasError('captchaScore')" class="small text-danger">
            {{ form.getError("captchaScore") }}</span
          >
          <input type="hidden" v-model="form.getField('href').value" />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <button
            class="btn btn-primary w-100 mt-3"
            type="submit"
            :disabled="isLoading"
          >
            {{ $t("Send a message") }}
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
  </section>
</template>
<script>
import axios from "axios";
import { URLS } from "@/consts";
import Form from "@/utils/form";

export default {
  name: "ContactFormComponent",
  data() {
    return {
      isLoading: false,
      infoFlag: 0,
      form: Form.create(this.$t)
        .addTextField("name", "")
        .addEmailField("email", "")
        .addTextField("subject", "")
        .addTextField("message", "")
        .addNumberField("captcha1", Math.floor(Math.random() * 10))
        .addNumberField("captcha2", Math.floor(Math.random() * 10))
        .addNumberField("captchaScore", "", (value) => {
          if (
            parseInt(this.form.getField("captcha1").value) +
              parseInt(this.form.getField("captcha2").value) ===
            parseInt(value)
          ) {
            return "";
          }
          return this.$t("The sum is not correct");
        })
        .addTextField("href", window.location.href),
    };
  },
  methods: {
    async submitForm() {
      if (this.form.isValid()) {
        this.isLoading = true;
        this.infoFlag = 0;
        try {
          await axios.post(URLS.CONTACT_URL, this.form.getData());
          this.resetFormWithSuccess();
        } catch (e) {
          this.resetFormWithError();
        }
      }
    },
    resetFormWithSuccess() {
      this.infoFlag = 1;
      this.resetForm();
    },
    resetFormWithError() {
      this.infoFlag = 2;
      this.resetForm();
    },
    resetForm() {
      this.isLoading = false;
      this.form.getField("captcha1").value = Math.floor(Math.random() * 10);
      this.form.getField("captcha2").value = Math.floor(Math.random() * 10);
      this.form.getField("captchaScore").value = "";
    },
  },
};
</script>
