import Logo from "../../components/Logo";
import TextField from "../../components/TextField";
import Link from "next/link";

export default function ResetPasswordForm({ onSendCodeClick }) {
  return (
    <div className="">
      <div className="w-full max-w-xs">
        <div className="mb-8 ml-18">
          <Link href={"/"}>
            <Logo />
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Reset Password</h2>
          <p className="text-gray-600 text-sm">
            Enter your email address below and we will send you verification
            code
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

          <button
            href="/forgot_password/verification"
            className={`cursor-pointer w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center`}
            onClick={(event) => {
              event.preventDefault();
              onSendCodeClick();
            }}
          >
            Send Code →
          </button>
        </form>
      </div>
    </div>
  );
}
