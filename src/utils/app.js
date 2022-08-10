import { APP } from "@/consts";

export function updateAppMeta(meta) {
  document.title = meta.title + " - " + APP.title;
  document.getElementsByTagName("meta")["description"].content = (
    APP.description +
    " " +
    (meta.description ?? "")
  ).trim();
  document.getElementsByTagName("meta")["keywords"].content = (
    APP.keywords +
    " " +
    (meta.keywords ?? "")
  ).trim();
}
