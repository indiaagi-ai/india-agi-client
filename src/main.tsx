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

import collaborate_en from "@/locales/en/collaborate.json";
import collaborate_hi from "@/locales/hi/collaborate.json";
import collaborate_bn from "@/locales/bn/collaborate.json";
import collaborate_te from "@/locales/te/collaborate.json";
import collaborate_mr from "@/locales/mr/collaborate.json";
import collaborate_ta from "@/locales/ta/collaborate.json";
import collaborate_gu from "@/locales/gu/collaborate.json";
import collaborate_kn from "@/locales/kn/collaborate.json";
import collaborate_ml from "@/locales/ml/collaborate.json";

import header_en from "@/locales/en/header.json";
import header_hi from "@/locales/hi/header.json";
import header_bn from "@/locales/bn/header.json";
import header_te from "@/locales/te/header.json";
import header_mr from "@/locales/mr/header.json";
import header_ta from "@/locales/ta/header.json";
import header_gu from "@/locales/gu/header.json";
import header_kn from "@/locales/kn/header.json";
import header_ml from "@/locales/ml/header.json";

import search_en from "@/locales/en/search.json";
import search_hi from "@/locales/hi/search.json";
import search_bn from "@/locales/bn/search.json";
import search_te from "@/locales/te/search.json";
import search_mr from "@/locales/mr/search.json";
import search_ta from "@/locales/ta/search.json";
import search_gu from "@/locales/gu/search.json";
import search_kn from "@/locales/kn/search.json";
import search_ml from "@/locales/ml/search.json";

i18n.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: "hi",
  resources: {
    en: {
      home: home_en,
      collaborate: collaborate_en,
      header: header_en,
      search: search_en,
    },
    hi: {
      home: home_hi,
      collaborate: collaborate_hi,
      header: header_hi,
      search: search_hi,
    },
    bn: {
      home: home_bn,
      collaborate: collaborate_bn,
      header: header_bn,
      search: search_bn,
    },
    te: {
      home: home_te,
      collaborate: collaborate_te,
      header: header_te,
      search: search_te,
    },
    mr: {
      home: home_mr,
      collaborate: collaborate_mr,
      header: header_mr,
      search: search_mr,
    },
    ta: {
      home: home_ta,
      collaborate: collaborate_ta,
      header: header_ta,
      search: search_ta,
    },
    gu: {
      home: home_gu,
      collaborate: collaborate_gu,
      header: header_gu,
      search: search_gu,
    },
    kn: {
      home: home_kn,
      collaborate: collaborate_kn,
      header: header_kn,
      search: search_kn,
    },
    ml: {
      home: home_ml,
      collaborate: collaborate_ml,
      header: header_ml,
      search: search_ml,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
);
