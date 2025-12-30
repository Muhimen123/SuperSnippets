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
    }, 250);
  };

  return (
    <TileBackground>
      <div className="min-h-screen flex">
        {/* Left side - Abstract Pattern */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-end">
          <AnimatePresence>
            {isVisible && (
              <motion.div 
                initial={{ opacity: 0, x: 0, scale: 0.9 }} 
                exit={{ opacity: 0, x: "120%", scale: 0.9 }} 
                animate={{ opacity: 1, x: 0, scale: 1}}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <DesignSVG className="w-[500px] h-[600px]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className={`w-full lg:w-1/2 flex items-center justify-left px-8 pl-24`}
        >
          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0, x: 0, scale: 0.9 }}
                exit={{ opacity: 0, x: "-120%", scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <LoginForm onSignUpClick={handleNavigate} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </TileBackground>
  );
}
