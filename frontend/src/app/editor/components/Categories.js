"use client";
import { useState } from "react";
import { Reorder } from "framer-motion";
import AddCategoryModal from "./AddCategoryModal";
import CategoryItem from "./CategoryItem";
import { CodeBookHandler } from "@/utility/codeBookHandler";

export default function Categories({ categories, setCategories }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const codebookHandler = new CodeBookHandler();

  const handleAddCategory = (name) => {
    const newCategory = {
      id: codebookHandler.getCategories().length,
      name: name,
      items: [],
      isOpen: true,
    };
    codebookHandler.setCategory(newCategory);
    setCategories((prev) => [...prev, newCategory]);
  };

  return (
    <div className="flex flex-col h-full w-80 border-r-2 border-black bg-white text-black font-mono">
      {/* Category List with Drag & Drop */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <Reorder.Group axis="y" values={categories} onReorder={setCategories}>
          {categories.map((category) => (
            <CategoryItem 
                key={category.id} 
                category={category} 
                setCategories={setCategories}
            />
          ))}
        </Reorder.Group>

        {categories.length === 0 && (
            <div className="p-8 text-center text-gray-500 text-sm">
                No categories found. Create one below.
            </div>
        )}
      </div>

      {/* Add New Category Button */}
      <div className="p-4 bg-white z-10">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-black text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors font-mono"
        >
          <span>New Category</span>
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
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>

      <AddCategoryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCategory}
      />
    </div>
  );
}
