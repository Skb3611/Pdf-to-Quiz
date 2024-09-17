"use client";

import { useEffect, useState } from "react";

import AnimatedCircularProgressBar from "@/components/magicui/animated-circular-progress-bar";

export function MagicLoader({index,value}) {

  // useEffect(() => {
  //   const handleIncrement = (prev) => {
  //     if (prev === 100) {
  //       return 0;
  //     }
  //     return prev + 10;
  //   };
  //   setValue(handleIncrement);
  //   const interval = setInterval(() => setValue(handleIncrement), 2000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <>
    <AnimatedCircularProgressBar
     index={index}
      max={100}
      min={0}
      value={value}
      gaugePrimaryColor="rgb(79 70 229)"
      gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
      />
      </>
  );
}
