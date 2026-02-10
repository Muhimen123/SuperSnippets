"use client";
import { useState } from "react";

export default function AddCategoryModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Category name is required");
      return;
    }
    onAdd(name);
    setName("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
         onClick={onClose}>
      <div 
        className="bg-white p-6 rounded-2xl w-[400px] shadow-2xl space-y-4 font-mono"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold">New Category</h2>
        <div className="space-y-2">
            <input 
                autoFocus
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Category Name"
                className="w-full bg-gray-100 border border-gray-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
        <div className="flex gap-3 justify-end pt-2">
            <button 
                onClick={onClose}
                className="px-4 py-2 text-sm hover:bg-gray-100 rounded-lg"
            >
                Cancel
            </button>
            <button 
                onClick={handleSubmit}
                className="px-6 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
            >
                Create
            </button>
        </div>
      </div>
    </div>
  );
}