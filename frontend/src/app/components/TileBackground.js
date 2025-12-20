export default function TileBackground() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="
            absolute -inset-[20%] 
            bg-repeat
            bg-[length:1920px_200px]
            opacity-20
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
            translate-y-20   /*  Shifts it down to show the overlap */
            -translate-x-4
            opacity-50       /* Different opacity helps visibility */
            z-10             /* Places this on top of the first div */
            rotate-12
        "
        style={{ backgroundImage: "url('/bg_wave.svg')" }}
      />
    </div>
  );
}
