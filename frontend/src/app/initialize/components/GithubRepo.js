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
    <div className="w-full" style={{ width: '1008px' }}>
      <div className="rounded-xl p-8 min-h-[300px]" style={{ backgroundColor: '#d9d9d9' }}>
        <p className="text-gray-700 mb-6 text-lg">Place your github repository link here</p>
        
        <div className="space-y-6">
          {repos.map((repo, index) => (
            <div key={index} className="rounded-lg p-3 text-sm" style={{ backgroundColor: '#a0a1a0' }}>
              {repo}
            </div>
          ))}
          
          <input
            type="text"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="Example: https://github.com/zarif98/Katao"
            className="w-full rounded-lg p-4 text-sm border-none outline-none"
            style={{ backgroundColor: '#a0a1a0' }}
          />
          
          <button
            onClick={handleAddAnother}
            className="bg-black text-white px-6 py-3 rounded-lg text-sm hover:bg-gray-800 transition-colors"
          >
            Add Another
          </button>
        </div>
      </div>
    </div>
  );
}