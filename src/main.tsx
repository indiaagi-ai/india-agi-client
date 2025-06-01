import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";

import home_en from "@/locales/en/home.json";
import home_hi from "@/locales/hi/home.json";
import home_bn from "@/locales/bn/home.json";
import home_te from "@/locales/te/home.json";
import home_mr from "@/locales/mr/home.json";
import home_ta from "@/locales/ta/home.json";
import home_gu from "@/locales/gu/home.json";
import home_kn from "@/locales/kn/home.json";
import home_ml from "@/locales/ml/home.json";
import home_ar from "@/locales/ar/home.json";
import home_cmn from "@/locales/cmn/home.json";
import home_ja from "@/locales/ja/home.json";

import collaborate_en from "@/locales/en/collaborate.json";
import collaborate_hi from "@/locales/hi/collaborate.json";
import collaborate_bn from "@/locales/bn/collaborate.json";
import collaborate_te from "@/locales/te/collaborate.json";
import collaborate_mr from "@/locales/mr/collaborate.json";
import collaborate_ta from "@/locales/ta/collaborate.json";
import collaborate_gu from "@/locales/gu/collaborate.json";
import collaborate_kn from "@/locales/kn/collaborate.json";
import collaborate_ml from "@/locales/ml/collaborate.json";
import collaborate_ar from "@/locales/ar/collaborate.json";
import collaborate_cmn from "@/locales/cmn/collaborate.json";
import collaborate_ja from "@/locales/ja/collaborate.json";

import header_en from "@/locales/en/header.json";
import header_hi from "@/locales/hi/header.json";
import header_bn from "@/locales/bn/header.json";
import header_te from "@/locales/te/header.json";
import header_mr from "@/locales/mr/header.json";
import header_ta from "@/locales/ta/header.json";
import header_gu from "@/locales/gu/header.json";
import header_kn from "@/locales/kn/header.json";
import header_ml from "@/locales/ml/header.json";
import header_ar from "@/locales/ar/header.json";
import header_cmn from "@/locales/cmn/header.json";
import header_ja from "@/locales/ja/header.json";

import search_en from "@/locales/en/search.json";
import search_hi from "@/locales/hi/search.json";
import search_bn from "@/locales/bn/search.json";
import search_te from "@/locales/te/search.json";
import search_mr from "@/locales/mr/search.json";
import search_ta from "@/locales/ta/search.json";
import search_gu from "@/locales/gu/search.json";
import search_kn from "@/locales/kn/search.json";
import search_ml from "@/locales/ml/search.json";
import search_ar from "@/locales/ar/search.json";
import search_cmn from "@/locales/cmn/search.json";
import search_ja from "@/locales/ja/search.json";

import card_en from "@/locales/en/card.json";
import card_hi from "@/locales/hi/card.json";
import card_bn from "@/locales/bn/card.json";
import card_te from "@/locales/te/card.json";
import card_mr from "@/locales/mr/card.json";
import card_ta from "@/locales/ta/card.json";
import card_gu from "@/locales/gu/card.json";
import card_kn from "@/locales/kn/card.json";
import card_ml from "@/locales/ml/card.json";
import card_ar from "@/locales/ar/card.json";
import card_cmn from "@/locales/cmn/card.json";
import card_ja from "@/locales/ja/card.json";

import footer_en from "@/locales/en/footer.json";
import footer_hi from "@/locales/hi/footer.json";
import footer_bn from "@/locales/bn/footer.json";
import footer_te from "@/locales/te/footer.json";
import footer_mr from "@/locales/mr/footer.json";
import footer_ta from "@/locales/ta/footer.json";
import footer_gu from "@/locales/gu/footer.json";
import footer_kn from "@/locales/kn/footer.json";
import footer_ml from "@/locales/ml/footer.json";
import footer_ar from "@/locales/ar/footer.json";
import footer_cmn from "@/locales/cmn/footer.json";
import footer_ja from "@/locales/ja/footer.json";

import home_ms from "@/locales/ms/home.json";
import collaborate_ms from "@/locales/ms/collaborate.json";
import header_ms from "@/locales/ms/header.json";
import search_ms from "@/locales/ms/search.json";
import card_ms from "@/locales/ms/card.json";
import footer_ms from "@/locales/ms/footer.json";

import home_de from "@/locales/de/home.json";
import collaborate_de from "@/locales/de/collaborate.json";
import header_de from "@/locales/de/header.json";
import search_de from "@/locales/de/search.json";
import card_de from "@/locales/de/card.json";
import footer_de from "@/locales/de/footer.json";

import home_es from "@/locales/es/home.json";
import collaborate_es from "@/locales/es/collaborate.json";
import header_es from "@/locales/es/header.json";
import search_es from "@/locales/es/search.json";
import card_es from "@/locales/es/card.json";
import footer_es from "@/locales/es/footer.json";

import home_eu from "@/locales/eu/home.json";
import collaborate_eu from "@/locales/eu/collaborate.json";
import header_eu from "@/locales/eu/header.json";
import search_eu from "@/locales/eu/search.json";
import card_eu from "@/locales/eu/card.json";
import footer_eu from "@/locales/eu/footer.json";

import home_fr from "@/locales/fr/home.json";
import collaborate_fr from "@/locales/fr/collaborate.json";
import header_fr from "@/locales/fr/header.json";
import search_fr from "@/locales/fr/search.json";
import card_fr from "@/locales/fr/card.json";
import footer_fr from "@/locales/fr/footer.json";

import home_it from "@/locales/it/home.json";
import collaborate_it from "@/locales/it/collaborate.json";
import header_it from "@/locales/it/header.json";
import search_it from "@/locales/it/search.json";
import card_it from "@/locales/it/card.json";
import footer_it from "@/locales/it/footer.json";

import home_pt from "@/locales/pt/home.json";
import collaborate_pt from "@/locales/pt/collaborate.json";
import header_pt from "@/locales/pt/header.json";
import search_pt from "@/locales/pt/search.json";
import card_pt from "@/locales/pt/card.json";
import footer_pt from "@/locales/pt/footer.json";

import home_sv from "@/locales/sv/home.json";
import collaborate_sv from "@/locales/sv/collaborate.json";
import header_sv from "@/locales/sv/header.json";
import search_sv from "@/locales/sv/search.json";
import card_sv from "@/locales/sv/card.json";
import footer_sv from "@/locales/sv/footer.json";

import home_vi from "@/locales/vi/home.json";
import collaborate_vi from "@/locales/vi/collaborate.json";
import header_vi from "@/locales/vi/header.json";
import search_vi from "@/locales/vi/search.json";
import card_vi from "@/locales/vi/card.json";
import footer_vi from "@/locales/vi/footer.json";

import home_tr from "@/locales/tr/home.json";
import collaborate_tr from "@/locales/tr/collaborate.json";
import header_tr from "@/locales/tr/header.json";
import search_tr from "@/locales/tr/search.json";
import card_tr from "@/locales/tr/card.json";
import footer_tr from "@/locales/tr/footer.json";

import home_el from "@/locales/el/home.json";
import collaborate_el from "@/locales/el/collaborate.json";
import header_el from "@/locales/el/header.json";
import search_el from "@/locales/el/search.json";
import card_el from "@/locales/el/card.json";
import footer_el from "@/locales/el/footer.json";

import home_ru from "@/locales/ru/home.json";
import collaborate_ru from "@/locales/ru/collaborate.json";
import header_ru from "@/locales/ru/header.json";
import search_ru from "@/locales/ru/search.json";
import card_ru from "@/locales/ru/card.json";
import footer_ru from "@/locales/ru/footer.json";

import home_id from "@/locales/id/home.json";
import collaborate_id from "@/locales/id/collaborate.json";
import header_id from "@/locales/id/header.json";
import search_id from "@/locales/id/search.json";
import card_id from "@/locales/id/card.json";
import footer_id from "@/locales/id/footer.json";

i18n.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: "hi",
  resources: {
    en: {
      home: home_en,
      collaborate: collaborate_en,
      header: header_en,
      search: search_en,
      card: card_en,
      footer: footer_en,
    },
    hi: {
      home: home_hi,
      collaborate: collaborate_hi,
      header: header_hi,
      search: search_hi,
      card: card_hi,
      footer: footer_hi,
    },
    bn: {
      home: home_bn,
      collaborate: collaborate_bn,
      header: header_bn,
      search: search_bn,
      card: card_bn,
      footer: footer_bn,
    },
    te: {
      home: home_te,
      collaborate: collaborate_te,
      header: header_te,
      search: search_te,
      card: card_te,
      footer: footer_te,
    },
    mr: {
      home: home_mr,
      collaborate: collaborate_mr,
      header: header_mr,
      search: search_mr,
      card: card_mr,
      footer: footer_mr,
    },
    ta: {
      home: home_ta,
      collaborate: collaborate_ta,
      header: header_ta,
      search: search_ta,
      card: card_ta,
      footer: footer_ta,
    },
    gu: {
      home: home_gu,
      collaborate: collaborate_gu,
      header: header_gu,
      search: search_gu,
      card: card_gu,
      footer: footer_gu,
    },
    kn: {
      home: home_kn,
      collaborate: collaborate_kn,
      header: header_kn,
      search: search_kn,
      card: card_kn,
      footer: footer_kn,
    },
    ml: {
      home: home_ml,
      collaborate: collaborate_ml,
      header: header_ml,
      search: search_ml,
      card: card_ml,
      footer: footer_ml,
    },
    ar: {
      home: home_ar,
      collaborate: collaborate_ar,
      header: header_ar,
      search: search_ar,
      card: card_ar,
      footer: footer_ar,
    },
    cmn: {
      home: home_cmn,
      collaborate: collaborate_cmn,
      header: header_cmn,
      search: search_cmn,
      card: card_cmn,
      footer: footer_cmn,
    },
    ja: {
      home: home_ja,
      collaborate: collaborate_ja,
      header: header_ja,
      search: search_ja,
      card: card_ja,
      footer: footer_ja,
    },
    ms: {
      home: home_ms,
      collaborate: collaborate_ms,
      header: header_ms,
      search: search_ms,
      card: card_ms,
      footer: footer_ms,
    },
    de: {
      home: home_de,
      collaborate: collaborate_de,
      header: header_de,
      search: search_de,
      card: card_de,
      footer: footer_de,
    },
    es: {
      home: home_es,
      collaborate: collaborate_es,
      header: header_es,
      search: search_es,
      card: card_es,
      footer: footer_es,
    },
    eu: {
      home: home_eu,
      collaborate: collaborate_eu,
      header: header_eu,
      search: search_eu,
      card: card_eu,
      footer: footer_eu,
    },
    fr: {
      home: home_fr,
      collaborate: collaborate_fr,
      header: header_fr,
      search: search_fr,
      card: card_fr,
      footer: footer_fr,
    },
    it: {
      home: home_it,
      collaborate: collaborate_it,
      header: header_it,
      search: search_it,
      card: card_it,
      footer: footer_it,
    },
    pt: {
      home: home_pt,
      collaborate: collaborate_pt,
      header: header_pt,
      search: search_pt,
      card: card_pt,
      footer: footer_pt,
    },
    sv: {
      home: home_sv,
      collaborate: collaborate_sv,
      header: header_sv,
      search: search_sv,
      card: card_sv,
      footer: footer_sv,
    },
    vi: {
      home: home_vi,
      collaborate: collaborate_vi,
      header: header_vi,
      search: search_vi,
      card: card_vi,
      footer: footer_vi,
    },
    tr: {
      home: home_tr,
      collaborate: collaborate_tr,
      header: header_tr,
      search: search_tr,
      card: card_tr,
      footer: footer_tr,
    },
    el: {
      home: home_el,
      collaborate: collaborate_el,
      header: header_el,
      search: search_el,
      card: card_el,
      footer: footer_el,
    },
    ru: {
      home: home_ru,
      collaborate: collaborate_ru,
      header: header_ru,
      search: search_ru,
      card: card_ru,
      footer: footer_ru,
    },
    id: {
      home: home_id,
      collaborate: collaborate_id,
      header: header_id,
      search: search_id,
      card: card_id,
      footer: footer_id,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
);
