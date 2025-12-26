import TileBackground from "../components/TileBackground";
import ContentSection from "./components/ContentSection";
import DirectionController from "./components/DirectionController";
import InitNavbar from "./components/InitNavbar";
import StepperProgressBar from "./components/StepperProgressBar";

export default function Initialize() {
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
              flex flex-col items-center justify-center gap-15
            `}
          >
            <StepperProgressBar />
            <ContentSection />
            <DirectionController />
          </div>
        </div>
      </TileBackground>
    </div>
  );
}
