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
  const [isOpen, setIsOpen] = useState(false);

  const hamBurgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;
  const closedProperties = ``; 
  const crossBarOne = `rotate-45 translate-y-2`;
  const crossBarHidden = `opacity-0`;
  const crossBarTwo = `-rotate-45 -translate-y-2`;

  return (
    <button onClick={() => setIsOpen(!isOpen)} className={`group`}>
      <div className={`${hamBurgerLine} ${isOpen ? crossBarOne : closedProperties}`}></div>
      <div className={`${hamBurgerLine} ${isOpen ? crossBarHidden : closedProperties}`}></div>
      <div className={`${hamBurgerLine} ${isOpen ? crossBarTwo : closedProperties}`}></div>
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
