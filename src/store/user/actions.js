import axios from "axios";
import { APP, URLS } from "@/consts";

export default {
  clearApiToken({ commit }) {
    commit("updateApiToken", "");
    commit("updateUser", {});
  },
  async login({ commit, dispatch }, data) {
    data.device_name = APP.deviceName;
    const response = await axios.post(URLS.LOGIN_URL, data);
    commit("updateApiToken", response.data);
    await dispatch("setUserData");
  },
  async register({ commit, dispatch }, data) {
    data.device_name = APP.deviceName;
    const response = await axios.post(URLS.REGISTER_URL, data);
    commit("updateApiToken", response.data);
    await dispatch("setUserData");
  },
  async setUserData({ commit }) {
    const response = await axios.post(URLS.USER_SHOW, {});
    commit("updateUser", response.data.data);
  },
  async forgotYourPassword({ dispatch }, data) {
    data.device_name = APP.deviceName;
    const location = window.location;
    data.url = location.protocol + "//" + location.hostname + "/reset-password";
    const response = await axios.post(URLS.FORGOT_YOUR_PASSWORD_URL, data);
    dispatch("app/setSuccessMessage", response.data.message, { root: true });
  },
  async resetPassword({ dispatch }, data) {
    data.device_name = APP.deviceName;
    const response = await axios.post(URLS.RESET_PASSWORD_URL, data);
    dispatch("app/setSuccessMessage", response.data.message, { root: true });
  },
  async changePassword({ dispatch }, data) {
    data.device_name = APP.deviceName;
    const response = await axios.post(URLS.USER_CHANGE_PASSWORD_URL, data);
    dispatch("app/setSuccessMessage", response.data.message, { root: true });
  },
};
