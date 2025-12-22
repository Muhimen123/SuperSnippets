import TileBackground from "../../components/TileBackground";
import Logo from "../../components/Logo";
import PasswordField from "../../components/PasswordField";
import DesignSVG from "../../components/DesignSVG";
import Link from "next/link";

export default function NewPassword() {
  return (
    <TileBackground>
      <div className="min-h-screen flex">
        {/* Left side - New Password Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8">
          <div className="w-full max-w-xs">
            <div className="mb-8">
              <Logo />
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">New Password</h2>
              <p className="text-gray-600 text-sm">
                Enter new password and don't forget it this time ;)
              </p>
            </div>

            <form className="space-y-6">
              <div>
                <PasswordField
                  label="PASSWORD"
                  showToggle={false}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Confirm →
              </button>
            </form>
          </div>
        </div>

        {/* Right side - Abstract Pattern */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
          <DesignSVG className="w-[500px] h-[600px]" />
        </div>
      </div>
    </TileBackground>
  );
}