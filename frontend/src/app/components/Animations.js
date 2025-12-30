"use client";

import { motion } from "framer-motion";

export function SlideIn({ key = "key", children, direction, duration = .25}) {
  const xValue = direction === "left" ? "-120%" : "120%";

  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, x: 0, scale: 0.9 }}
      exit={{ opacity: 0, x: xValue, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: duration, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
