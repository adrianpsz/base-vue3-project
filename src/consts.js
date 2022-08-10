const WEB_URL = process.env.VUE_APP_WEB_URL;
const API_URL = WEB_URL + "/api";

export const APP = {
  title: "Vue3 App",
  description: "Base app description",
  keywords: "vue3",
  deviceName: "vue-app",
  maxImages: 5,
};

export const ROLES = {
  user: 1,
  admin: 2,
};

export const URLS = {
  CONTACT_URL: API_URL + "",
  // Auth
  LOGIN_URL: API_URL + "/auth/login",
  LOGOUT_URL: API_URL + "/auth/logout",
  REGISTER_URL: API_URL + "/auth/register",
  FORGOT_YOUR_PASSWORD_URL: API_URL + "/auth/forgot-your-password",
  RESET_PASSWORD_URL: API_URL + "/auth/reset-password",
  // User
  USER_SHOW: API_URL + "/home/users/show",
  USER_CHANGE_PASSWORD_URL: API_URL + "/home/users/change-password",
  USER_NEWS: API_URL + "/home/news",
  USER_REMOVE_NEWS: API_URL + "/home/news",
  USER_CREATE_NEWS: API_URL + "/home/news",
  USER_UPDATE_NEWS: API_URL + "/home/news",
  USER_SHOW_NEWS: API_URL + "/home/news",
  // Admin
  ADMIN_USERS: API_URL + "/admin/users",
  ADMIN_NEWS: API_URL + "/admin/news",
  ADMIN_TOGGLE_NEWS: API_URL + "/admin/news/active",
  // Active News
  ACTIVE_NEWS: API_URL + "/news",
  // Images
  IMAGE: WEB_URL + "/image",
  IMAGE_DELETE: API_URL + "/home/images",
  IMAGE_REORDER: API_URL + "/home/images/reorder",
};
