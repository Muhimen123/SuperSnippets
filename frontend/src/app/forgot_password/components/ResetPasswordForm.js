import Logo from "../../components/Logo";
import TextField from "../../components/TextField";
import Link from "next/link";

export default function ResetPasswordForm() {
  return (
    <div className="w-full lg:w-1/2 flex items-center justify-end px-8 pr-24">
      <div className="w-full max-w-xs">
        <div className="mb-8 ml-18">
          <Logo />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Reset Password</h2>
          <p className="text-gray-600 text-sm">
            Enter your email address below and we will send you verification code
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <TextField
              label="EMAIL"
              type="email"
              placeholder="johndoe@email.com"
            />
          </div>

          <Link
            href="/forgot_password/verification"
            className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
          >
            Send Code →
          </Link>
        </form>
      </div>
    </div>
  );
}