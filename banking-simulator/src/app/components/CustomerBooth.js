"use client";
import { useState, useEffect } from "react";

export default function CustomerBooth({ parentFunction, parentFunction2, customerMood, setCustomerMood, buttonsDisabled, setButtonsDisabled }) {
  // "hidden" means the customer is centered but invisible;
  // "centerVisible" means the customer is visible at center.
  const [customerState, setCustomerState] = useState("hidden");
  const [animating, setAnimating] = useState(false);
  const [animationType, setAnimationType] = useState(null);
  const [emote, setEmote] = useState(null);
  // Local state to control whether the emote (Satisfied/Mad) buttons are clickable
  const [emoteButtonsDisabled, setEmoteButtonsDisabled] = useState(false);

  // Helper to get a random customer index (0, 1, 2, or more). Ensures a new one if a previous value is provided.
  const getRandomCustomer = (prev) => {
    let newCustomer = Math.floor(Math.random() * 6);
    if (prev !== undefined) {
      while (newCustomer === prev) {
        newCustomer = Math.floor(Math.random() * 6);
      }
    }
    return newCustomer;
  };

  const [currentCustomer, setCurrentCustomer] = useState(null);

  useEffect(() => {
    setCurrentCustomer(getRandomCustomer());
  }, []);
  
  const customerImage = currentCustomer !== null 
    ? `/img/customers/customer${currentCustomer}.png` 
    : null; // Avoid rendering an invalid image during SSR
    
  const playSound = (soundFile) => {
    const audio = new Audio(`/mp3/${soundFile}`);
    audio.play();
  };

  const playLoopingSound = (soundFile) => {
    const audio = new Audio(`/mp3/${soundFile}`);
    audio.loop = true;
    audio.play();
    return audio;
  };
  
  const handleAnimationEnd = (e) => {
    if (e.animationName === "enterAnimation") {
      setAnimating(false);
      setAnimationType(null);
      setCustomerState("centerVisible");
    } else if (e.animationName === "exitAnimation") {
      setAnimating(false);
      setAnimationType(null);
      setCustomerState("hidden");
      // Update to a new random customer for the next appearance.
      setCurrentCustomer(prev => getRandomCustomer(prev));
      // Once exit animation ends, trigger parent's next customer effect.
      parentFunction();
    }
  };

  // When Move to Center is clicked, re-enable interactive buttons and start the enter animation.
  const moveToCenter = () => {
    if (!animating && customerState === "hidden") {
      setButtonsDisabled(false);
      setEmoteButtonsDisabled(false);
      parentFunction();
      setTimeout(() => {
        parentFunction2(1);
      }, 1700);
      setAnimating(true);
      setAnimationType("enter");
      const footstepAudio = playLoopingSound("footstep.mp3");
      setTimeout(() => {
        footstepAudio.pause();
      }, 2000);     }
  };
  

  // Auto-trigger exit animation when conditions are met.
  const moveToRight = () => {
    if (!animating && customerState === "centerVisible") {
      parentFunction2(0);
      setAnimating(true);
      setAnimationType("exit");
      const footstepAudio = playLoopingSound("footstep.mp3");
      setTimeout(() => {
        footstepAudio.pause();
      }, 2000);    }
  };
  

  let wrapperAnimationClass = "";
  if (animating) {
    wrapperAnimationClass = animationType === "enter" ? "animate-enter" : "animate-exit";
  }

  const restingWrapperStyle = !animating
    ? customerState === "centerVisible"
      ? { left: "122px", bottom: "-10px", opacity: 1 }
      : { left: "124px", bottom: "-10px", opacity: 0 }
    : {};

  // When customerMood becomes "happy" or "angry", start the emote animation and auto-trigger exit after 3 seconds.
  useEffect(() => {
    if (customerMood === "happy" || customerMood === "angry") {
      setEmote(customerMood);
      playSound(customerMood === "happy" ? "happy.mp3" : "angry.mp3"); // Play the correct emote sound
      const timer = setTimeout(() => {
        setEmote(null);
        setCustomerMood("");
        setButtonsDisabled(true);
        moveToRight();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [customerMood]);
  

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
        <button
          className="hidden px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50 hover:cursor-pointer hover:bg-green-600"
          onClick={() => {
            setCustomerMood("happy");
            setEmoteButtonsDisabled(true);
            setButtonsDisabled(true);
          }}
          disabled={emoteButtonsDisabled || customerState !== "centerVisible" || animating}
        >
          Satisfied
        </button>
        <button
          className="hidden px-4 py-2 bg-red-500 text-white rounded-lg disabled:opacity-50 hover:cursor-pointer hover:bg-red-600"
          onClick={() => {
            setCustomerMood("angry");
            setEmoteButtonsDisabled(true);
            setButtonsDisabled(true);
          }}
          disabled={emoteButtonsDisabled || customerState !== "centerVisible" || animating}
        >
          Mad
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:cursor-pointer hover:bg-blue-600"
          onClick={moveToCenter}
          disabled={animating || customerState !== "hidden"}
        >
          Next Customer
        </button>
        <button
          className="px-4 py-2 bg-red-700 text-white rounded-lg disabled:opacity-50 hover:cursor-pointer hover:bg-red-800"
          onClick={moveToRight}
          disabled={
            animating ||
            customerState !== "centerVisible" ||
            emoteButtonsDisabled ||
            buttonsDisabled
          }
        >
          Emergency Button
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
