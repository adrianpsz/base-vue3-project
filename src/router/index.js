import { createRouter, createWebHistory } from "vue-router";
import pages from "@/router/pages";
import home from "@/router/home/home";
import auth from "@/router/auth";
import admin from "@/router/admin";

const routes = [...pages, ...auth, ...home, ...admin];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  strict: true,
});
export default router;
