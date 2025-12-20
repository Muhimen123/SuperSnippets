export default function TileBackground({children}) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="
            absolute -inset-[20%] 
            bg-repeat
            bg-[length:1920px_200px]
            opacity-10
            z-0
            rotate-12
        "
        style={{ backgroundImage: "url('/bg_wave.svg')" }}
      />
      <div
        className="
            absolute -inset-[20%] 
            bg-repeat
            bg-[length:1920px_200px]
            translate-y-15   /*  Shifts it down to show the overlap */
            -translate-x-3
            opacity-15       /* Different opacity helps visibility */
            z-10             /* Places this on top of the first div */
            rotate-12
        "
        style={{ backgroundImage: "url('/bg_wave.svg')" }}
      />
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}
