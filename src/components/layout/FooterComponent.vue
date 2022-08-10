<template>
  <div id="page-footer">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <hr />
          <ul class="list-unstyled list-inline">
            <li class="list-inline-item">
              <router-link :to="{ name: 'index' }">
                {{ $t("Homepage") }}
              </router-link>
            </li>
            <li class="list-inline-item text-black-50">|</li>
            <li class="list-inline-item">
              <router-link :to="{ name: 'privacy' }">
                {{ $t("Privacy Policy") }}
              </router-link>
            </li>
            <li class="list-inline-item text-black-50">|</li>
            <li class="list-inline-item">
              <router-link :to="{ name: 'terms' }">
                {{ $t("Terms") }}
              </router-link>
            </li>
            <li class="list-inline-item text-black-50">|</li>
            <li class="list-inline-item">
              <router-link :to="{ name: 'contact' }">
                {{ $t("Contact") }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <cookie-component />
  </div>
</template>
<script>
import CookieComponent from "@/components/layout/CookieComponent";

export default {
  name: "FooterComponent",
  components: { CookieComponent },
};
</script>
