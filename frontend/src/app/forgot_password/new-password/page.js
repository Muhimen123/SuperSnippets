import TileBackground from "../../components/TileBackground";
import DesignSVG from "../../components/DesignSVG";
import NewPasswordForm from "../components/NewPasswordForm";

export default function NewPassword() {
  return (
    <TileBackground>
      <div className="min-h-screen flex ml-20">
        {/* Left side - New Password Form */}
        <NewPasswordForm />

        {/* Right side - Abstract Pattern */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-left">
          <DesignSVG className="w-[500px] h-[600px]" />
        </div>
      </div>
    </TileBackground>
  );
}