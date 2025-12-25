"use client";

import Link from "next/link";
import Logo from "./Logo";
import NavButton from "./NavButton";
import IconButton from "./IconButton";
import { useState } from "react";

const navLink = [
  { key: 1, name: "Home", href: "/" },
  { key: 2, name: "Features", href: "/" },
  { key: 3, name: "About Us", href: "/" },
  { key: 4, name: "Contribute", href: "/" },
];

export default function Navbar() {
  return (
    <div>
      <DesktopNavbar />
      <MobileNavbar />
    </div>
  );
}

function DesktopNavbar() {
  return (
    <nav
      className={`
			fixed top-0 w-full z-50 
      hidden md:flex justify-between items-center p-5
      bg-white/0 backdrop-blur-xs 
      border-b border-white/0	
		`}
    >
      <LogoSection />
      <PageNavigation />
      <GithubLink />
    </nav>
  );
}

function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav
      className={`
      fixed top-0 w-full z-50
      md:hidden flex justify-between items-center p-5
      bg-white/0 backdrop-blur-xs 
      border-b border-white/0
    `}
    >
      <LogoSection />
      <HamBurgerMenu />
    </nav>
  );
}

function HamBurgerMenu() {
  return (
    <button>
      <img height={24} width={24} src="icons/hamburger-menu.svg" />
    </button>
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
    <div
      className={`
			flex
			justify-center items-center
			gap-2
		`}
    >
      {navLink.map((link) => (
        <NavButton key={link.key} href={link.href}>
          {link.name}
        </NavButton>
      ))}
    </div>
  );
}

function GithubLink() {
  return (
    <div
      className={`
      flex
      justify-center items-center
      gap-2
    `}
    >
      <NavButton href="/login">Log in</NavButton>
      <IconButton>Star on Github</IconButton>
    </div>
  );
}
