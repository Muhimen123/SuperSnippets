"use client";

import TileBackground from "../../components/TileBackground";
import DesignSVG from "../../components/DesignSVG";
import VerificationForm from "../components/VerificationForm";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SlideIn } from "@/app/components/Animations";

export default function VerificationCode() {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const handleNavigate = () => {
    setIsVisible(false); // Trigger the exit animation
    setTimeout(() => {
      router.push("/forgot_password/new_password"); // Navigate after animation completes (0.25s)
    }, 250);
  };

  return (
    <TileBackground>
      <div className="min-h-screen flex">
        {/* Left side - Abstract Pattern */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-end">
          <AnimatePresence>
            {isVisible && (
              <SlideIn direction={"right"}>
                <DesignSVG className="w-[500px] h-[600px]" />
              </SlideIn>
            )}
          </AnimatePresence>
        </div>

        {/* Right side - Verification Code Form */}
        <div
          className={`w-full lg:w-1/2 flex items-center justify-left px-8 pl-24`}
        >
          <AnimatePresence>
            {isVisible && (
              <SlideIn direction={"left"}>
                <VerificationForm onContinueClick={handleNavigate} />
              </SlideIn>
            )}
          </AnimatePresence>
        </div>
      </div>
    </TileBackground>
  );
}
