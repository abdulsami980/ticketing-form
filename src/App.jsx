import { JobApplicationForm } from "@/components/common/JobApplicationForm";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { JobPostingForm } from "./components/common/JobPostingForm";
import { Button } from "./components/ui/button/button";
import DarkVeil from "./components/ui/DarkVeil";
import RotatingText from "./components/ui/RotatingText";
import TextCursor from "./components/ui/TextCursor";

function App() {
  const [route, setRoute] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );
  const [cursorEnabled, setCursorEnabled] = useState(true);

  useEffect(() => {
    const onPopState = () => setRoute(window.location.pathname);
    window.addEventListener("popstate", onPopState);

    // Detect hover on cards
    const cards = document.querySelectorAll("[data-block-galaxy='true']");
    const handleEnter = () => setCursorEnabled(false);
    const handleLeave = () => setCursorEnabled(true);

    cards.forEach((card) => {
      card.addEventListener("mouseenter", handleEnter);
      card.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("popstate", onPopState);
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", handleEnter);
        card.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setRoute(path);
  };

  const isApplicationForm = route === "/job-application-form";
  const postAJobForm = route === "/post-a-job-form";

  return (
    <div className="dark min-h-screen relative overflow-hidden">
      {/* Show cursor only if enabled */}
      {cursorEnabled && (
        <TextCursor
          text="⚡"
          delay={0.01}
          spacing={70}
          followMouseDirection={true}
          randomFloat={true}
          exitDuration={0.3}
          maxPoints={10}
        />
      )}

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <DarkVeil />
      </div>

      <Toaster richColors position="top-right" />
      <div className="relative z-10 flex min-h-screen items-center justify-center p-6 text-foreground">
        {isApplicationForm ? (
          <div
            className="w-full max-w-md rounded-2xl border bg-card/20 backdrop-blur-md shadow-2xl"
            data-block-galaxy="true"
          >
            <div className="p-6">
              <JobApplicationForm />
            </div>
          </div>
        ) : postAJobForm ? (
          <div
            className="w-full max-w-md rounded-2xl border bg-card/20 backdrop-blur-md shadow-2xl"
            data-block-galaxy="true"
          >
            <div className="p-6">
              <JobPostingForm />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* Hero Card */}
            <div
              className="w-full max-w-3xl text-center rounded-2xl border bg-card/20 backdrop-blur-md shadow-2xl p-6"
              data-block-galaxy="true"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#5227FF] via-[#FF9FFC] to-[#B19EEF] bg-clip-text text-transparent mb-8">
                AI-Driven Recruitment Platform
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Smart Screening & Notifications — automate applicant filtering,
                enrich profiles, and keep recruiters & candidates updated in
                real time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate("/job-application-form")}
                  size="lg"
                  className="px-8 py-6 text-lg rounded-xl shadow-lg cursor-pointer hover:scale-105 hover:shadow-lg"
                >
                  Apply on Job
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/post-a-job-form")}
                  className="px-8 py-6 text-lg rounded-xl cursor-pointer hover:scale-105 hover:shadow-lg"
                >
                  Post a Job
                </Button>
              </div>
            </div>

            {/* Rotating text BELOW the card */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Recruitment But More
              </h3>
              <RotatingText
                texts={[
                  "Faster!",
                  "AI-Driven!",
                  "Smarter!",
                  "Seamless!",
                  "Innovative!",
                  "Automated!",
                  "Scalable!",
                ]}
                mainClassName="px-3 sm:px-4 md:px-5 bg-gradient-to-r from-[#6A0DAD] via-[#8E5DFF] to-[#C084FC] text-white font-bold text-xl sm:text-2xl md:text-3xl overflow-hidden py-1 sm:py-1.5 md:py-2 rounded-lg"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
