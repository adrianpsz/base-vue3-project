<template>
  <h3>{{ $t("Change password") }}</h3>
  <form @submit.prevent="formSubmit()">
    <div class="row mb-3">
      <label for="current-password" class="col-md-4 col-form-label text-md-end"
        >{{ $t("Current password") }}
      </label>

      <div class="col-md-6">
        <input
          id="current-password"
          type="password"
          class="form-control"
          :class="[form.hasError('current-password') ? 'is-invalid' : '']"
          name="current-password"
          v-model="form.getField('current-password').value"
          required
          autocomplete="off"
          :disabled="isLoading"
          v-autofocus
        />

        <span
          v-if="form.hasError('current-password')"
          class="invalid-feedback"
          role="alert"
        >
          <strong>{{ form.getError("current-password") }}</strong>
        </span>
      </div>
    </div>

    <div class="row mb-3">
      <label for="new-password" class="col-md-4 col-form-label text-md-end"
        >{{ $t("New password") }}
      </label>

      <div class="col-md-6">
        <input
          id="new-password"
          type="password"
          class="form-control"
          :class="[form.hasError('new-password') ? 'is-invalid' : '']"
          name="new-password"
          v-model="form.getField('new-password').value"
          required
          autocomplete="off"
          :disabled="isLoading"
        />

        <span
          v-if="form.hasError('new-password')"
          class="invalid-feedback"
          role="alert"
        >
          <strong>{{ form.getError("new-password") }}</strong>
        </span>
      </div>
    </div>

    <div class="row mb-3">
      <label
        for="new-password-confirm"
        class="col-md-4 col-form-label text-md-end"
        >{{ $t("Confirm new password") }}
      </label>

      <div class="col-md-6">
        <input
          id="new-password-confirm"
          type="password"
          class="form-control"
          :class="[
            form.hasError('new-password_confirmation') ? 'is-invalid' : '',
          ]"
          name="new-password_confirmation"
          v-model="form.getField('new-password_confirmation').value"
          required
          autocomplete="off"
          :disabled="isLoading"
        />

        <span
          v-if="form.hasError('new-password_confirmation')"
          class="invalid-feedback"
          role="alert"
        >
          <strong>{{ form.getError("new-password_confirmation") }}</strong>
        </span>
      </div>
    </div>

    <div class="row mb-0">
      <div class="col-md-8 offset-md-4">
        <button type="submit" class="btn btn-primary" :disabled="isLoading">
          {{ $t("Change password") }}
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
</template>

<script>
import Form from "@/utils/form";
import { updateAppMeta } from "@/utils/app";

export default {
  name: "ChangePasswordView",
  created() {
    updateAppMeta({
      title: this.$t("Change password"),
    });
  },
  data() {
    return {
      isLoading: false,
      form: Form.create(this.$t)
        .addPasswordField("current-password", "")
        .addPasswordField("new-password", "")
        .addPasswordField("new-password_confirmation", ""),
    };
  },
  methods: {
    async formSubmit() {
      if (this.form.isValid()) {
        this.isLoading = true;
        try {
          await this.$store.dispatch(
            "user/changePassword",
            this.form.getData()
          );
          Object.assign(this.$data, this.$options.data.call(this));
        } catch (e) {
          this.form.responseErrors(e.response);
        }
        this.isLoading = false;
      }
    },
  },
};
</script>
