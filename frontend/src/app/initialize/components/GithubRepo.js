"use client";

import { useState } from "react";

export default function GithubRepo() {
  const [githubUrl, setGithubUrl] = useState("");
  const [repos, setRepos] = useState([]);

  const handleAddAnother = () => {
    if (githubUrl.trim()) {
      setRepos([...repos, githubUrl]);
      setGithubUrl("");
    }
  };

  return (
    <div className="w-full font-mono" style={{ width: '1008px' }}>
      <div className="rounded-3xl px-16 py-8 min-h-[300px]" style={{ backgroundColor: '#d9d9d9' }}>
        <p className="text-black mb-2 text-sm pt-10">Place your github repository link here</p>
        
        <div className="space-y-2">
          <input
            type="text"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="example: https://github.com/zarif08/Katao"
            className="w-full rounded-lg px-4 py-4 text-sm border-none outline-none placeholder-gray-600"
            style={{ backgroundColor: '#a0a1a0' }}
          />
          
          <div className="flex justify-end pt-4">
            <button
              onClick={handleAddAnother}
              className="bg-black text-white px-8 py-1 rounded-lg text-sm hover:bg-black transition-all duration-300 ease-in-out hover:font-bold hover:scale-105 active:scale-95"
            >
              Add Another
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}