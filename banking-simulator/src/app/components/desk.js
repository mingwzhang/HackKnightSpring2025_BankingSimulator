export default function Desk() {
  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Trapezoid Shape - Desk Surface */}
      <div className="w-full h-30 bg-amber-700 shadow-lg clip-trapezoid flex items-center justify-center"></div>

      {/* Rectangle - Desk Base */}
      <div className="w-full h-100 bg-amber-900 shadow-md"></div>

      {/* Tailwind Custom Styles for Trapezoid & 3D Effect */}
      <style jsx>{`
        .clip-trapezoid {
          clip-path: polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%);
        }
      `}</style>
    </div>
  );
}
