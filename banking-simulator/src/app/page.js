"use client";

export default function Home() {
    return (
<div className="flex items-center justify-center min-h-screen py-50 bg-gray-100">
        
        {/* Invisible Container that Controls Everything Inside */}
        <div 
          id="game-container" 
          className="relative w-[1200px] h-[800px] scale-100 md:scale-90 lg:scale-75 xl:scale-120 transition-transform duration-300 flex flex-col items-center"
        >
          
          {/* Inspector's Booth (Blue Holographic Screen) */}
          <div className="w-[60%] h-[40%] bg-blue-500 bg-opacity-30 border-2 border-blue-300 shadow-xl backdrop-blur-md flex items-center justify-center">
            <p className="text-lg font-semibold text-white">Inspector's Booth</p>
          </div>

          {/* Instruction Panel (Right of Booth, No Gap, Aligned at the Top) */}
          <div className="absolute left-[calc(75%)] top-20 w-[15%] h-[25%] bg-yellow-300 shadow-md flex items-center justify-center">
            <p className="text-lg font-semibold text-gray-700">Instruction</p>a
          </div>

          {/* Desk (Trapezoid Shape) */}
          <div className="relative -mt-1 w-[100%] h-[50%] bg-gray-400 shadow-md clip-trapezoid flex items-center justify-center">
            <p className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-semibold text-white">
              Desk
            </p>
          </div>

          {/* Document System (Transparent Light Blue Box at Bottom Right of Desk) */}
          <div className="absolute bottom-50 right-10 w-[20%] h-[30%] bg-blue-300 bg-opacity-30 border-2 border-blue-400 shadow-md flex items-center justify-center">
            <p className="text-lg font-semibold text-white">Document System</p>
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
