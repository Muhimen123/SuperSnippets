import Logo from "../../components/Logo";
import TextField from "../../components/TextField";
import Link from "next/link";

export default function VerificationForm() {
  return (
    <div className="w-full lg:w-1/2 flex items-center justify-left px-8 pl-24">
      <div className="w-full max-w-xs">
        <div className="mb-8">
          <Logo />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Verification Code</h2>
          <p className="text-gray-600 text-sm">
            Check your mail or spam
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <TextField
              label="CODE"
              type="text"
              placeholder="K2FTW"
            />
          </div>

          <Link
            href="/forgot_password/new-password"
            className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
          >
            Continue →
          </Link>
        </form>
      </div>
    </div>
  );
}