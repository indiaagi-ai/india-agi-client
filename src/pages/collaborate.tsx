import { Github, ExternalLink } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";

const CollaboratePage = () => {
  const repoUrl = "https://github.com/orgs/indiaagi-ai/repositories"; // Replace with your actual repository URL

  const { t } = useTranslation("collaborate");

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="container mx-auto max-w-4xl px-4 py-16 mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AuroraText>{t("title")}</AuroraText>
        </motion.h1>
        <motion.h2
          className="text-xl md:text-2xl font-medium text-gray-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {t("subtitle")}
        </motion.h2>
      </motion.div>

      <div className="prose prose-lg max-w-none">
        {/* Quote Section */}
        <motion.div
          className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-8 border border-blue-100 shadow-sm"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <motion.p
            className="text-lg italic text-gray-700 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {t("quote")}
          </motion.p>
          <motion.p
            className="text-right font-medium text-gray-800"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {t("attribution")}
          </motion.p>

          <motion.div
            className="mt-6 flex justify-end"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <a
              href="https://gizmodo.com/ai-experts-say-were-on-the-wrong-path-to-achieving-human-like-ai-2000581717"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors text-sm"
            >
              {t("article")}
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* Mission Statement */}
        <motion.p
          className="mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {t("mission")}
        </motion.p>

        {/* Main Content Sections */}
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Join The Mission */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {t("joinTheMission")}
            </h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t("accessGitHubCode")}
            </motion.p>
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <Github className="h-5 w-5" />
                <span>{t("viewOnGitHub")}</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Expand AI Team */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {t("expandAiTeam")}
            </h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t("integrateAdditionalAgents")}
            </motion.p>
          </motion.div>

          {/* Enhance Core Process */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {t("enhanceCoreProcess")}
            </h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t("developConsensusAlgo")}
            </motion.p>
          </motion.div>

          {/* Improve UX */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {t("improveUxTitle")}
            </h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t("imprtoveUxContent")}
            </motion.p>
          </motion.div>

          {/* Develop Specialised Modules */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {t("developSpecialisedModulesTitle")}
            </h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t("developSpecialisedModulesContent")}
            </motion.p>
            <motion.p
              className="mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t("forIdeasLookUp")}
            </motion.p>
            <motion.ul
              className="list-disc pl-6 mt-2 space-y-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                {
                  href: "https://myblogepage.blogspot.com/2025/03/ais-fail-where-child-succeeds.html",
                  text: "AIs fail where Child succeeds",
                },
                {
                  href: "https://myblogepage.blogspot.com/2025/04/indiaagi-evolution.html",
                  text: "IndiaAGI: Evolution",
                },
                {
                  href: "https://myblogepage.blogspot.com/2025/04/indiaagi-existential-threat.html",
                  text: "IndiaAGI - Existential Threat",
                },
                {
                  href: "https://myblogepage.blogspot.com/2025/04/indiaagi-bill-analysis-module.html",
                  text: "IndiaAGI: Bill Analysis Module",
                },
                {
                  href: "https://myblogepage.blogspot.com/2025/04/indiaagi-authors-corner.html",
                  text: "IndiaAGI – Authors Corner",
                },
                {
                  href: "https://myblogepage.blogspot.com/2025/04/indiaagi-emulate-emergence.html",
                  text: "IndiaAGI: Emulate Emergence",
                },
              ].map((link, index) => (
                <motion.li key={index} variants={linkVariants}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 flex items-center"
                  >
                    {link.text}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Contribute */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {t("contributeTitle")}
            </h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t("contributeContent")}
            </motion.p>
          </motion.div>

          {/* Earn Recognition */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {t("earnRecognitionTitle")}
            </h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t("earnRecognitionContent")}
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all shadow-md"
            whileTap={{ scale: 0.95 }}
          >
            <Github className="h-6 w-6" />
            <span className="text-lg">{t("joinCommunity")}</span>
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CollaboratePage;
