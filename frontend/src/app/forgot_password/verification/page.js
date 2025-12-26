import TileBackground from "../../components/TileBackground";
import DesignSVG from "../../components/DesignSVG";
import VerificationForm from "../components/VerificationForm";

export default function VerificationCode() {
  return (
    <TileBackground>
      <div className="min-h-screen flex">
        {/* Left side - Abstract Pattern */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-end">
          <DesignSVG className="w-[500px] h-[600px]" />
        </div>

        {/* Right side - Verification Code Form */}
        <VerificationForm />
      </div>
    </TileBackground>
  );
}