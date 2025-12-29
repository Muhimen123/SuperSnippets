"use client";
import { useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Tree Traversal",
      items: ["BFS", "DFS", "Segment Tree"],
      isOpen: true,
    },
    {
      id: 2,
      name: "Sort",
      items: ["Merge Sort", "Bubble Sort", "Quick Sort"],
      isOpen: true,
    },
  ]);

  const toggleCategory = (id) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, isOpen: !cat.isOpen } : cat
      )
    );
  };

  return (
    <div className="flex flex-col h-full w-64 border-r-2 border-black bg-white text-black font-mono">
      <div className="flex-1 overflow-y-auto">
        {categories.map((category) => (
          <div key={category.id} className="border-t-2 border-black">
            <button
              onClick={() => toggleCategory(category.id)}
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-100 transition-colors ${
                category.isOpen ? "border-b-2 border-black" : ""
              }`}
            >
              <span className="text-sm font-bold truncate">{category.name}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transform transition-transform duration-200 ${
                  category.isOpen ? "rotate-180" : ""
                }`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {category.isOpen && (
              <div className=" border-x-2 border-b-2 border-black bg-white">
                {category.items.map((item, index) => (
                  <div
                    key={index}
                    className={`pl-4 p-3 text-xs font-medium hover:bg-gray-50 cursor-pointer ${
                      index !== category.items.length - 1
                        ? "border-b-2 border-black"
                        : ""
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      
    </div>
  );
}