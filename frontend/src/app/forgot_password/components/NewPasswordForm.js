import Link from "next/link";
import Logo from "../../components/Logo";
import PasswordField from "../../components/PasswordField";
import { useState } from "react";

export default function NewPasswordForm({ onConfirmClick }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    setError("");
    if (!password) {
      setError("Password is required");
      return;
    }

    const email = localStorage.getItem("resetPasswordEmail");
    const code = localStorage.getItem("resetCode");

    if (!email || !code) {
      setError("Session expired. Please start over.");
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code, password }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        setError(payload?.error || "Failed to reset password");
        return;
      }

      console.log("Password reset successfully");
      // Clean up localStorage
      localStorage.removeItem("resetPasswordEmail");
      localStorage.removeItem("resetCode");
      onConfirmClick();
    } catch {
      setError("Unable to reset password right now");
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
          <h2 className="text-2xl font-bold mb-2">New Password</h2>
          <p className="text-gray-600 text-sm">
            Enter new password and don't forget it this time ;)
          </p>
        </div>

        <form className="space-y-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <PasswordField 
              label="PASSWORD" 
              showToggle={false} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="cursor-pointer block w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors text-center"
            onClick={(event) => {
              event.preventDefault();
              handleConfirm();
            }}
          >
            Confirm →
          </button>
        </form>
      </div>
    </div>
  );
}
