import HomeLayoutView from "@/views/home/HomeLayoutView";
import ChangePasswordView from "@/views/home/home/ChangePasswordView";
import HomeView from "@/views/home/home/HomeView";
import store from "@/store";
import news from "@/router/home/news";

export default [
  {
    path: "/home",
    component: HomeLayoutView,
    beforeEnter: (to) => {
      const isAuthenticated = store.getters["user/isAuthenticated"];

      if (!isAuthenticated && to.name !== "login") {
        return { name: "login" };
      }
    },
    children: [
      {
        path: "/",
        name: "home",
        component: HomeView,
      },
      {
        path: "/home/change-password",
        name: "home.changePassword",
        component: ChangePasswordView,
      },
      ...news,
    ],
  },
];
