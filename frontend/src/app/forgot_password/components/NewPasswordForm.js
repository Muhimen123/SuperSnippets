import Link from "next/link";
import Logo from "../../components/Logo";
import PasswordField from "../../components/PasswordField";

export default function NewPasswordForm({ onConfirmClick }) {
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
          <div>
            <PasswordField label="PASSWORD" showToggle={false} />
          </div>

          <button
            className="cursor-pointer block w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors text-center"
            onClick={(event) => {
              event.preventDefault();
              onConfirmClick();
            }}
          >
            Confirm →
          </button>
        </form>
      </div>
    </div>
  );
}
