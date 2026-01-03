"use client";
import { useState } from "react";
import CreateCodebookModal from "./createCodebookModal";
import Link from "next/link";

export default function Content() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const codebooks = [
        { id: "01", name: "Codebook 01", owner: "Alice Johnson", date: "Just now", variant: "dark" },
        { id: "02", name: "MIST Team 06", owner: "Bob Smith", date: "A minute ago", variant: "light" },
        { id: "03", name: "Ultimate Codebook", owner: "Charlie Brown", date: "1 hour ago", variant: "dark" },
        { id: "04", name: "Codebook Draft", owner: "David Wilson", date: "Yesterday", variant: "light" },
        { id: "05", name: "Algorithms Snippets", owner: "Eve Davis", date: "2 days ago", variant: "dark" },
        { id: "06", name: "Data Structures", owner: "Frank Miller", date: "Last week", variant: "light" },
        { id: "07", name: "Graph Theory", owner: "Grace Lee", date: "2 weeks ago", variant: "dark" },
        { id: "08", name: "Dynamic Programming", owner: "Hank Green", date: "A month ago", variant: "light" },
        { id: "09", name: "Math Snippets", owner: "Ivy White", date: "2 months ago", variant: "dark" },
        { id: "10", name: "Geometry Codebook", owner: "Jack Black", date: "3 months ago", variant: "light" },
    ];

    return (
        <div className="mt-48 w-full max-w-7xl px-6 mb-20 mx-auto">
            <div className="flex justify-between items-end mb-6">
                <h1 className="text-3xl font-mono font-bold tracking-tight">Codebooks</h1>
                <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg font-mono text-sm hover:bg-gray-800 transition-colors shadow-lg"
                >
                    <span className="text-lg leading-none">+</span> Create New
                </button>
            </div>

            <div className="w-full font-mono">
                {/* Headers */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    <div className="col-span-2">Serial No.</div>
                    <div className="col-span-4">Codebook Name</div>
                    <div className="col-span-3">Owner</div>
                    <div className="col-span-3">Last Modified</div>
                </div>

                {/* List */}
                <Link href={'/editor'} className="space-y-3 overflow-y-auto max-h-[60vh] p-2 custom-scrollbar">
                    {codebooks.map((book) => (
                        <div
                            key={book.id}
                            className={`grid grid-cols-12 gap-4 px-6 py-5 rounded-xl items-center shadow-sm transition-all hover:scale-[1.01] cursor-pointer ${book.variant === "dark"
                                    ? "bg-[#3C3C3C] text-white shadow-md"
                                    : "bg-white text-gray-800 hover:bg-white"
                                }`}
                        >
                            <div className="col-span-2 opacity-80">{book.id}</div>
                            <div className="col-span-4 font-medium text-lg">{book.name}</div>
                            <div className="col-span-3 opacity-80 text-sm">{book.owner}</div>
                            <div className="col-span-3 flex items-center gap-2 opacity-80 text-sm">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                {book.date}
                            </div>
                        </div>
                    ))}
                </Link>
            </div>

            <CreateCodebookModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)} 
            />
        </div>
    );
}