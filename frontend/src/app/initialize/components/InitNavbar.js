import Logo from "@/app/components/Logo";
import Link from "next/link";

export default function InitNavbar() {
  return (
    <nav
      className={`
			fixed top-0 w-full z-50 
      hidden lg:flex justify-between items-center p-5
      bg-white/0 backdrop-blur-xs 
      border-b border-white/0	
		`}
    >
      <Link href={`/`}>
        <Logo />
      </Link>
    </nav>
  );
}
