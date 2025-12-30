"use client";

import Logo from "../../components/Logo";
import TextField from "../../components/TextField";
import PasswordField from "../../components/PasswordField";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm({ onSignUpClick, onHelpClick }) {
  const router = useRouter();
  return (
    <div>
      <div className="w-full max-w-xs">
        <div className="mb-8 ml-18">
          <Link href={"/"}>
            <Logo />
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-600 text-sm">
            Good to see you back. So how is your day going?
          </p>
        </div>

        <button className="w-full bg-black text-white py-3 px-4 rounded-lg mb-6 flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors">
          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
            <span className="text-black text-xs font-bold">G</span>
          </div>
          Log in with Google
        </button>

        <div className="text-center text-gray-500 text-sm mb-6">
          Or use Email
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/dashboard");
          }}
        >
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
            Log In →
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          New Here?{" "}
          <button
            className={`underline font-medium cursor-pointer`}
            onClick={(event) => {
              event.preventDefault();
              onSignUpClick();
            }}
          >
            Sign Up
          </button>
        </p>
        <p className="text-center text-sm text-gray-600 mt-2">
          Forgot your password?{" "}
          <button
            className={`underline font-medium cursor-pointer`}
            onClick={(event) => {
              event.preventDefault();
              onHelpClick();
            }}
          >
            Here to Help!
          </button>
        </p>
      </div>
    </div>
  );
}
