import TileBackground from "../components/TileBackground";
import DesignSVG from "../components/DesignSVG";
import LoginForm from "./components/LoginForm";

export default function LogIn() {
  return (
    <TileBackground>
      <div className="min-h-screen flex">
        {/* Left side - Abstract Pattern */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-end">
          <DesignSVG className="w-[500px] h-[600px]" />
        </div>

        {/* Right side - Login Form */}
        <LoginForm />
      </div>
    </TileBackground>
  );
}
