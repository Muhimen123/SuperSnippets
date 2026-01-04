"use client";

import TileBackground from "../components/TileBackground";
import DesignSVG from "../components/DesignSVG";
import LoginForm from "./components/LoginForm";
import { AnimatePresence } from "framer-motion";
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
    }, 250);
  };

  const handleNavigateForgotPassword = () => {
    setIsVisible(false); // Trigger the exit animation
    setTimeout(() => {
      router.push("/forgot_password"); // Navigate after animation completes (0.25s)
    }, 250);
  };

  return (
    <TileBackground>
      <div className="min-h-screen flex">
        {/* Left side - Abstract Pattern */}
        <div className="hidden w-0 lg:flex lg:w-1/2 items-center justify-end">
          <AnimatePresence>
            {isVisible && (
              <SlideIn direction={"right"}>
                <DesignSVG className="w-[500px] h-[600px]" />
              </SlideIn>
            )}
          </AnimatePresence>
        </div>

        <div
          className={`w-full lg:w-1/2 flex items-center justify-center lg:justify-start px-8 lg:pl-24`}
        >
          <AnimatePresence>
            {isVisible && (
              <SlideIn direction={"left"}>
                <LoginForm
                  onSignUpClick={handleNavigate}
                  onHelpClick={handleNavigateForgotPassword}
                />
              </SlideIn>
            )}
          </AnimatePresence>
        </div>
      </div>
    </TileBackground>
  );
}
