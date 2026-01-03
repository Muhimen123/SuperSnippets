"use client";

import { useState } from "react";

export default function GithubRepo({ repos, setRepos }) {
  const [githubUrl, setGithubUrl] = useState("");

  const handleAddAnother = () => {
    if (githubUrl.trim() && repos.length < 3) {
      setRepos([...repos, githubUrl]);
      setGithubUrl("");
    }
  };

  return (
    <div className="w-full font-mono" style={{ width: '1008px' }}>
      <div className="rounded-3xl px-16 py-8 min-h-[300px]" style={{ backgroundColor: '#d9d9d9' }}>
        <p className="text-black mb-2 text-sm pt-10">Place your github repository link here (max 3)
        </p>
        
        <div className="space-y-2">
          {repos.map((repo, index) => (
            <div 
              key={index} 
              className="w-full rounded-lg px-4 py-4 text-sm text-black mb-2" 
              style={{ backgroundColor: '#a0a1a0' }}
            >
              {repo}
            </div>
          ))}
          <input
            type="text"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder={repos.length >= 3 ? "Maximum 3 repositories allowed. You can add more later" : "example: https://github.com/zarif08/Katao"}
            disabled={repos.length >= 3}
            className={`w-full rounded-lg px-4 py-4 text-sm border-none outline-none placeholder-gray-600 ${repos.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{ backgroundColor: '#a1a1a1ff' }}
          />
          
          <div className="flex justify-end pt-4">
            <button
              onClick={handleAddAnother}
              disabled={repos.length >= 3}
              className={`bg-black text-white px-8 py-1 rounded-lg text-sm transition-all duration-300 ease-in-out ${repos.length >= 3 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:font-bold hover:scale-105 active:scale-95'}`}
            >
              Add Another
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}