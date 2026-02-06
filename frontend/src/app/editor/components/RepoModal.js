import React, { useState } from "react";
import { ConfigHandler } from "@/utility/configHandler";

export default function RepoModal({ isOpen, onClose, onRepoAdded }) {
  const configHandler = new ConfigHandler();
  const [githubUrl, setGithubUrl] = useState("");
  const [addedRepos, setAddedRepos] = useState([]);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const validateGitHubUrl = (url) => {
    const regex =
      /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/;
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
        setError(
          "Invalid GitHub repository URL. Format: https://github.com/user/repo",
        );
        return;
      }

      const repoName = extractRepoName(githubUrl);
      const currentRepos = configHandler.getRepos();

      if (!currentRepos.includes(repoName)) {
        configHandler.addRepo([repoName]);
        onRepoAdded(repoName);
        handleClose();
      } else {
        setError("Github URL already exists");
      }
    }
  };

  const handleClose = () => {
    setGithubUrl("");
    setAddedRepos([]);
    setError("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 outline-none"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      onKeyDown={(e) => e.key === "Escape" && handleClose()}
      tabIndex={-1}
    >
      <div className="bg-[#d9d9d9] rounded-3xl p-8 w-[600px] shadow-2xl relative font-mono">
        <h2 className="text-md font-mono mb-4 text-black pt-2">
          Place your github repository link here
        </h2>

        <div className="space-y-2">
          {addedRepos.map((repo, index) => (
            <div
              key={index}
              className="w-full rounded-lg px-4 py-4 text-sm text-black mb-2"
              style={{ backgroundColor: "#a0a1a0" }}
            >
              {repo}
            </div>
          ))}

          <div className="relative">
            <input
              type="text"
              autoFocus
              value={githubUrl}
              onChange={(e) => {
                setGithubUrl(e.target.value);
                setError("");
              }}
              placeholder={
                addedRepos.length >= 3
                  ? "Maximum 3 repositories allowed"
                  : "example: https://github.com/zarif08/Katao"
              }
              disabled={addedRepos.length >= 3}
              className={`w-full rounded-lg px-4 py-4 text-sm border-none outline-none placeholder-gray-600 ${addedRepos.length >= 3 ? "opacity-50 cursor-not-allowed" : ""} ${error ? "border-2 border-red-500" : ""}`}
              style={{ backgroundColor: "#bab9b9ff" }}
            />
            {error && (
              <p className="text-red-600 text-xs mt-1 absolute">{error}</p>
            )}
          </div>

          <div className="flex justify-end pt-6 gap-2">
            <button
              onClick={handleClose}
              className="px-6 py-1 rounded-lg text-sm hover:bg-gray-200 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleAddAnother}
              disabled={addedRepos.length >= 3}
              className={`bg-black text-white px-8 py-1 rounded-lg text-sm transition-all duration-300 ease-in-out ${addedRepos.length >= 3 ? "opacity-50 cursor-not-allowed" : "hover:bg-black hover:font-bold hover:scale-105 active:scale-95"}`}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
