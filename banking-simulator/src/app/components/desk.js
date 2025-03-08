export default function Desk() {
  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Trapezoid Shape - Desk Surface */}
      <div
        className="w-full h-30 shadow-lg clip-trapezoid flex items-center justify-center"
        style={{
          backgroundImage: "url('/img/desk1_texture.png')",
          backgroundSize: "100% 100%",  // Ensures full fit
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Rectangle - Desk Base */}
      <div
        className="w-full h-100 shadow-md"
        style={{
          backgroundImage: "url('/img/desk2_texture.png')",
          backgroundSize: "100% 100%",  // Fills entire base
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Tailwind Custom Styles for Trapezoid & 3D Effect */}
      <style jsx>{`
        .clip-trapezoid {
          clip-path: polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%);
        }
      `}</style>
    </div>
  );
}
