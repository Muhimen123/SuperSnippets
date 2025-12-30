"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TileBackground from "../components/TileBackground";
import DesignSVG from "../components/DesignSVG";
import SignUpForm from "./components/SignUpForm";
import { motion, AnimatePresence } from "framer-motion";
import { SlideIn } from "../components/Animations";

export default function SignUp() {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const handleNavigate = () => {
    setIsVisible(false); // Trigger the exit animation
    setTimeout(() => {
      router.push("/login"); // Navigate after animation completes (0.5s)
    }, 750);
  };

  return (
    <TileBackground>
      <div className="min-h-screen flex">
        <div className="w-full lg:w-1/2 flex items-center justify-end px-8 pr-24">
          <AnimatePresence>
            {isVisible && (
              <SlideIn direction={"left"} duration={0.75}>
                <SignUpForm onLoginClick={handleNavigate} />
              </SlideIn>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden lg:flex lg:w-1/2 items-center justify-left">
          <AnimatePresence>
            {isVisible && (
              <SlideIn direction={"right"} duration={0.75}>
                <DesignSVG className="w-[500px] h-[600px]" />
              </SlideIn>
            )}
          </AnimatePresence>
        </div>
      </div>
    </TileBackground>
  );
}
