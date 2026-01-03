import React, { useState } from "react";
import RepoModal from "./RepoModal";

export const repos = [
  "ShahjalalShohag/code-library",
  "AsifRahman/UltimateHacks",
];

export default function GithubRepos() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col h-full w-64 border-r-2 border-black bg-white text-black font-mono">
        <div className="flex-1 overflow-y-auto">
          {repos.map((repo, index) => (
            <div
              key={index}
              title={repo}
              className={`p-4 border-b-2 border-black hover:bg-gray-100 cursor-pointer font-bold text-sm truncate`}
            >
              {repo}
            </div>
          ))}
        </div>
        <div className="p-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-black text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors font-mono"
          >
            <span>Add New</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
      </div>
      <RepoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
