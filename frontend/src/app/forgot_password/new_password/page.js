"use client";

import TileBackground from "../../components/TileBackground";
import DesignSVG from "../../components/DesignSVG";
import NewPasswordForm from "../components/NewPasswordForm";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SlideIn } from "@/app/components/Animations";

export default function NewPassword() {
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
      <div className="min-h-screen flex ml-20">
        <div
          className={`w-full lg:w-1/2 flex items-center justify-end px-8 pr-24`}
        >
          <AnimatePresence>
            {isVisible && (
              <SlideIn direction={"right"}>
                <NewPasswordForm onConfirmClick={handleNavigate} />
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
