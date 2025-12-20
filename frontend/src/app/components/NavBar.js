import Link from "next/link";
import Logo from "./Logo";
import NavButton from "./NavButton";
import IconButton from "./IconButton";

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
  return (
    <div className="
			flex
			justify-center
			gap-2
		">
			<NavButton href="/">Home</NavButton>
			<NavButton href="/">Features</NavButton>
			<NavButton href="/">About Us</NavButton>
			<NavButton href="/">Contribute</NavButton>
    </div>
  );
}

function GithubLink() {
	return (
		<div className="
      flex
      justify-center items-center
      gap-2
    ">
			<NavButton href="/login">Log in</NavButton>
			<IconButton>Star on Github</IconButton>
		</div>
	);
}
