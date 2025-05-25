export const languages = {
  indian: [
    { code: "en", country: "IN", name: "English", englishName: "English" },
    { code: "hi", country: "IN", name: "हिंदी", englishName: "Hindi" },
    { code: "bn", country: "IN", name: "বাংলা", englishName: "Bengali" },
    { code: "te", country: "IN", name: "తెలుగు", englishName: "Telugu" },
    { code: "mr", country: "IN", name: "मराठी", englishName: "Marathi" },
    { code: "ta", country: "IN", name: "தமிழ்", englishName: "Tamil" },
    { code: "gu", country: "IN", name: "ગુજરાતી", englishName: "Gujarati" },
    { code: "kn", country: "IN", name: "ಕನ್ನಡ", englishName: "Kannada" },
    { code: "ml", country: "IN", name: "മലയാളം", englishName: "Malayalam" },
  ],
  international: [
    { code: "en", country: "US", name: "English", englishName: "English" },
    // { code: "zh", name: "中文", englishName: "Chinese" },
    // { code: "ar", name: "العربية", englishName: "Arabic" },
    // { code: "es", name: "Español", englishName: "Spanish" },
    // { code: "fr", name: "Français", englishName: "French" },
    // { code: "de", name: "Deutsch", englishName: "German" },
    // { code: "ja", name: "日本語", englishName: "Japanese" },
    // { code: "ko", name: "한국어", englishName: "Korean" },
    // { code: "pt", name: "Português", englishName: "Portuguese" },
    // { code: "ru", name: "Русский", englishName: "Russian" },
    // { code: "it", name: "Italiano", englishName: "Italian" },
    // { code: "tr", name: "Türkçe", englishName: "Turkish" },
    // { code: "th", name: "ไทย", englishName: "Thai" },
    // { code: "vi", name: "Tiếng Việt", englishName: "Vietnamese" },
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
