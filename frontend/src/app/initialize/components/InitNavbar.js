import Logo from "@/app/components/Logo";
import Link from "next/link";

export default function InitNavbar() {
  return (
    <nav
      className={`
			fixed top-0 w-full z-50 
      flex justify-between items-center p-5 
      border-b border-white/0	
		`}
    >
      <Link href={`/`}>
        <Logo />
      </Link>
    </nav>
  );
}
