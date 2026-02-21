"use client";
import { useState, useEffect } from "react";
import { fetchCollaborators } from "@/app/api/pdf.api";
import { CodeBookHandler } from "@/utility/codeBookHandler";
import { ConfigHandler } from "@/utility/configHandler";
import { sendInvitation } from "@/app/api/collaboration.api";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function Contributors() {
  const codeBookHandler = new CodeBookHandler();
  const configHandler = new ConfigHandler();
  const { data: session } = useSession();
  const codebookId = codeBookHandler.getId();
  const codebookName = configHandler.getCodebookName();
  const senderId = session?.user?.id;

  const [contributors, setContributors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCollaborators = async () => {
      if (!codebookId) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const data = await fetchCollaborators(codebookId);
        setContributors(data);
      } catch (err) {
        console.error("Failed to fetch collaborators:", err);
        setError("Failed to load collaborators");
      } finally {
        setIsLoading(false);
      }
    };

    loadCollaborators();
  }, [codebookId]);

  const handleRemove = (id) => {
    setContributors((prev) => prev.filter((c) => (c._id || c.id) !== id));
  };

  const handleAdd = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!newEmail.trim()) {
      setError("Email is required");
      return;
    }

    if (!emailRegex.test(newEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    const isAlreadyAdded = contributors.some((c) => c.name === user.name);
    if (isAlreadyAdded) {
      setError("User already added");
      return;
    }

    try {
      await sendInvitation(newEmail, codebookId, senderId, codebookName);
      toast.success(`Invitation sent to ${newEmail}`);
    } catch (err) {
      console.error("Failed to send invitation:", err);
      toast.error("Failed to send invitation");
      return;
    }

    setNewEmail("");
    setError("");
    setIsModalOpen(false);
  };

  return (
    <div className="p-10 w-full h-full overflow-y-auto relative">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500 font-mono">Loading collaborators...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contributors.map((contributor) => (
            <div
              key={contributor._id || contributor.id}
              className="bg-[#F5F5F5] rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                  <svg
                    className="w-6 h-6 text-black"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-mono text-sm font-bold">
                  {contributor.name}
                </span>
              </div>
              <button
                onClick={() => handleRemove(contributor._id || contributor.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-all rounded-full border border-red-500 p-1"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}

          <button
            onClick={() => {
              setIsModalOpen(true);
              setNewEmail("");
              setError("");
            }}
            className="bg-[#F5F5F5] rounded-2xl p-4 flex items-center gap-3 hover:bg-gray-200 transition-colors text-left shadow-sm h-[72px]"
          >
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <span className="font-mono text-sm font-bold">Add New</span>
          </button>
        </div>
      )}

      {/* Add New Contributor Modal */}
      {isModalOpen && (
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-2xl">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-80 font-mono">
            <h3 className="text-base font-bold mb-4">Add Contributor</h3>
            <input
              type="email"
              placeholder="Email Address"
              value={newEmail}
              onChange={(e) => {
                setNewEmail(e.target.value);
                setError("");
              }}
              className={`w-full bg-gray-100 p-2 text-sm rounded-lg outline-none focus:ring-2 focus:ring-black/20 ${error ? "border border-red-500 mb-2" : "mb-6"}`}
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
            <div className="flex gap-3 text-sm">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
