export default function DirectionController() {
  return (
    <div className="w-full flex items-center gap-4">
      <div className="flex-1"></div>

      <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors">
        Back
      </button>
      <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
        Next
      </button>
    </div>
  );
}
