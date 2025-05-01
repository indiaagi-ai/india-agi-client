import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "lucide-react";
import { WavyBackground } from "@/components/ui/wavy-background";

export function HeroSectionOne() {
  const navigate = useNavigate();

  return (
    <WavyBackground
      className="relative mx-auto flex max-w-7xl flex-col items-center justify-center"
      backgroundFill="#faf9f5"
    >
      <div className="px-4 py-10 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mx-auto mb-6 flex justify-center"
        >
          <div className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-800 shadow-sm ring-1 ring-blue-200">
            Launched April 2025
          </div>
        </motion.div>
        <h1 className="relative z-10 mx-auto max-w-6xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"AI Consensus for India".split(" ").map((word, index) => (
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
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          Get nuanced insights on Indian challenges through multiple AI
          perspectives. Our platform brings together leading language
          models—ChatGPT, Gemini, Claude, and Grok—specially optimized for
          India-focused queries, delivering the most reliable consensus when you
          ask targeted questions about Indian issues, policies, and
          opportunities.
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
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => {
              navigate("/trynow");
            }}
            className="group w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 hover:cursor-pointer"
          >
            <span className="inline-flex items-center">
              Explore Now
              <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>
      </div>
    </WavyBackground>
  );
}
