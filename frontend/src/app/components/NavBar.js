"use client";

import Link from "next/link";
import Logo from "./Logo";
import NavButton from "./NavButton";
import IconButton from "./IconButton";
import { useState } from "react";

const navLink = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "About Us", href: "/about" },
  { name: "Contribute", href: "/contribute" },
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
      hidden lg:flex justify-between items-center p-5
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
      lg:hidden flex justify-between items-center p-5
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
  const crossBarOne = `rotate-45 translate-y-2`;
  const crossBarHidden = `opacity-0`;
  const crossBarTwo = `-rotate-45 -translate-y-2`;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group z-60 relative"
      >
        <div className={`${hamBurgerLine} ${isOpen ? crossBarOne : ""}`}></div>
        <div
          className={`${hamBurgerLine} ${isOpen ? crossBarHidden : ""}`}
        ></div>
        <div className={`${hamBurgerLine} ${isOpen ? crossBarTwo : ""}`}></div>
      </button>

      {/* Makes the background dark */}
      <div
        onClick={() => setIsOpen(false)}
        className={`
          fixed inset-0 h-screen w-screen bg-black/20 
          transition-opacity duration-300 ease-in-out
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          z-40 lg:hidden
        `}
      />

      <div
        className={`
          fixed top-0 right-0 h-screen w-[75vw] bg-white shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          lg:hidden
        `}
      >
        <div className="flex flex-col p-10 pt-20 space-y-4">
          {navLink.map((nav) => (
            <Link
              onClick={() => setIsOpen(false)}
              key={nav.name}
              href={nav.href}
            >
              {nav.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LogoSection() {
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
        <NavButton key={link.name} href={link.href}>
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
