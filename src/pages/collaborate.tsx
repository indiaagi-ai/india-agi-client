import { Github } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { useEffect } from "react";

const CollaboratePage = () => {
  const repoUrl = "https://github.com/orgs/indiaagi-ai/repositories"; // Replace with your actual repository URL

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 mt-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <AuroraText>Open Source Collaboration</AuroraText>
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-gray-700">
          Building India's AGI Together
        </h2>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-8 border border-blue-100">
          <p className="text-lg italic">
            "I believe the next stage in improving trustworthiness will be the
            replacement of individual AI agents with cooperating teams of agents
            that continually fact-check each other and try to keep each other
            honest."
          </p>
          <p className="text-right font-medium">
            — Henry Kautz, Professor of Computer Science, University of Virginia
          </p>
        </div>

        <p className="mb-6">
          IndiaAGI extends this concept to include a cooperative community of
          developers. We invite developers worldwide to contribute to this
          ground-breaking open-source initiative:
        </p>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Join the Mission
            </h3>
            <p>
              Access our code from our GitHub repository, fork it, and become a
              part of the IndiaAGI community.
            </p>
            <div className="mt-4">
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                <Github className="h-5 w-5" />
                <span>View on GitHub</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Expand the AI Team
            </h3>
            <p>
              Integrate additional AI agents, Large Language Models (LLMs), and
              Specialized Language Models (SLMs) to collaborate with Grok,
              ChatGPT, Gemini, and others.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Enhance the Core Process
            </h3>
            <p>
              Develop and refine consensus-building algorithms, fact-checking
              mechanisms, solution optimization techniques, and error detection
              and correction mechanisms.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Improve the User Experience
            </h3>
            <p>
              Contribute to the development of a user-friendly and intuitive
              user interface (UI) and user experience (UX) to make IndiaAGI
              accessible and effective for everyone.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Develop Specialized Modules
            </h3>
            <p>
              Create modules for specific domains (e.g., healthcare, education,
              finance) that leverage the collaborative power of IndiaAGI to
              address unique challenges.
            </p>
            <p className="mt-2">For ideas, look up:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>AIs fail where Child succeeds</li>
              <li>IndiaAGI: Evolution</li>
              <li>IndiaAGI - Existential Threat</li>
              <li>IndiaAGI: Bill Analysis Module</li>
              <li>IndiaAGI – Authors Corner</li>
              <li>IndiaAGI: Emulate Emergence</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Contribute to Ethical Development
            </h3>
            <p>
              Help us establish and implement ethical guidelines and safeguards
              for IndiaAGI's development and use, ensuring fairness,
              transparency, and accountability.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Earn Recognition
            </h3>
            <p>
              Contributors will be prominently credited on this page, in our
              launch story, and in all associated documentation.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all shadow-md"
          >
            <Github className="h-6 w-6" />
            <span className="text-lg">Join the IndiaAGI Community</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CollaboratePage;
