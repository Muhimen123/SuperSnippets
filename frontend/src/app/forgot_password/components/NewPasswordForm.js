import Link from "next/link";
import Logo from "../../components/Logo";
import PasswordField from "../../components/PasswordField";
import { useState } from "react";
import { MOCK_AUTH_DATABASE } from "../../../utility/mockAuthDatabase";

export default function NewPasswordForm({ onConfirmClick }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    setError("");
    if (!password) {
      setError("Password is required");
      return;
    }

    const email = localStorage.getItem("resetPasswordEmail");
    if (!email) {
      setError("Something went wrong. Please start over.");
      return;
    }

    const userIndex = MOCK_AUTH_DATABASE.findIndex((u) => u.email === email);
    if (userIndex !== -1) {
      MOCK_AUTH_DATABASE[userIndex].password = password;
      localStorage.removeItem("resetPasswordEmail");
      onConfirmClick();
    } else {
      setError("User not found");
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
            Enter new password and don&apos;t forget it this time ;)
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
