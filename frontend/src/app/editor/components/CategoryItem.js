"use client";
import { useState, useRef, useEffect } from "react";
import { Reorder, useDragControls } from "framer-motion";

export default function CategoryItem({ category, setCategories }) {
    const controls = useDragControls();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(category.name);
    const menuRef = useRef(null);

    // Close menu on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const updateCategory = (updates) => {
        setCategories(prev => prev.map(c => c.id === category.id ? { ...c, ...updates } : c));
    };

    const handleReorderItems = (newItems) => {
        updateCategory({ items: newItems });
    };

    const toggleItemInclude = (itemId) => {
        const newItems = category.items.map(item => 
            item.id === itemId ? { ...item, included: !item.included } : item
        );
        updateCategory({ items: newItems });
    };

    const deleteItem = (itemId) => {
        const newItems = category.items.filter(item => item.id !== itemId);
        updateCategory({ items: newItems });
    };

    const handleRename = () => {
        if (editName.trim()) {
            updateCategory({ name: editName });
            setIsEditing(false);
        }
    };

    const handleDeleteCategory = () => {
        setCategories(prev => prev.filter(c => c.id !== category.id));
    };

    const handleToggleIncludeCategory = () => {
        // Check if all are included, if so uncheck all, else check all
        const allIncluded = category.items.every(i => i.included);
        const newItems = category.items.map(item => ({...item, included: !allIncluded}));
        updateCategory({ items: newItems });
        setIsMenuOpen(false);
    };

    return (
        <Reorder.Item
            value={category}
            dragListener={false}
            dragControls={controls}
            className="border-b-2 border-black bg-white"
        >
            <div 
                className="flex items-center justify-between p-3 gap-2 group hover:bg-gray-50 cursor-move"
                onPointerDown={(e) => controls.start(e)}
            >
                {/* Name or Edit Input */}
                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <input 
                            onPointerDown={(e) => e.stopPropagation()}
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onBlur={handleRename}
                            onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                            autoFocus
                            className="w-full text-sm font-bold border-b border-black outline-none bg-transparent"
                        />
                    ) : (
                        <span className="text-sm font-bold truncate block select-none">
                            {category.name}
                        </span>
                    )}
                </div>

                {/* Context Menu Button */}
                <div className="relative" ref={menuRef}>
                    <button 
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-1 hover:bg-gray-200 rounded text-gray-600 hover:text-black transition-colors"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                             <circle cx="5" cy="12" r="2"/>
                             <circle cx="12" cy="12" r="2"/>
                             <circle cx="19" cy="12" r="2"/>
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-black shadow-xl rounded-lg z-50 overflow-hidden">
                            <button 
                                onClick={() => { updateCategory({ isOpen: !category.isOpen }); setIsMenuOpen(false); }}
                                className="w-full text-left px-4 py-2 text-xs font-mono hover:bg-black hover:text-white"
                            >
                                {category.isOpen ? "Collapse" : "Expand"}
                            </button>
                            <button 
                                onClick={() => { setIsEditing(true); setIsMenuOpen(false); }}
                                className="w-full text-left px-4 py-2 text-xs font-mono hover:bg-black hover:text-white"
                            >
                                Rename
                            </button>
                            <button 
                                onClick={handleToggleIncludeCategory}
                                className="w-full text-left px-4 py-2 text-xs font-mono hover:bg-black hover:text-white"
                            >
                                Include all in Codebook
                            </button>
                            <div className="h-px bg-gray-200 my-1"></div>
                            <button 
                                onClick={handleDeleteCategory}
                                className="w-full text-left px-4 py-2 text-xs font-mono text-red-600 hover:bg-red-50"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Sub Items Area */}
            {category.isOpen && (
                <div className="pl-4 pb-2 bg-gray-50/50">
                    <Reorder.Group axis="y" values={category.items} onReorder={handleReorderItems}>
                        {category.items.map((item) => (
                            <Reorder.Item key={item.id} value={item} className="touch-none">
                                <div className="flex items-center justify-between p-2 pl-3 hover:bg-gray-100 group border-l-2 border-gray-300 ml-2">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        {/* Toggle Include */}
                                        <button 
                                            onClick={() => toggleItemInclude(item.id)}
                                            className={`
                                                flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors
                                                ${item.included ? 'bg-black border-black text-white' : 'border-gray-400 hover:border-black'}
                                            `}
                                        >
                                            {item.included && (
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </button>
                                        <span className={`text-xs font-mono truncate ${!item.included && 'opacity-50 line-through'}`}>
                                            {item.name}
                                        </span>
                                    </div>
                                    
                                    {/* Remove Item */}
                                    <button 
                                        onClick={() => deleteItem(item.id)}
                                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 p-1 transition-all"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                    {category.items.length === 0 && (
                        <div className="p-3 text-xs text-gray-400 font-mono text-center italic">
                            No items
                        </div>
                    )}
                </div>
            )}
        </Reorder.Item>
    );
}