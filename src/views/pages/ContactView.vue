<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h2>{{ $t("Contact") }}</h2>
        <hr />
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <h3 class="mb-3">{{ $t("About Us") }}</h3>
        <img
          class="img-fluid mb-3"
          src="@/assets/images/about.png"
          alt="{{ $t('About Us')}}"
        />
        <p class="mb-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
          distinctio dolor ducimus facilis fugiat harum necessitatibus nemo
          quibusdam quo repellendus saepe, sed ullam. Cumque facilis fugiat
          itaque ratione ullam voluptatum.
        </p>
        <p class="mb-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
          distinctio dolor ducimus facilis fugiat harum necessitatibus nemo
          quibusdam quo repellendus saepe, sed ullam. Cumque facilis fugiat
          itaque ratione ullam voluptatum.
        </p>
      </div>
      <div class="col-12 col-md-6">
        <ContactFormComponent />
      </div>
    </div>
  </div>
</template>
<script>
import ContactFormComponent from "@/components/contact/ContactFormComponent";
import { updateAppMeta } from "@/utils/app";

export default {
  name: "ContactView",
  created() {
    updateAppMeta({
      title: this.$t("Contact"),
    });
  },
  components: { ContactFormComponent },
};
</script>
