import { createStore } from "vuex";
import app from "./app";
import user from "./user";
import news from "./news";

export default createStore({
  modules: {
    app: app,
    user: user,
    news: news,
  },
});
