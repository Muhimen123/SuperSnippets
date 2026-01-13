import Logo from "../../components/Logo";
import TextField from "../../components/TextField";
import Link from "next/link";
import { useState } from "react";

export default function VerificationForm({ onContinueClick }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleVerify = () => {
    setError("");
    if (!code) {
      setError("Verification code is required");
      return;
    }
    // In a real app, we would verify the code here
    onContinueClick();
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
