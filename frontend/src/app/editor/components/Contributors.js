"use client";

export default function Contributors() {
  const contributors = [
    { name: "Kuddus Ali", id: 1 },
    { name: "Kuddus Ali", id: 2 },
    { name: "Kuddus Ali", id: 3 },
  ];

  return (
    <div className="p-8 w-full h-full overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contributors.map((contributor) => (
          <div
            key={contributor.id}
            className="bg-[#F5F5F5] rounded-xl p-4 flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                 <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                 </svg>
              </div>
              <span className="font-mono text-sm font-bold">{contributor.name}</span>
            </div>
            <button className="text-red-500 hover:text-red-700 transition-colors rounded-full border border-red-500 p-0.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}

        <button className="bg-[#F5F5F5] rounded-xl p-4 flex items-center gap-3 hover:bg-gray-200 transition-colors text-left shadow-sm h-[72px]">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
             <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
             </svg>
          </div>
          <span className="font-mono text-sm font-bold">Add New</span>
        </button>
      </div>
    </div>
  );
}