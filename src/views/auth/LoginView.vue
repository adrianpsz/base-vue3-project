<template>
  <div class="container mb-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">{{ $t("Login") }}</div>

          <div class="card-body">
            <form id="login-form" @submit.prevent="formSubmit">
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
                    v-autofocus
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

              <div class="row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="isLoading"
                  >
                    {{ $t("Login") }}
                    <font-awesome-icon
                      v-if="isLoading"
                      icon="fa-solid fa-spinner"
                      spin
                      style="color: white"
                    />
                  </button>

                  <router-link
                    :to="{ name: 'forgotYourPassword' }"
                    class="btn btn-link"
                  >
                    {{ $t("Forgot Your Password?") }}
                  </router-link>
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
  name: "LoginView",
  created() {
    updateAppMeta({
      title: this.$t("Login"),
    });
  },
  data() {
    return {
      isLoading: false,
      form: Form.create(this.$t)
        .addEmailField("email", "")
        .addPasswordField("password", ""),
    };
  },
  methods: {
    async formSubmit() {
      if (this.form.isValid()) {
        this.isLoading = true;
        try {
          await this.$store.dispatch("user/login", this.form.getData());
          Object.assign(this.$data, this.$options.data.call(this));
          await this.$router.push({ name: "home" });
        } catch (e) {
          this.form.responseErrors(e.response);
          this.$store.dispatch("user/clearApiToken");
        }
        this.isLoading = false;
      }
    },
  },
};
</script>
