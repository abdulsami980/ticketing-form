// App.jsx

import { ContactForm } from "@/components/common/contactForm";
import { Toaster } from "sonner";
import Galaxy from "./components/ui/Galaxy";
import TextType from "./components/ui/TyprText";

function App() {
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
        </div>
      </div>
    </>
  );
}

export default App;
