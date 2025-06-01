export const languages = {
  indian: [
    {
      code: "en",
      country: "IN",
      name: "English",
      englishName: "English",
      voice: "en-IN-Standard-C",
    },
    {
      code: "hi",
      country: "IN",
      name: "हिंदी",
      englishName: "Hindi",
      voice: "hi-IN-Standard-C",
    },
    {
      code: "bn",
      country: "IN",
      name: "বাংলা",
      englishName: "Bengali",
      voice: "bn-IN-Standard-D",
    },
    {
      code: "te",
      country: "IN",
      name: "తెలుగు",
      englishName: "Telugu",
      voice: "te-IN-Standard-B",
    },
    {
      code: "mr",
      country: "IN",
      name: "मराठी",
      englishName: "Marathi",
      voice: "mr-IN-Standard-B",
    },
    {
      code: "ta",
      country: "IN",
      name: "தமிழ்",
      englishName: "Tamil",
      voice: "ta-IN-Standard-D",
    },
    {
      code: "gu",
      country: "IN",
      name: "ગુજરાતી",
      englishName: "Gujarati",
      voice: "gu-IN-Standard-B",
    },
    {
      code: "kn",
      country: "IN",
      name: "ಕನ್ನಡ",
      englishName: "Kannada",
      voice: "kn-IN-Standard-D",
    },
    {
      code: "ml",
      country: "IN",
      name: "മലയാളം",
      englishName: "Malayalam",
      voice: "ml-IN-Standard-B",
    },
  ],
  international: [
    {
      code: "en",
      country: "US",
      name: "English",
      englishName: "English",
      voice: "en-IN-Standard-C",
    },
    {
      code: "ar",
      country: "XA",
      name: "Arabic",
      englishName: "Arabic",
      voice: "ar-XA-Standard-C",
    },
    {
      code: "cmn",
      country: "CN",
      name: "中文",
      englishName: "Chinese",
      voice: "cmn-CN-Standard-C",
    },
    {
      code: "ja",
      country: "JP",
      name: "日本語",
      englishName: "Japanese",
      voice: "ja-JP-Standard-D",
    },
    {
      code: "ms",
      country: "MY",
      name: "Bahasa Melayu",
      englishName: "Malay",
      voice: "ms-MY-Standard-B",
    },
    {
      code: "de",
      country: "DE",
      name: "Deutsch",
      englishName: "German",
      voice: "de-DE-Standard-D",
    },
    // {
    //   code: "en",
    //   country: "GB",
    //   name: "English (UK)",
    //   englishName: "English (UK)",
    //   voice: "en-GB-Standard-D",
    // },
    {
      code: "es",
      country: "ES",
      name: "Español",
      englishName: "Spanish",
      voice: "es-ES-Standard-B",
    },
    {
      code: "eu",
      country: "ES",
      name: "Euskara",
      englishName: "Basque",
      voice: "eu-ES-Standard-A",
    },
    {
      code: "fr",
      country: "FR",
      name: "Français",
      englishName: "French",
      voice: "fr-FR-Standard-D",
    },
    {
      code: "it",
      country: "IT",
      name: "Italiano",
      englishName: "Italian",
      voice: "it-IT-Standard-D",
    },
    {
      code: "pt",
      country: "PT",
      name: "Português",
      englishName: "Portuguese",
      voice: "pt-PT-Standard-C",
    },
    {
      code: "sv",
      country: "SE",
      name: "Svenska",
      englishName: "Swedish",
      voice: "sv-SE-Standard-D",
    },
    {
      code: "vi",
      country: "VN",
      name: "Tiếng Việt",
      englishName: "Vietnamese",
      voice: "vi-VN-Standard-D",
    },
    {
      code: "tr",
      country: "TR",
      name: "Türkçe",
      englishName: "Turkish",
      voice: "tr-TR-Standard-E",
    },
    {
      code: "el",
      country: "GR",
      name: "Ελληνικά",
      englishName: "Greek",
      voice: "el-GR-Standard-A",
    },
    {
      code: "ru",
      country: "RU",
      name: "Русский",
      englishName: "Russian",
      voice: "ru-RU-Standard-D",
    },
    {
      code: "id",
      country: "ID",
      name: "Bahasa Indonesia",
      englishName: "Indonesian",
      voice: "id-ID-Standard-C",
    },
  ],
};

export const getLanguageCodeWithCountry = (languageCode: string) => {
  for (const category of Object.values(languages)) {
    const lang = category.find((lang) => lang.code === languageCode);
    if (lang) {
      return `${lang.code}-${lang.country}`;
    }
  }
  return "en-IN"; // or throw an error, or return a default
};

export const getEnglishName = (languageCode: string) => {
  for (const category of Object.values(languages)) {
    const lang = category.find((lang) => lang.code === languageCode);
    if (lang) {
      return lang.englishName;
    }
  }
  return "English";
};

export const getVoice = (languageCode: string) => {
  for (const category of Object.values(languages)) {
    const lang = category.find((lang) => lang.code === languageCode);
    if (lang) {
      return lang.voice;
    }
  }
  return "en-IN-Standard-C";
};
