"use client";

import { useState, useMemo } from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TileBackground from "../components/TileBackground";
import ContentSection from "./components/ContentSection";
import DirectionController from "./components/DirectionController";
import InitNavbar from "./components/InitNavbar";
import StepperProgressBar from "./components/StepperProgressBar";
import { ConfigHandler } from "@/utility/configHandler";
import { CodeSegmentsHandler } from "@/utility/codeSegmentsHandler";
import { CodeBookHandler } from "@/utility/codeBookHandler";
import { useSession } from "next-auth/react";
import { createConfig, modifyCodebook } from "../api/pdf.api";
import { fetchAllFilesFromRepo } from "../api/github.api";
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
  const { data: session, status } = useSession();
  const router = useRouter();
  const configHandler = useMemo(() => new ConfigHandler(), []);
  const codeSegmentsHandler = new CodeSegmentsHandler();
  const codeBookHandler = new CodeBookHandler();
  const sessionData = useSession();
  const userId = sessionData?.data?.user?.id;

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

  const handleNext = async () => {
    if (currentStep === 1) {
      configHandler.addRepo(repos);
    }

    if (currentStep === 4) {
      const configData = configHandler.createSchemaData(userId);
      codeSegmentsHandler.clearAll();
      codeSegmentsHandler.initiate();

      const toastId = toast.loading("Starting repository fetch...");

      try {
        const result = await createConfig(configData);
        codeBookHandler.initiate();
        codeBookHandler.setId(result.codebookId);

        const repoList = configHandler.getRepos();
        const totalRepos = repoList.length;

        for (let i = 0; i < totalRepos; i++) {
          const repo = repoList[i];
          
          toast.loading(
            `Fetching repo ${i + 1} of ${totalRepos}: ${repo}`, 
            { id: toastId }
          );

          const fullUrl = `https://github.com/${repo}/`;
          const data = await fetchAllFilesFromRepo(fullUrl);
          
          codeSegmentsHandler.addSegments(data);
        }

        const configUpdated = codeBookHandler.createSchemaData(userId);
        await modifyCodebook(result.codebookId, configUpdated);

        toast.success("Successfully Initialized Codebook!", { id: toastId });
        router.push("/editor");
      } catch (error) {
        toast.error("Failed to initialize. Please check your GitHub links.", { id: toastId });
        console.error("Initialization Error:", error);
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
