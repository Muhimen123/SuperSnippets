"use client";
import { useState } from "react";

export default function Contributors() {
  const [contributors, setContributors] = useState([
    { name: "Kuddus Ali", id: 1 },
    { name: "Rahim Uddin", id: 2 },
    { name: "Karim Mia", id: 3 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const handleRemove = (id) => {
    setContributors((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAdd = () => {
    if (newEmail.trim()) {
      // Extract name from email
      const name = newEmail.split("@")[0] || "New Contributor";
      setContributors((prev) => [
        ...prev,
        { name: name, id: Date.now() },
      ]);
      setNewEmail("");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-12 w-full h-full overflow-y-auto relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contributors.map((contributor) => (
          <div
            key={contributor.id}
            className="bg-[#F5F5F5] rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                 <svg className="w-7 h-7 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                 </svg>
              </div>
              <span className="font-mono text-base font-bold">{contributor.name}</span>
            </div>
            <button 
              onClick={() => handleRemove(contributor.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-all rounded-full border border-red-500 p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}

        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#F5F5F5] rounded-2xl p-5 flex items-center gap-4 hover:bg-gray-200 transition-colors text-left shadow-sm h-[88px]"
        >
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
             <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
             </svg>
          </div>
          <span className="font-mono text-base font-bold">Add New</span>
        </button>
      </div>

      {/* Add New Contributor Modal */}
      {isModalOpen && (
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-2xl">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-96 font-mono">
            <h3 className="text-lg font-bold mb-4">Add Contributor</h3>
            <input
              type="email"
              placeholder="Email Address"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full bg-gray-100 p-3 rounded-lg mb-6 outline-none focus:ring-2 focus:ring-black/20"
              autoFocus
            />
            <div className="flex gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleAdd}
                className="flex-1 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Add Contributor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}