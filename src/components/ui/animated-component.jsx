"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function AnimatedComponent({
  children,
  direction = "vertical",
  distance = 100,
  delay = 0,
  reverse = false,
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  config = { tension: 50, friction: 25 },
  triggerAnimation = true,
}) {
  const controls = useAnimation();

  useEffect(() => {
    if (triggerAnimation) {
      controls.start("visible");
    }
  }, [triggerAnimation, controls]);

  const variants = {
    hidden: {
      y: direction === "vertical" ? (reverse ? distance : -distance) : 0,
      x: direction === "horizontal" ? (reverse ? distance : -distance) : 0,
      opacity: initialOpacity,
      scale,
    },
    visible: {
      y: 0,
      x: 0,
      opacity: animateOpacity ? 1 : initialOpacity,
      scale: 1,
      transition: { 
        type: "spring",
        ...config,
        delay
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};