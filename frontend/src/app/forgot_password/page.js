import TileBackground from "../components/TileBackground";
import DesignSVG from "../components/DesignSVG";
import ResetPasswordForm from "./components/ResetPasswordForm";

export default function ResetPassword() {
  return (
    <TileBackground>
      <div className="min-h-screen flex ml-20">
        {/* Left side - Reset Password Form */}
        <ResetPasswordForm />

        {/* Right side - Abstract Pattern */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-left">
          <DesignSVG className="w-[500px] h-[600px]" />
        </div>
      </div>
    </TileBackground>
  );
}