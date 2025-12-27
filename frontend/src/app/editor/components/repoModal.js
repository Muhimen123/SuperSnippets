import React from 'react';

export default function RepoModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#E5E5E5] rounded-3xl p-8 w-[600px] shadow-2xl relative">
                <h2 className="text-xl font-mono mb-4 text-black">
                    Place your github repository link here
                </h2>

                <input
                    type="text"
                    placeholder="example: https://github.com/zarif08/Katao"
                    className="w-full bg-[#A3A3A3] text-black placeholder-black/60 p-4 rounded-lg mb-6 font-mono outline-none focus:ring-2 focus:ring-black/20"
                />

                <div className="flex justify-end">
                    <button
                        className="bg-[#2A2A2A] text-white px-6 py-3 rounded-lg font-mono hover:bg-black transition-colors"
                        onClick={onClose}
                    >
                        Add Another
                    </button>
                </div>
            </div>
        </div>
    );
};


