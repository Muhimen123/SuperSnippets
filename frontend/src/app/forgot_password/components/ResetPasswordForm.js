import Logo from "../../components/Logo";
import TextField from "../../components/TextField";
import Link from "next/link";
import { useState } from "react";

export default function ResetPasswordForm({ onSendCodeClick }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSendCode = async () => {
    setError("");

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      setError("Email is required");
      return;
    }

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        setError(payload?.error || "Email not found");
        return;
      }

      console.log("Reset password email found:", normalizedEmail); //debug log

      // Store email in localStorage to use in next steps
      localStorage.setItem("resetPasswordEmail", normalizedEmail);
      onSendCodeClick();
    } catch (error) {
      setError("Unable to verify email right now");
    }
  };

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
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <TextField
              label="EMAIL"
              type="email"
              placeholder="johndoe@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            className={`cursor-pointer w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center`}
            onClick={(event) => {
              event.preventDefault();
              handleSendCode();
            }}
          >
            Send Code →
          </button>
        </form>
      </div>
    </div>
  );
}
