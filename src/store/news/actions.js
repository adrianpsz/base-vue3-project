import axios from "axios";
import { URLS } from "@/consts";

export default {
  async removeNews({ dispatch }, id) {
    try {
      const response = await axios.delete(URLS.USER_REMOVE_NEWS + "/" + id);
      dispatch("app/setSuccessMessage", response.data.message, { root: true });
      return true;
    } catch (e) {
      dispatch("app/setErrorMessage", e.response.data.message, { root: true });
    }
    return false;
  },
  async createNews({ dispatch }, data) {
    const response = await axios.post(URLS.USER_CREATE_NEWS, data);
    dispatch("app/setSuccessMessage", response.data.message, { root: true });
  },
  async getNews(_, id) {
    const response = await axios.get(URLS.USER_SHOW_NEWS + "/" + id);
    return response.data.data;
  },
  async updateNews({ dispatch }, data) {
    const response = await axios.post(
      URLS.USER_UPDATE_NEWS + "/" + data.id,
      data.data
    );
    dispatch("app/setSuccessMessage", response.data.message, { root: true });
  },
  setLastListUrl({ commit }, url) {
    commit("updateLastListUrl", url);
  },
  setAdminLastListUrl({ commit }, url) {
    commit("updateAdminLastListUrl", url);
  },
  setLastRoute({ commit }, route) {
    commit("updateLastRoute", route);
  },
};
