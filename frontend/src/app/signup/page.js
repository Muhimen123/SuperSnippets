import TileBackground from "../components/TileBackground";
import Logo from "../components/Logo";
import TextField from "../components/TextField";
import PasswordField from "../components/PasswordField";
import DesignSVG from "../components/DesignSVG";

export default function SignUp() {
  return (
    <TileBackground>
      <div className="min-h-screen flex">
        {/* Left side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8">
          <div className="w-full max-w-md">
            <div className="mb-8 ml-36">
              <Logo />
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Create an Account</h2>
              <p className="text-gray-600 text-sm">
                Your Codebook days start with you. Whether you are a Earth or a
                Mars.
              </p>
            </div>

            <button className="w-full bg-black text-white py-3 px-4 rounded-lg mb-6 flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors">
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                <span className="text-black text-xs font-bold">G</span>
              </div>
              Sign up with Google
            </button>

            <div className="text-center text-gray-500 text-sm mb-6">
              Or use Email
            </div>

            <form className="space-y-4">
              <div>
                <TextField
                  label="EMAIL"
                  type="email"
                  placeholder="johndoe@email.com"
                />
              </div>

              <div>
                <PasswordField label="PASSWORD" showToggle={true} />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Sign Up &rarr;
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already a Member?{" "}
              <a
                href="/login"
                className="underline font-medium"
              >
                LOG IN
              </a>
            </p>
          </div>
        </div>

        {/* Right side - Abstract Pattern */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
          <DesignSVG className="w-96 h-[500px]" />
        </div>
      </div>
    </TileBackground>
  );
}