"use client";

import { useState } from "react";
import { MOCK_REPO_DATABASE } from "@/utility/mockRepoDatabase";

export default function GithubRepo({ repos, setRepos, githubUrl, setGithubUrl }) {
  const [error, setError] = useState("");

  const validateGitHubUrl = (url) => {
    const regex = /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/;
    return regex.test(url);
  };

  const extractRepoName = (url) => {
    const parts = url.replace(/\/$/, "").split("/");
    return `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
  };

  const handleAddAnother = () => {
    setError("");
    if (githubUrl.trim()) {
      if (!validateGitHubUrl(githubUrl)) {
        setError("Invalid GitHub repository URL. Format: https://github.com/user/repo");
        return;
      }

      if (repos.length < 3) {
        console.log("Added repo:", githubUrl);
        setRepos([...repos, githubUrl]);
        
        // Add to mock database for the editor view
        const repoName = extractRepoName(githubUrl);
        if (!MOCK_REPO_DATABASE.includes(repoName)) {
          MOCK_REPO_DATABASE.push(repoName);
        }

        setGithubUrl("");
      }
    }
  };

  return (
    <div className="w-full font-mono" >
      <div className="rounded-3xl px-16 py-8 min-h-[300px]" style={{ backgroundColor: '#d9d9d9' }}>
        <p className="text-black mb-2 text-md pt-10">Place your github repository link here (max 3)
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
          <div className="relative">
            <input
              type="text"
              value={githubUrl}
              onChange={(e) => {
                setGithubUrl(e.target.value);
                setError("");
              }}
              placeholder={repos.length >= 3 ? "Maximum 3 repositories allowed. You can add more later" : "example: https://github.com/zarif08/Katao"}
              disabled={repos.length >= 3}
              className={`w-full rounded-lg px-4 py-4 text-sm border-none outline-none placeholder-gray-600 ${repos.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''} ${error ? 'border-2 border-red-500' : ''}`}
              style={{ backgroundColor: '#bab9b9ff' }}
            />
            {error && <p className="text-red-600 text-xs mt-1 absolute">{error}</p>}
          </div>
          
          <div className="flex justify-end pt-6">
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