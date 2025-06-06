import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "lucide-react";
import { WavyBackground } from "@/components/ui/wavy-background";
import video from "@/assets/video.mp4";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";
import DeepSeekSvg from "@/assets/deepseek.svg";
import OpenAISvg from "@/assets/openai.svg";
import GoogleSvg from "@/assets/google.svg";
import AnthropicSvg from "@/assets/anthropic.svg";
import XAISvg from "@/assets/xai.svg";

export function HeroSectionOne() {
  const { t } = useTranslation("home");
  const navigate = useNavigate();

  const aiIcons = [
    { src: DeepSeekSvg, alt: "DeepSeek", name: "DeepSeek" },
    { src: OpenAISvg, alt: "OpenAI", name: "OpenAI" },
    { src: GoogleSvg, alt: "Google", name: "Google" },
    { src: AnthropicSvg, alt: "Anthropic", name: "Anthropic" },
    { src: XAISvg, alt: "xAI", name: "xAI" },
  ];

  return (
    <WavyBackground
      className="relative mx-auto max-w-7xl"
      backgroundFill="#faf9f5"
    >
      <div className="flex flex-col md:flex-row px-4 py-10 md:py-20">
        {/* Left side content */}
        <div className="w-full md:w-1/2 md:pr-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mb-6 flex justify-center md:justify-start"
          >
            <div className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-800 shadow-sm ring-1 ring-blue-200">
              {t("launched")}
            </div>
          </motion.div>
          <h1 className="relative z-10 text-center md:text-left text-2xl font-bold text-slate-700 md:text-4xl lg:text-6xl dark:text-slate-300">
            {t("title")
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                  className="mr-2 inline-block"
                >
                  {word}
                </motion.span>
              ))}
          </h1>
          {/* AI Icons Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="relative z-10"
          >
            <p className="text-center md:text-left text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-4">
              Powered by leading AI models
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              {aiIcons.map((icon, index) => (
                <motion.div
                  key={icon.name}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 1 + index * 0.1,
                    ease: "easeOut",
                  }}
                  className="group relative"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 group-hover:shadow-lg group-hover:border-gray-300 dark:group-hover:border-gray-600">
                    <img
                      src={icon.src}
                      alt={icon.alt}
                      className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                    {icon.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 0.8,
            }}
            className="relative z-10 py-4 text-center md:text-left text-lg font-normal text-neutral-600 dark:text-neutral-400"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 1.5,
            }}
            className="relative z-10 mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4"
          >
            <button
              onClick={() => {
                navigate("/trynow");
              }}
              className="group w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 hover:cursor-pointer"
            >
              <span className="inline-flex items-center">
                {t("explore")}
                <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>

            <button
              onClick={() => {
                navigate("/contribute");
              }}
              className="group w-60 transform rounded-lg border-2 border-black bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-white dark:bg-black dark:text-white dark:hover:bg-gray-900 hover:cursor-pointer"
            >
              <span className="inline-flex items-center">
                {t("contribute")}
                <GitHubLogoIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </motion.div>
        </div>

        {/* Right side video section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full md:w-1/2 mt-10 md:mt-0 flex flex-col items-center"
        >
          <div className="relative rounded-xl bg-gray-100 shadow-lg overflow-hidden aspect-video w-full border border-black p-2">
            <video
              className="w-full h-full overflow-hidden object-cover rounded-[calc(theme(borderRadius.lg)-1px)] border border-black"
              autoPlay
              muted
              loop
              controls
            >
              {/* Replace with your actual video source */}
              <source src={video} type="video/mp4" />
              {t("noVideoTagSupport")}
            </video>
          </div>
          <p className="text-sm text-center mt-2 text-gray-500">
            {t("caption")}
          </p>
        </motion.div>
      </div>
    </WavyBackground>
  );
}
