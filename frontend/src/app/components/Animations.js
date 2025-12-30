"use client";

import { motion } from "framer-motion";

export function SlideIn({ key = "key", children, direction, duration }) {
  const xValue = direction === "left" ? "-200%" : "200%";

  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, x: xValue, scale: 0.9, opacity: 0 }}
      animate={{ opacity: 1, x: 0, scale: 1, opacity: 1 }}
      exit={{ opacity: 0, x: xValue, scale: 0.9, opacity: 0 }}
      transition={{ duration: duration, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
