import IndexView from "@/views/pages/IndexView";
import PrivacyView from "@/views/pages/PrivacyView";
import TermsView from "@/views/pages/TermsView";
import NotFoundView from "@/views/pages/NotFoundView";
import ContactView from "@/views/pages/ContactView";

export default [
  {
    path: "/",
    name: "index",
    component: IndexView,
  },
  {
    path: "/privacy",
    name: "privacy",
    component: PrivacyView,
  },
  {
    path: "/terms",
    name: "terms",
    component: TermsView,
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: NotFoundView,
  },
];
