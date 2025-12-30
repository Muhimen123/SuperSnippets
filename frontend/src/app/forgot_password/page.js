"use client";

import TileBackground from "../components/TileBackground";
import DesignSVG from "../components/DesignSVG";
import ResetPasswordForm from "./components/ResetPasswordForm";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SlideIn } from "../components/Animations";

export default function ResetPassword() {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const handleNavigate = () => {
    setIsVisible(false); // Trigger the exit animation
    setTimeout(() => {
      router.push("/forgot_password/verification"); // Navigate after animation completes (0.25s)
    }, 250);
  };

  return (
    <TileBackground>
      <div className="min-h-screen flex ml-20">
        {/* Left side - Reset Password Form */}
        <div
          className={`w-full lg:w-1/2 flex items-center justify-end px-8 pr-24`}
        >
          <AnimatePresence>
            {isVisible && (
              <SlideIn direction={"right"}>
                <ResetPasswordForm onSendCodeClick={handleNavigate}/>
              </SlideIn>
            )}
          </AnimatePresence>
        </div>

        {/* Right side - Abstract Pattern */}
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
