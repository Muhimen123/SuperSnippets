import Logo from "../../components/Logo";
import TextField from "../../components/TextField";
import Link from "next/link";
import { useState } from "react";

export default function VerificationForm({ onContinueClick }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    setError("");
    if (!code) {
      setError("Verification code is required");
      return;
    }

    const email = localStorage.getItem("resetPasswordEmail");
    if (!email) {
      setError("Session expired. Please start over.");
      return;
    }

    try {
      const response = await fetch("/api/auth/verify-reset-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code: code.trim() }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        setError(payload?.error || "Invalid verification code");
        return;
      }

      console.log("Verification code verified successfully");
      // Store code for password reset
      localStorage.setItem("resetCode", code.trim());
      onContinueClick();
    } catch {
      setError("Unable to verify code right now");
    }
  };

  return (
    <div className="">
      <div className="w-full max-w-xs">
        <div className="mb-8">
          <Link href={"/"}>
            <Logo />
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Verification Code</h2>
          <p className="text-gray-600 text-sm">Check your mail or spam</p>
        </div>

        <form className="space-y-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <TextField 
              label="CODE" 
              type="text" 
              placeholder="K2FTW" 
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <button
            className="cursor-pointer w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
            onClick={(event) => {
              event.preventDefault();
              handleVerify();
            }}
          >
            Continue →
          </button>
        </form>
      </div>
    </div>
  );
}
