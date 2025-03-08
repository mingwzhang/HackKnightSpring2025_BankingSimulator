"use client";
import CustomerBooth from "./components/CustomerBooth";
import DialogueBox from "./components/dialoguebox";
import Tablet from "./components/tablet";

export default function Home() {
  return (
    <div
      className="flex items-center justify-center min-h-screen py-50"
      style={{
        backgroundImage: 'url(/img/bank_background.png)',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Invisible Container that Controls Everything Inside */}
      <div
        id="game-container"
        className="relative w-[1200px] h-[800px] scale-100 md:scale-90 lg:scale-75 xl:scale-120 transition-transform duration-300 flex flex-col items-center"
      >
        <div className="flex justify-center">
          <div className="flex absolute rounded-2xl overflow-hidden w-[800px] h-[130px] opacity-75 mt-0 z-10">
            <DialogueBox />
          </div>
        </div>
        {/* Inspector's Booth (Blue Holographic Screen) */}
        <CustomerBooth />

        {/* Instruction Panel (Right of Booth, No Gap, Aligned at the Top) */}
        <div className="absolute left-[calc(75%)] top-20 w-[15%] h-[25%] bg-yellow-300 shadow-md flex items-center justify-center">
          <p className="text-lg font-semibold text-gray-700">Instruction</p>
        </div>

        {/* Desk (Trapezoid Shape) */}
        <div className="relative -mt-1 w-[100%] h-[50%] bg-gray-400 shadow-md clip-trapezoid flex items-center justify-center">
          <p className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-semibold text-white">
            Desk
          </p>
        </div>

        {/* Document System (Transparent Light Blue Box at Bottom Right of Desk) */}
        <div className="absolute bottom-37 right-0 w-[35%] h-[42%] opacity-75 border-4 border-white rounded-2xl overflow-hidden shadow-md flex">
          <Tablet accountNumber={1234123412341234} />
        </div>
      </div>

      {/* Tailwind Custom Styles for Trapezoid */}
      <style jsx>{`
        .clip-trapezoid {
          clip-path: polygon(20% 0%, 80% 0%, 100% 50%, 0% 50%);
        }
      `}</style>
    </div>
  );
}
