import HomeLayoutView from "@/views/home/HomeLayoutView";
import store from "@/store";
import AdminView from "@/views/home/admin/AdminView";
import UsersView from "@/views/home/admin/UsersView";
import NewsView from "@/views/home/admin/NewsView";

export default [
  {
    path: "/admin",
    component: HomeLayoutView,
    beforeEnter: (to) => {
      const isAuthenticated = store.getters["user/isAuthenticated"];
      const isAdmin = store.getters["user/isAdmin"];

      if (!isAuthenticated && to.name !== "login") {
        return { name: "login" };
      }

      if (!isAdmin) return { name: "home" };
    },
    children: [
      {
        path: "/",
        name: "admin",
        component: AdminView,
      },
      {
        path: "/admin/users",
        name: "admin.users",
        component: UsersView,
      },
      {
        path: "/admin/news",
        name: "admin.news",
        component: NewsView,
      },
    ],
  },
];
