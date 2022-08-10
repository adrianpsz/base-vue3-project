import { createI18n } from "vue-i18n";
import translations from "@/locales/en.json";
import $ from "jquery";

export function getI18n() {
  return createI18n({
    legacy: false,
    locale: process.env.VUE_APP_I18N_LOCALE || "en",
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
    messages: { en: translations },
    globalInjection: true,
  });
}

export function t(msg, args) {
  return getI18n().global.t(msg, args);
}

export function jQuery() {
  return $;
}
