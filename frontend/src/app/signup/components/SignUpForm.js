import Link from "next/link";
import Logo from "../../components/Logo";
import TextField from "../../components/TextField";
import PasswordField from "../../components/PasswordField";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { doSignUp, doSocialSignUp } from "../../actions";


export default function SignUpForm( {onLoginClick} ) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const handleSignUp = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    startTransition(async () => {
      const result = await doSignUp({ email, password });

      if (result?.error) {
        setError(result.error);
        return;
      }

      router.push("/login");
    });
  }

  return (
    <div>
      <div className="w-full max-w-xs">
        <div className="mb-8 ml-18">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Create an Account</h2>
          <p className="text-gray-600 text-sm">
            Your Codebook stays with you. Whether you are in Earth or in Mars!
          </p>
        </div>

        <form action={async () => {
          const formData = new FormData();
          formData.append('action', 'google');
          await doSocialSignUp(formData);
        }}>
          <button type="submit" className="w-full bg-black text-white py-3 px-4 rounded-lg mb-6 flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors">
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <span className="text-black text-xs font-bold">G</span>
            </div>
            Sign up with Google
          </button>
        </form>

        <div className="text-center text-gray-500 text-sm mb-6">
          Or use Email
        </div>

        <form className="space-y-4" onSubmit={handleSignUp}>
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

          <div>
            <PasswordField 
              label="PASSWORD" 
              showToggle={true} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-60"
            disabled={pending}
          >
            {pending ? "Creating account..." : "Sign Up →"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already a Member?{" "}
          <button
            className={`underline font-medium cursor-pointer`}
            onClick={(event) => {
              event.preventDefault();
              onLoginClick();
            }}
          >
            LOG IN
          </button>
        </p>
      </div>
    </div>
  );
}
