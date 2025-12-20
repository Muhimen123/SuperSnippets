import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav
      className="
			fixed top-0 w-full z-50 
      flex justify-between items-center p-5
      bg-white/0 backdrop-blur-xs 
      border-b border-white/0	
		"
    >
      <LogoSection />
      <PageNavigation />
      <GithubLink />
    </nav>
  );
}

function LogoSection() {
  return (
		<Link href={"/"}>
			<Logo />
		</Link>
	);
}

function PageNavigation() {
  return <div>Navigation Buttons</div>;
}

function GithubLink() {
  return <div>Github Section</div>;
}
