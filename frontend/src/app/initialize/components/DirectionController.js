export default function DirectionController({ handleNext, handleBack, isBackHidden = false }) {
  const basicButton = `px-5 md:px-10 lg:px-20 py-2 bg-black text-white rounded-lg`;
	const buttonAnimation = `transition-transform duration-300 ease-in-out hover:font-bold hover:scale-105 active:scale-95`;
  return (
    <div className="w-full flex items-center gap-4">
      <div className="flex-1"></div>
      <button
				onClick={handleBack}
        className={`
					${isBackHidden ? "hidden" : `${basicButton} ${buttonAnimation}`}
				`}
      >
        Back
      </button>

      <button
				onClick={handleNext}
        className={`
					${basicButton} 
					${buttonAnimation}
				`}
      >
        Next
      </button>
    </div>
  );
}
