"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TileBackground from "../components/TileBackground";
import ContentSection from "./components/ContentSection";
import DirectionController from "./components/DirectionController";
import InitNavbar from "./components/InitNavbar";
import StepperProgressBar from "./components/StepperProgressBar";
import { ConfigHandler } from "@/utility/configHandler";

const defaultConstraints = {
  font: "Jetbrains Mono",
  headerText: "CodeBook",
  marginSize: 1,
  fontSize: 11,
  columns: 1,
  pageLimit: 20,
};

export default function Initialize() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const configHandler = new ConfigHandler();

  // All useState hooks must be called before any conditional returns
  const [currentStep, setCurrentStep] = useState(1);
  const [repos, setRepos] = useState([]);
  const [files, setFiles] = useState([]);
  const [githubUrl, setGithubUrl] = useState("");
  const [constraints, setConstraints] = useState(defaultConstraints);

  const steps = [
    { id: 1, name: `Github Link` },
    { id: 2, name: `Custom Code Upload` },
    { id: 3, name: `Constraints` },
    { id: 4, name: `Generate` },
  ];

  const totalSteps = steps.length;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  const handleNext = () => {
    if (currentStep === 1) {
      configHandler.addRepo(repos);
    }

    if (currentStep === 4) {
      router.push("/editor");
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div>
      <TileBackground>
        <InitNavbar />
        <div
          className={`flex flex-col items-center justify-center min-h-screen`}
        >
          <div
            className={`
              w-[80vw] md:w-[500px] lg:w-[700px] 
              flex flex-col items-center justify-center gap-16
            `}
          >
            <StepperProgressBar />
            <ContentSection
              activeStep={currentStep}
              repos={repos}
              setRepos={setRepos}
              files={files}
              setFiles={setFiles}
              githubUrl={githubUrl}
              setGithubUrl={setGithubUrl}
              constraints={constraints}
              setConstraints={setConstraints}
            />
            <DirectionController
              handleNext={handleNext}
              handleBack={handleBack}
              isBackHidden={currentStep === 1}
            />
          </div>
        </div>
      </TileBackground>
    </div>
  );
}
