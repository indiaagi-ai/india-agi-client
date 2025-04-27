import { Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full pt-6 pb-6 border-t border-gray-200 mt-auto">
      <div className="flex justify-center items-center">
        <div className="text-sm text-gray-600 flex items-center">
          For Feedback, write to Hemen Parekh
          <div className="flex items-center ml-2 gap-3">
            <a
              href="https://www.linkedin.com/in/hemen-parekh-2977411b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:hcp@RecruitGuru.com"
              className="text-gray-500 hover:text-blue-600 transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
