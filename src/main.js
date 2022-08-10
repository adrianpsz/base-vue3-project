import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
//
// directives
//
import { vBaseDirective } from "@/directives/vBaseDirective";
import { vAutofocus } from "@/directives/vAutofocus";
//
// style
//
import "bootstrap";
//
// fontawesome
//
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faChevronLeft,
  faChevronRight,
  faPlus,
  faSpinner,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faSpinner,
  faPlus,
  faChevronRight,
  faChevronLeft,
  faCheck,
  faXmark,
  faTrashCan
);
//
// cookies
//
require("./utils/cookies");

//
// axios
//
import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    const token = store.getters["user/apiToken"];
    config.headers["content-type"] = "application/json";
    config.headers["accept"] = "application/json";
    if (token.length > 0) {
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
//
// create an app
//
createApp(App)
  .use(i18n)
  .use(store)
  .use(router)
  // components
  .component("font-awesome-icon", FontAwesomeIcon)
  // directives
  .directive("font-size", vBaseDirective)
  .directive("autofocus", vAutofocus)
  // mount
  .mount("#app");
