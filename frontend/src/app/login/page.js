"use client";

import TileBackground from "../components/TileBackground";
import DesignSVG from "../components/DesignSVG";
import LoginForm from "./components/LoginForm";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SlideIn } from "../components/Animations";

export default function LogIn() {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const handleNavigate = () => {
    setIsVisible(false); // Trigger the exit animation
    setTimeout(() => {
      router.push("/signup"); // Navigate after animation completes (0.5s)
    }, 750);
  };

  return (
    <TileBackground>
      <div className="min-h-screen flex">
        {/* Left side - Abstract Pattern */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-end">
          <AnimatePresence>
            {isVisible && (
              <SlideIn direction={"left"} duration={0.75}>
                <DesignSVG className="w-[500px] h-[600px]" />
              </SlideIn>
            )}
          </AnimatePresence>
        </div>

        <div
          className={`w-full lg:w-1/2 flex items-center justify-left px-8 pl-24`}
        >
          <AnimatePresence>
            {isVisible && (
              <SlideIn direction={"right"} duration={0.75}>
                <LoginForm onSignUpClick={handleNavigate} />
              </SlideIn>
            )}
          </AnimatePresence>
        </div>
      </div>
    </TileBackground>
  );
}
