// App.jsx

import { ContactForm } from "@/components/common/contactForm";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import Galaxy from "./components/ui/Galaxy";
import TextType from "./components/ui/TypeText";

function App() {
  const [route, setRoute] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  useEffect(() => {
    const onPopState = () => setRoute(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const isForm = route === "/form";

  return (
    <>
      <div className="dark min-h-screen relative overflow-hidden">
        <Galaxy
          className="absolute inset-0 -z-10"
          transparent={false}
          density={1.2}
          hueShift={200}
          saturation={0.8}
          glowIntensity={0.35}
        />

        <Toaster richColors position="top-right" />
        <div className="relative z-10 flex min-h-screen items-center justify-center p-6 text-foreground">
          {isForm ? (
            <div
              className="w-full max-w-md rounded-xl border bg-card/80 backdrop-blur-md shadow-lg"
              data-block-galaxy="true"
            >
              <div className="p-6">
                <div className="mb-3 font-semibold">
                  <TextType
                    text={[
                      "Need Help?",
                      "Drop a Message!",
                      "Have a Question?",
                      "Ask a Query!",
                      "Share Your Feedback!",
                      "What’s on Your Mind?",
                      "Generate a Ticket!",
                      "Looking for Support?",
                      "Contact Us!",
                      "Want Quick Assistance?",
                      "We’re Listening!",
                      "How Can We Help?",
                      "Submit Your Question!",
                      "Reach Our Team!",
                      "Got an Issue?",
                      "Connect With Us!",
                      "Any Queries?",
                      "Facing a Problem?",
                      "Need Some Guidance?",
                      "Trouble with Something?",
                    ]}
                    typingSpeed={70}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="_"
                    className="text-2xl"
                    cursorBlinkDuration={0.2}
                  />
                </div>
                <ContactForm />
              </div>
            </div>
          ) : (
            <div
              className="w-full max-w-xl rounded-xl border bg-card/80 backdrop-blur-md shadow-lg p-8 text-center"
              data-block-galaxy="true"
            >
              <h1 className="text-3xl font-bold mb-2">Stay Tuned!</h1>

              <TextType
                text={[
                  "Crafting something special",
                  "Building with precision",
                  "Innovation in progress",
                  "Preparing the magic",
                  "Code is brewing",
                  "Smart solutions on the way",
                  "Engineering the experience",
                  "Future-ready, almost here",
                  "Making technology human",
                  "Innovation doesn’t rush",
                  "Something intelligent is coming",
                ]}
                typingSpeed={70}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="_"
                className="text-2xl"
                cursorBlinkDuration={0.2}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
