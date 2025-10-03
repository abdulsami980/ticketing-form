// App.jsx
import { JobApplicationForm } from "@/components/common/JobApplicationForm";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { JobPostingForm } from "./components/common/JobPostingForm";
import { Button } from "./components/ui/button/button";
import DarkVeil from "./components/ui/DarkVeil";

function App() {
  const [route, setRoute] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  useEffect(() => {
    const onPopState = () => setRoute(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setRoute(path);
  };

  const isApplicationForm = route === "/job-application-form";
  const postAJobForm = route === "/post-a-job-form";

  return (
    <>
      <div className="dark min-h-screen relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-99">
          <DarkVeil />
        </div>
        <Toaster richColors position="top-right" />
        <div className="relative z-10 flex min-h-screen items-center justify-center p-6 text-foreground">
          {isApplicationForm ? (
            <div
              className="w-full max-w-md rounded-2xl border bg-card/80 backdrop-blur-md shadow-2xl"
              data-block-galaxy="true"
            >
              <div className="p-6">
                <JobApplicationForm />
              </div>
            </div>
          ) : postAJobForm ? (
            <div
              className="w-full max-w-md rounded-2xl border bg-card/80 backdrop-blur-md shadow-2xl"
              data-block-galaxy="true"
            >
              <div className="p-6">
                <JobPostingForm />
              </div>
            </div>
          ) : (
            <div
              className="w-full max-w-3xl text-center rounded-2xl border bg-card/40 backdrop-blur-md shadow-2xl p-10"
              data-block-galaxy="true"
            >
              {/* Hero Section */}
              <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#5227FF] via-[#FF9FFC] to-[#B19EEF] bg-clip-text text-transparent mb-6">
                AI-Powered Recruitment
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                🚀 Smart Screening & Notifications — automate applicant
                filtering, enrich profiles, and keep recruiters & candidates
                updated in real time.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate("/job-application-form")}
                  size="lg"
                  className="px-8 py-6 text-lg rounded-xl shadow-lg"
                >
                  Apply on Job
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/post-a-job-form")}
                  className="px-8 py-6 text-lg rounded-xl"
                >
                  Post a Job
                </Button>
              </div>

              {/* Footer-like tagline */}
              <p className="mt-10 text-sm text-muted-foreground">
                Transform your hiring with automation · Faster · Smarter ·
                Seamless
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
