import { HeaderProps } from "@/App";
import { Users, Globe, Check, ChevronDown, LanguagesIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AuroraText } from "@/components/magicui/aurora-text";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Language data - organized by region
const languages = {
  indian: [
    { code: "en", name: "English", englishName: "English" },
    { code: "hi", name: "हिंदी", englishName: "Hindi" },
    { code: "bn", name: "বাংলা", englishName: "Bengali" },
    { code: "te", name: "తెలుగు", englishName: "Telugu" },
    { code: "mr", name: "मराठी", englishName: "Marathi" },
    { code: "ta", name: "தமிழ்", englishName: "Tamil" },
    { code: "gu", name: "ગુજરાતી", englishName: "Gujarati" },
    { code: "kn", name: "ಕನ್ನಡ", englishName: "Kannada" },
    { code: "ml", name: "മലയാളം", englishName: "Malayalam" },
  ],
  international: [
    { code: "en", name: "English", englishName: "English" },
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

const Header = ({
  count,
  selectedLanguage,
  setSelectedLanguage,
}: HeaderProps) => {
  const { t } = useTranslation("header");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter languages based on search
  const filterLanguages = (langArray: typeof languages.indian) => {
    if (!searchTerm) return langArray;
    return langArray.filter(
      (lang) =>
        lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.englishName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
    setIsDropdownOpen(false);
    setSearchTerm("");
    // Here you would implement your language change logic
    console.log("Language changed to:", langCode);
  };

  const getCurrentLanguageName = () => {
    const allLanguages = [...languages.indian, ...languages.international];
    const current = allLanguages.find((lang) => lang.code === selectedLanguage);
    return current ? current.englishName : "English";
  };

  return (
    <div className="w-full max-w-6xl flex gap-3 md:gap-5 items-end justify-between z-20">
      <div className="flex flex-col items-start flex-1 min-w-0">
        <div className="w-full flex justify-start mb-1">
          <div className="w-fit px-2 md:px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs md:text-sm font-medium rounded-full shadow-md">
            Beta
          </div>
        </div>
        <h1
          className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter hover:cursor-pointer truncate"
          onClick={() => {
            navigate("/");
          }}
        >
          <AuroraText>IndiaAGI.ai</AuroraText>
        </h1>
      </div>

      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
        {/* Language Selector */}
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 bg-background border border-muted-foreground/20 rounded-lg hover:bg-muted/50 transition-colors"
            aria-label="Select language"
          >
            <LanguagesIcon className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs md:text-sm font-medium hidden sm:inline">
              {getCurrentLanguageName()}
            </span>
            <ChevronDown
              className={`h-3 w-3 text-muted-foreground transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-72 bg-background border border-muted-foreground/20 rounded-lg shadow-lg max-h-96 overflow-hidden z-50"
            >
              {/* Search Box */}
              <div className="p-3 border-b border-muted-foreground/10">
                <input
                  type="text"
                  placeholder="Search languages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-muted/30 border border-muted-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="max-h-80 overflow-y-auto">
                {/* Indian Languages */}
                {filterLanguages(languages.indian).length > 0 && (
                  <div>
                    <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-muted/30">
                      Indian Languages
                    </div>
                    {filterLanguages(languages.indian).map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageSelect(lang.code)}
                        className="w-full px-3 py-2.5 text-left hover:bg-muted/50 transition-colors flex items-center justify-between group"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {lang.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {lang.englishName}
                          </span>
                        </div>
                        {selectedLanguage === lang.code && (
                          <Check className="h-4 w-4 text-blue-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* International Languages */}
                {filterLanguages(languages.international).length > 0 && (
                  <div>
                    <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-muted/30 border-t border-muted-foreground/10">
                      International Languages
                    </div>
                    {filterLanguages(languages.international).map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageSelect(lang.code)}
                        className="w-full px-3 py-2.5 text-left hover:bg-muted/50 transition-colors flex items-center justify-between group"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {lang.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {lang.englishName}
                          </span>
                        </div>
                        {selectedLanguage === lang.code && (
                          <Check className="h-4 w-4 text-blue-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* No Results */}
                {filterLanguages(languages.indian).length === 0 &&
                  filterLanguages(languages.international).length === 0 && (
                    <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                      No languages found matching "{searchTerm}"
                    </div>
                  )}
              </div>
            </div>
          )}
        </div>

        {/* Online Count Badge */}
        <Badge
          variant="outline"
          className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 bg-background border-muted-foreground/20 hover:bg-background h-fit"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="flex items-center gap-1 md:gap-1.5">
            <Users className="h-3 w-3 md:h-3.5 md:w-3.5 text-muted-foreground" />
            <span className="text-xs md:text-sm font-medium">{count}</span>
            <span className="text-xs md:text-sm font-medium hidden sm:inline">
              {t("online")}
            </span>
          </span>
        </Badge>
      </div>
    </div>
  );
};

export default Header;
