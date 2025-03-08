export default function Desk() {
  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Trapezoid Shape */}
      <div className="w-full h-30 bg-gray-400 shadow-md clip-trapezoid flex items-center justify-center"></div>

      {/* Rectangle directly attached under Trapezoid */}
      <div className="w-full h-100 bg-gray-500 shadow-md"></div>

      {/* Tailwind Custom Styles for Trapezoid */}
      <style jsx>{` 
        .clip-trapezoid {
          clip-path: polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%);
        }
      `}</style>
    </div>
  );
}
