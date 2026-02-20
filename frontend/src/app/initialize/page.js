"use client";

import { useState, useMemo } from "react";
import TileBackground from "../components/TileBackground";
import ContentSection from "./components/ContentSection";
import DirectionController from "./components/DirectionController";
import InitNavbar from "./components/InitNavbar";
import StepperProgressBar from "./components/StepperProgressBar";
import { useRouter } from "next/navigation";
import { ConfigHandler } from "@/utility/configHandler";
import { useSession } from "next-auth/react";
import { createConfig } from "../api/pdf.api";
import toast from "react-hot-toast";

const defaultConstraints = {
  font: "Jetbrains Mono",
  headerText: "CodeBook",
  marginSize: 1,
  fontSize: 11,
  columns: 1,
  pageLimit: 20,
};

export default function Initialize() {
  const router = useRouter();
  const configHandler = useMemo(() => new ConfigHandler(), []);
  const sessionData = useSession();
  const userId = sessionData?.data?.user?.id;

  const steps = [
    { id: 1, name: `Github Link` },
    { id: 2, name: `Custom Code Upload` },
    { id: 3, name: `Constraints` },
    { id: 4, name: `Generate` },
  ];

  const totalSteps = steps.length;

  const [currentStep, setCurrentStep] = useState(1);
  const [repos, setRepos] = useState([]);
  const [files, setFiles] = useState([]);
  const [githubUrl, setGithubUrl] = useState("");
  const [constraints, setConstraints] = useState(defaultConstraints);

  const handleNext = async () => {
    if (currentStep === 1) {
      configHandler.addRepo(repos);
    }

    if (currentStep === 4) {
      const configData = configHandler.createSchemaData(userId);

      try {
        const result = await createConfig(configData);

        console.log("Config Data:", result);
        toast.success("Successfully Initialized Codebook!");

        router.push("/editor");
      } catch (error) {
        toast.error("Failed to create PDF configuration.");
        console.error("Error creating PDF configuration:", error);

        router.push("/dashboard");
      }
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
