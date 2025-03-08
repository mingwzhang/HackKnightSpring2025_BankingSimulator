"use client";
import { useState } from "react";

export default function CustomerBooth({ parentFunction }) {
  // "hidden" means the customer is centered but invisible;
  // "centerVisible" means the customer is visible at center.
  const [customerState, setCustomerState] = useState("hidden");
  const [animating, setAnimating] = useState(false);
  // animationType: "enter" for fade-in (walking in) or "exit" for walking out to right.
  const [animationType, setAnimationType] = useState(null);

  // Handle the end of the horizontal movement animation (on the wrapper)
  const handleAnimationEnd = (e) => {
    if (e.animationName === "enterAnimation") {
      // Finished enter animation: customer is now visible at center.
      setAnimating(false);
      setAnimationType(null);
      setCustomerState("centerVisible");
    } else if (e.animationName === "exitAnimation") {
      // Finished exit animation: reset customer back to center (hidden)
      setAnimating(false);
      setAnimationType(null);
      setCustomerState("hidden");
    }
  };

  // Trigger the enter (fade-in + walk in) animation with bob effect
  const moveToCenter = () => {
    if (!animating && customerState === "hidden") {
      parentFunction()
      setAnimating(true);
      setAnimationType("enter");
    }
  };

  // Trigger the exit (walk out to right) animation with bob effect
  const moveToRight = () => {
    if (!animating && customerState === "centerVisible") {
      setAnimating(true);
      setAnimationType("exit");
    }
  };

  // Determine the wrapper's animation class based on the current animation type
  let wrapperAnimationClass = "";
  if (animating) {
    wrapperAnimationClass =
      animationType === "enter" ? "animate-enter" : "animate-exit";
  }

  /* 
    For horizontal centering:
    - Booth width is 600px.
    - Customer width is now 250px.
    - Center = (600 - 250) / 2 = 175px.
    Edit the left value here if booth or customer dimensions change.
  */
  const restingWrapperStyle = !animating
    ? customerState === "centerVisible"
      ? {
          left: "175px",
          opacity: 1,
          // Explicitly set the transform to match the end of enterAnimation
          transform: "translateX(0) translateY(0) scale(1)"
        }
      : {
          left: "175px",
          opacity: 0,
          transform: "translateX(0) translateY(0) scale(1)"
        }
    : {};

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Booth Container */}
      <div
        id="game-container"
        className="relative w-[600px] h-[400px] bg-[rgba(65,227,255,0.2)] border-2 border-blue-400 shadow-lg rounded-xl flex items-center justify-center overflow-hidden"
      >
        {/* Customer Wrapper: handles horizontal movement, fading, and scale/translate adjustments */}
        {/* 
          Edit the inline "bottom" style below (currently set to "-10px") 
          if you need to change how far below the booth the rectangle appears.
        */}
        <div
          className={`absolute w-[250px] h-[250px] ${wrapperAnimationClass}`}
          style={
            animating
              ? { bottom: "-10px" }
              : { ...restingWrapperStyle, bottom: "-10px" }
          }
          onAnimationEnd={handleAnimationEnd}
        >
          {/* Customer Inner: visual element that gets the bob (walking) effect */}
          <img src="https://i.kym-cdn.com/photos/images/newsfeed/002/417/159/98e"
            className={`h-full rounded-md ${
              animating ? "animate-bop" : ""
            }`}
          ></img>
        </div>
        <p className="text-lg font-semibold text-white">Inspector's Booth</p>
      </div>
      {/* Control Buttons */}
      <div className="mt-4 flex gap-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          onClick={moveToCenter}
          disabled={animating || customerState !== "hidden"}
        >
          Move to Center
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          onClick={moveToRight}
          disabled={animating || customerState !== "centerVisible"}
        >
          Move to Right
        </button>
      </div>
      <style jsx>{`
        /* ----------------------------
           Main Movement Animations
           ----------------------------
           Enter Animation: 
           - Starts with a scale of 0.8 and translateY(100px) to simulate "walking in" from below.
           - Ends at scale 1 and translateY(0).
           Edit the scale (0.8) and translateY (100px) values here as needed.
           Duration is set to 2s (edit here if necessary).
        */
        @keyframes enterAnimation {
          from {
            transform: translateX(0) translateY(100px) scale(0.8);
            opacity: 0;
          }
          to {
            transform: translateX(0) translateY(0) scale(1);
            opacity: 1;
          }
        }
        /* Exit Animation remains unchanged */
        @keyframes exitAnimation {
          from {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
          to {
            /* Moves 380px to the right.
               Adjust the translateX value here if booth or customer sizes change.
            */
            transform: translateX(380px) scale(1);
            opacity: 0;
          }
        }
        .animate-enter {
          animation: enterAnimation 2s ease-in-out forwards; /* Duration: 2s (edit here) */
        }
        .animate-exit {
          animation: exitAnimation 2s ease-in-out forwards; /* Duration: 2s (edit here) */
        }
        /* ----------------------------
           Bob (Walking) Animation
           ----------------------------
           This creates a subtle vertical "bop" effect to simulate walking.
           Here the vertical movement is reduced to 5px to help keep the bottom aligned.
           Edit the duration (currently 0.5s) for a faster or slower bob.
        */
        @keyframes bopAnimation {
          0% { transform: translateY(-5px); }
          25% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
          75% { transform: translateY(0); }
          100% { transform: translateY(-5px); }
        }
        .animate-bop {
          animation: bopAnimation 0.5s ease-in-out infinite; /* Bob cycle (edit duration here) */
        }
      `}</style>
    </div>
  );
}
