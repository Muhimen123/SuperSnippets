"use client";

import { useState } from "react";
import TileBackground from "../components/TileBackground";
import ContentSection from "./components/ContentSection";
import DirectionController from "./components/DirectionController";
import InitNavbar from "./components/InitNavbar";
import StepperProgressBar from "./components/StepperProgressBar";

export default function Initialize() {
  const steps = [
    { id: 1, name: `Github Link` },
    { id: 2, name: `Custom Code Upload` },
    { id: 3, name: `Constraints` },
    { id: 4, name: `Generate` },
  ];

  const totalSteps = steps.length;

  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () =>
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
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
              w-[300px] md:w-[500px] lg:w-[700px] 
              flex flex-col items-center justify-center gap-16
            `}
          >
            <StepperProgressBar />
            <ContentSection activeStep={currentStep} />
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
