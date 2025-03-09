"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [showCredits, setShowCredits] = useState(false);
  const [hoveringButton, setHoveringButton] = useState(false);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[url('/img/lowercase2_logo_background.png')] bg-cover bg-center overflow-hidden">
      
      {/* Left GIF with custom position */}
      <div className="fixed z-50" style={{ top: "150px", left: "-50px" }}>
        <Image 
          src="/img/dollar3d.gif" 
          alt="3D Spinning Dollar" 
          width={500}      
          height={500}     
          className="w-[800px] h-[500px] object-contain" 
        />
      </div>

      {/* Right GIF with custom position */}
      <div className="fixed z-50" style={{ top: "150px", right: "-50px" }}>
        <Image 
          src="/img/dollar3d.gif" 
          alt="3D Spinning Dollar" 
          width={500}      
          height={500}     
          className="w-[800px] h-[500px] object-contain" 
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl w-full px-4 text-center">
        <h1
          className="text-9xl font-extrabold text-yellow-300 tracking-wide transition-transform duration-200 transform hover:rotate-2"
          style={{ textShadow: "3px 3px 0 #333, 6px 6px 0 #555" }}
        >
          Banking Simulator
        </h1>
        <p
          className="mt-4 text-3xl text-yellow-200 transition-transform duration-200 transform hover:rotate-1"
          style={{ textShadow: "2px 2px 0 #333" }}
        >
          this page is powered by{" "}
          <span className="font-semibold italic">"lower case two"</span>
        </p>

        {/* Start Game Button */}
        <Link href="/game">
          <button className="mt-8 px-8 py-4 bg-yellow-100 border border-gray-300 text-gray-800 font-mono uppercase tracking-wider font-bold 
                             shadow-[0_4px_0_0_#999] hover:shadow-[0_6px_0_0_#999] 
                             hover:bg-yellow-400 hover:text-black 
                             active:translate-y-1 active:shadow-[0_2px_0_0_#999] 
                             transition duration-150 ease-in-out">
            Press Start
          </button>
        </Link>
      </div>

      {/* Credits Panel */}
      <div
        className="fixed top-1/2 -translate-y-1/2 right-0 transition-all duration-300 flex items-center z-50"
        style={{
          right: showCredits ? "0px" : hoveringButton ? "-410px" : "-440px",
        }}
      >
        <button
          onClick={() => setShowCredits(!showCredits)}
          onMouseEnter={() => setHoveringButton(true)}
          onMouseLeave={() => setHoveringButton(false)}
          className="absolute right-full top-1/2 -translate-y-1/2 px-6 py-4 
                     text-white text-xl font-extrabold tracking-wide
                     border border-gray-700 shadow-lg
                     bg-gray-800 hover:bg-blue-500 transition-all duration-300"
        >
          {showCredits ? (hoveringButton ? "> Credits" : "< Credits") : (hoveringButton ? "< Credits" : "> Credits")}
        </button>

        <div className="bg-white/80 p-8 shadow-2xl min-w-[250px] relative">
          <div className="flex justify-center mb-4">
            <Image
              src="/img/lowercase2_logo.png"
              alt="Lowercase2 Logo"
              width={360}
              height={260}
              className="w-full max-w-[400px] h-auto"
            />
          </div>

          <h2 className="text-3xl font-bold mb-4 text-green-500 text-left">$Credits$</h2>
          <div className="space-y-4 text-left text-orange-500">
            <div>
              <p className="text-xl font-semibold">Mingwei Zhang</p>
              <ul className="list-disc list-inside pl-6">
                <li>Frontend</li>
                <li>UI/UX Design</li>
                <li>Animation</li>
              </ul>
            </div>
            <div>
              <p className="text-xl font-semibold">Carl Feng</p>
              <ul className="list-disc list-inside pl-6">
                <li>Frontend</li>
                <li>UI/UX Design</li>
              </ul>
            </div>
            <div>
              <p className="text-xl font-semibold">Yu Long Wang</p>
              <ul className="list-disc list-inside pl-6">
                <li>QA (Quality Assurance)</li>
              </ul>
            </div>
            <div>
              <p className="text-xl font-semibold">Yuyou Liu</p>
              <ul className="list-disc list-inside pl-6">
                <li>Frontend</li>
                <li>Backend</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
