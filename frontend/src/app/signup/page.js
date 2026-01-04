"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TileBackground from "../components/TileBackground";
import DesignSVG from "../components/DesignSVG";
import SignUpForm from "./components/SignUpForm";
import { AnimatePresence } from "framer-motion";
import { SlideIn } from "../components/Animations";

export default function SignUp() {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const handleNavigate = () => {
    setIsVisible(false); // Trigger the exit animation
    setTimeout(() => {
      router.push("/login"); // Navigate after animation completes (0.25s)
    }, 250);
  };


  return (
    <TileBackground>
      <div className="min-h-screen flex">
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end px-8 lg:pr-24">
          <AnimatePresence>
            {isVisible && (
              <SlideIn direction={"right"}>
                <SignUpForm onLoginClick={handleNavigate} />
              </SlideIn>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden lg:flex lg:w-1/2 items-center justify-left">
          <AnimatePresence>
            {isVisible && (
              <SlideIn direction={"left"}>
                <DesignSVG className="w-[500px] h-[600px]" />
              </SlideIn>
            )}
          </AnimatePresence>
        </div>
      </div>
    </TileBackground>
  );
}
