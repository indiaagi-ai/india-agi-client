import { LinkedInLogoIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation("footer");

  return (
    <footer className="w-full pt-6 pb-6 border-t border-gray-200 mt-auto z-20">
      <div className="flex justify-center items-center">
        <div className="text-sm text-gray-600 flex items-center">
          {t("writeToHcp")}
          <div className="flex items-center ml-2 gap-3">
            <a
              href="https://www.linkedin.com/in/hemen-parekh-2977411b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedInLogoIcon />
            </a>
            <a
              href="mailto:hcp@RecruitGuru.com"
              className="text-gray-500 hover:text-blue-600 transition-colors"
              aria-label="Email"
            >
              <EnvelopeClosedIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
