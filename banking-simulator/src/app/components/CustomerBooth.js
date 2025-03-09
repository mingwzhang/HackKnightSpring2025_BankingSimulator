"use client";
import { useState, useEffect } from "react";

export default function CustomerBooth({ parentFunction, parentFunction2, customerMood}) {
  // "hidden" means the customer is centered but invisible;
  // "centerVisible" means the customer is visible at center.

  const [customerState, setCustomerState] = useState("hidden");
  const [animating, setAnimating] = useState(false);
  const [animationType, setAnimationType] = useState(null);
  const [emote, setEmote] = useState(null);

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

      parentFunction()
      setTimeout(() => {
        parentFunction2(1)
      }, 1700);

      setAnimating(true);
      setAnimationType("enter");
    }
  };

  const moveToRight = () => {
    if (!animating && customerState === "centerVisible") {
      parentFunction2(0)
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
      ? { left: "122px", bottom: "-10px", opacity: 1 }
      : { left: "124px", bottom: "-10px", opacity: 0 }
    : {};

  const handleEmote = (type) => {
    console.log("Inside CustomerBooth.js :", customerMood)
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

  const emoteImage =
    emote === "happy"
      ? "/img/sign_happy.gif"
      : emote === "angry"
        ? "/img/sign_angry.gif"
        : null;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Booth Container */}
      <div
        id="game-container"
        className="relative w-[600px] h-[400px] shadow-lg rounded-xl flex items-center justify-center overflow-hidden border-5 border-blue-500"
        style={{
          backgroundImage: 'url(/img/bank_background.png)',
          backgroundSize: "cover",
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
          style={animating ? { bottom: "-10px" } : { ...restingWrapperStyle, bottom: "-10px" }}
          onAnimationEnd={handleAnimationEnd}
        >
          {/* Main Customer Image */}
          <img
            src={customerImage}
            alt="Customer"
            className={`h-full w-full object-contain rounded-md ${animating ? "animate-bop" : ""}`}
          />

          {/* Emote Image */}
          {emote && (
            <div className="absolute w-20 h-20" style={{ top: "15%", right: "15%" }}>
              <img src={emoteImage} alt="Emote" className="w-full h-full object-contain curve-emote" />
            </div>
          )}
        </div>

      </div>

      {/* Control Buttons */}
      <div className="mt-4 flex gap-4 items-center">
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
          onClick={() => handleEmote("happy")}
          disabled={emote !== null}>
          Satisfied
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
          onClick={() => handleEmote("angry")}
          disabled={emote !== null}>
          Mad
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          onClick={moveToCenter}
          disabled={animating || customerState !== "hidden"}>
          Move to Center
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          onClick={moveToRight}
          disabled={animating || customerState !== "centerVisible"}>
          Move to Right
        </button>
      </div>

      <style jsx>{`
        @keyframes enterAnimation {
          from {
            transform: translateY(100px) scale(0.8);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
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
          0% { transform: translateY(-5px); }
          50% { transform: translateY(0); }
          100% { transform: translateY(-5px); }
        }
        .animate-bop {
          animation: bopAnimation 0.5s ease-in-out infinite;
        }
        @keyframes curveEmote {
          0% { opacity: 1; transform: translate(0px, 0px) scale(1); }
          50% { opacity: 0.5; transform: translate(25px, -50px) scale(1.1); }
          100% { opacity: 0; transform: translate(32px, -100px) scale(1.2); }
        }
        .curve-emote {
          animation: curveEmote 2s linear forwards;
        }
      `}</style>
    </div>
  );
}
