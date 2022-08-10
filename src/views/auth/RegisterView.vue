<template>
  <div class="container mb-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">{{ $t("Register") }}</div>

          <div class="card-body">
            <form @submit.prevent="formSubmit()">
              <div class="row mb-3">
                <label for="name" class="col-md-4 col-form-label text-md-end"
                  >{{ $t("Name") }}
                </label>

                <div class="col-md-6">
                  <input
                    id="name"
                    type="text"
                    class="form-control"
                    :class="[form.hasError('name') ? 'is-invalid' : '']"
                    name="name"
                    v-model="form.getField('name').value"
                    required
                    autocomplete="off"
                    :disabled="isLoading"
                    v-autofocus
                  />

                  <span
                    v-if="form.hasError('name') > 0"
                    class="invalid-feedback"
                    role="alert"
                  >
                    <strong>{{ form.getError("name") }}</strong>
                  </span>
                </div>
              </div>

              <div class="row mb-3">
                <label for="email" class="col-md-4 col-form-label text-md-end"
                  >{{ $t("Email Address") }}
                </label>

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    :class="[form.hasError('email') ? 'is-invalid' : '']"
                    name="email"
                    v-model="form.getField('email').value"
                    required
                    autocomplete="off"
                    :disabled="isLoading"
                  />

                  <span
                    v-if="form.hasError('email')"
                    class="invalid-feedback"
                    role="alert"
                  >
                    <strong>{{ form.getError("email") }}</strong>
                  </span>
                </div>
              </div>

              <div class="row mb-3">
                <label
                  for="password"
                  class="col-md-4 col-form-label text-md-end"
                  >{{ $t("Password") }}
                </label>

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    :class="[form.hasError('password') ? 'is-invalid' : '']"
                    name="password"
                    v-model="form.getField('password').value"
                    required
                    autocomplete="off"
                    :disabled="isLoading"
                  />

                  <span
                    v-if="form.hasError('password')"
                    class="invalid-feedback"
                    role="alert"
                  >
                    <strong>{{ form.getError("password") }}</strong>
                  </span>
                </div>
              </div>

              <div class="row mb-3">
                <label
                  for="password-confirm"
                  class="col-md-4 col-form-label text-md-end"
                  >{{ $t("Confirm Password") }}
                </label>

                <div class="col-md-6">
                  <input
                    id="password-confirm"
                    type="password"
                    class="form-control"
                    :class="[
                      form.hasError('password_confirmation')
                        ? 'is-invalid'
                        : '',
                    ]"
                    name="password_confirmation"
                    v-model="form.getField('password_confirmation').value"
                    required
                    autocomplete="off"
                    :disabled="isLoading"
                  />

                  <span
                    v-if="form.hasError('password_confirmation')"
                    class="invalid-feedback"
                    role="alert"
                  >
                    <strong>{{
                      form.getError("password_confirmation")
                    }}</strong>
                  </span>
                </div>
              </div>

              <div class="row mb-3">
                <label
                  for="accept-terms"
                  class="col-md-4 form-check-label text-md-end"
                >
                  {{ $t("Agree with the") }}
                  <router-link :to="{ name: 'terms' }" class="fw-bold">
                    {{ $t("terms") }}
                  </router-link>
                </label>

                <div class="col-md-6">
                  <input
                    id="accept-terms"
                    class="form-check-input"
                    :class="[form.hasError('terms') ? 'is-invalid' : '']"
                    type="checkbox"
                    name="terms"
                    value="1"
                    required
                    :checked="form.getField('terms').value"
                    @change="
                      form.getField('terms').value =
                        !form.getField('terms').value
                    "
                  />

                  <span
                    v-if="form.hasError('terms')"
                    class="d-inline invalid-feedback"
                    role="alert"
                  >
                    <strong>&nbsp; {{ form.getError("terms") }}</strong>
                  </span>
                </div>
              </div>

              <div class="row mb-0">
                <div class="col-md-6 offset-md-4">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="isLoading"
                  >
                    {{ $t("Register") }}
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Form from "@/utils/form";
import { updateAppMeta } from "@/utils/app";

export default {
  name: "RegisterView",
  created() {
    updateAppMeta({
      title: this.$t("Register"),
    });
  },
  data() {
    return {
      isLoading: false,
      form: Form.create(this.$t)
        .addTextField("name", "")
        .addEmailField("email", "")
        .addPasswordField("password", "")
        .addPasswordField("password_confirmation", "")
        .addCheckboxField("terms", false),
    };
  },
  methods: {
    async formSubmit() {
      if (this.form.isValid()) {
        this.isLoading = true;
        try {
          await this.$store.dispatch("user/register", this.form.getData());
          Object.assign(this.$data, this.$options.data.call(this));
          await this.$router.push({ name: "home" });
        } catch (e) {
          this.form.responseErrors(e.response);
          this.$store.dispatch("clearApiToken");
        }
        this.isLoading = false;
      }
    },
  },
};
</script>
