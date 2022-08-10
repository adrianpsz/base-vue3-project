import NewsIndexView from "@/views/home/home/news/NewsIndexView";
import NewsCreateView from "@/views/home/home/news/NewsCreateView";
import NewsEditView from "@/views/home/home/news/NewsEditView";
import NewsShowView from "@/views/home/home/news/NewsShowView";

export default [
  {
    path: "/home/news",
    name: "home.news",
    component: NewsIndexView,
  },
  {
    path: "/home/news-create",
    name: "home.news.create",
    component: NewsCreateView,
  },
  {
    path: "/home/news-edit/:id",
    name: "home.news.edit",
    component: NewsEditView,
  },
  {
    path: "/home/news-show/:id",
    name: "home.news.show",
    component: NewsShowView,
  },
];
