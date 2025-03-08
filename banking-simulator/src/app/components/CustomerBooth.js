"use client";
import { useState, useEffect } from "react";

export default function customerbooth() {
  // "hidden" means the customer is centered but invisible.
  // "centerVisible" means the customer is visible at center.
  const [customerState, setCustomerState] = useState("hidden");
  const [animating, setAnimating] = useState(false);
  // animationType: "enter" for fade-in (walking in) or "exit" for walking out.
  const [animationType, setAnimationType] = useState(null);
  // Holds the current emote ("happy" or "angry") or null if no emote.
  const [emote, setEmote] = useState(null);

  // Choose the customer image based on animationType.
  const customerImage =
    animationType === "exit" ? "/img/Customer2.png" : "/img/Customer.png";

  const handleAnimationEnd = (e) => {
    if (e.animationName === "enterAnimation") {
      setAnimating(false);
      setAnimationType(null);
      setCustomerState("centerVisible");
    } else if (e.animationName === "exitAnimation") {
      setAnimating(false);
      setAnimationType(null);
      setCustomerState("hidden");
    }
  };

  const moveToCenter = () => {
    if (!animating && customerState === "hidden") {
      setAnimating(true);
      setAnimationType("enter");
    }
  };

  const moveToRight = () => {
    if (!animating && customerState === "centerVisible") {
      setAnimating(true);
      setAnimationType("exit");
    }
  };

  let wrapperAnimationClass = "";
  if (animating) {
    wrapperAnimationClass =
      animationType === "enter" ? "animate-enter" : "animate-exit";
  }

  const restingWrapperStyle = !animating
    ? customerState === "centerVisible"
      ? {
          left: "124px",
          bottom: "-10px",
          opacity: 1,
          transform: "translateX(0) translateY(0) scale(1)",
        }
      : {
          left: "124px",
          bottom: "-10px",
          opacity: 0,
          transform: "translateX(0) translateY(100px) scale(1)",
        }
    : {};

  // Emote handling: set an emote ("happy" or "angry") for 3 seconds.
  const handleEmote = (type) => {
    setEmote(type);
  };

  useEffect(() => {
    if (emote) {
      const timer = setTimeout(() => {
        setEmote(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [emote]);

  // Using GIF images for the emotes.
  const emoteImage =
    emote === "happy"
      ? "/img/sign_happy.gif"
      : emote === "angry"
      ? "/img/sign_angry.gif"
      : null;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Booth Container */}
      <div
        id="game-container"
        className="relative w-[600px] h-[400px] border-2 border-blue-400 shadow-lg rounded-xl flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/img/bank_background.png)',
          backgroundSize: "1000px auto",
          backgroundPosition: "center",
        }}
      >
        <img
          src="/img/glass.png"
          alt="Glass Overlay"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-20"
        />

        <div
          className={`absolute w-[350px] h-[350px] ${wrapperAnimationClass}`}
          style={
            animating
              ? { bottom: "-10px" }
              : { ...restingWrapperStyle, bottom: "-10px" }
          }
          onAnimationEnd={handleAnimationEnd}
        >
          {/* Main Customer Image */}
          <img
            src={customerImage}
            alt="Customer"
            className={`h-full w-full object-contain rounded-md ${
              animating ? "animate-bop" : ""
            }`}
          />

          {/* Emote Image: positioned at customer's right ear */}
          {emote && (
            <div
              className="absolute w-20 h-20"
              style={{ top: "15%", right: "15%" }}
            >
              <img
                src={emoteImage}
                alt="Emote"
                className="w-full h-full object-contain curve-emote"
              />
            </div>
          )}
        </div>

        <p className="text-lg font-semibold text-white">Inspector's Booth</p>
      </div>

      {/* Control Buttons Layout */}
      <div className="mt-4 flex gap-4 items-center">
        {/* Emotion Buttons (Left Side) */}
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
          onClick={() => handleEmote("happy")}
          disabled={emote !== null}
        >
          Satisfied
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
          onClick={() => handleEmote("angry")}
          disabled={emote !== null}
        >
          Mad
        </button>

        {/* Movement Buttons (Right Side) */}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          onClick={moveToCenter}
          disabled={animating || customerState !== "hidden"}
        >
          Move to Center
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          onClick={moveToRight}
          disabled={animating || customerState !== "centerVisible"}
        >
          Move to Right
        </button>
      </div>

      <style jsx>{`
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
        @keyframes exitAnimation {
          from {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
          to {
            transform: translateX(380px) scale(1);
            opacity: 0;
          }
        }
        .animate-enter {
          animation: enterAnimation 2s ease-in-out forwards;
        }
        .animate-exit {
          animation: exitAnimation 2s ease-in-out forwards;
        }
        @keyframes bopAnimation {
          0% {
            transform: translateY(-5px);
          }
          25% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
          75% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-5px);
          }
        }
        .animate-bop {
          animation: bopAnimation 0.5s ease-in-out infinite;
        }
        /* Curve Emote Animation */
        @keyframes curveEmote {
          0% {
            opacity: 1;
            transform: translate(0px, 0px) scale(1);
          }
          25% {
            opacity: 0.75;
            transform: translate(15px, -25x) scale(1.05);
          }
          50% {
            opacity: 0.5;
            transform: translate(25px, -50px) scale(1.1);
          }
          75% {
            opacity: 0.25;
            transform: translate(30px, -75px) scale(1.12);
          }
          100% {
            opacity: 0;
            transform: translate(32px, -100px) scale(1.2);
          }
        }
        .curve-emote {
          animation: curveEmote 2s linear forwards;
        }
      `}</style>
    </div>
  );
}
