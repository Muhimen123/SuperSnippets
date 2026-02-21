"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CreateCodebookModal from "./createCodebookModal";
import DeleteVerificationModal from "./DeleteVerificationModal";
import { useSession } from "next-auth/react";
import { deleteCodebook, fetchCodebook } from "../../api/pdf.api";
import toast from "react-hot-toast";
import { ConfigHandler } from "@/utility/configHandler";
import { CodeBookHandler } from "@/utility/codeBookHandler";

export default function Content({ codebooks, selectedCodebookId, refreshCodebooks }) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [codebookToDelete, setCodebookToDelete] = useState(null);
  
  const { data: sessionData } = useSession();
  const userId = sessionData?.user?.id;
  const configHandler = new ConfigHandler();
  const codeBookHandler = new CodeBookHandler();
  
  const router = useRouter();

  const filteredCodebooks = selectedCodebookId
    ? codebooks.filter((book) => book._id === selectedCodebookId)
    : codebooks;

  const handleDeleteClick = (e, codebookId) => {
    e.preventDefault();
    e.stopPropagation();
    setCodebookToDelete(codebookId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!codebookToDelete) return;

    try {
      await deleteCodebook(codebookToDelete);
      if (refreshCodebooks) refreshCodebooks();
      toast.success("Codebook deleted successfully");
    } catch (error) {
      console.error("Failed to delete codebook:", error);
      toast.error("Failed to delete codebook");
    } finally {
      setIsDeleteModalOpen(false);
      setCodebookToDelete(null);
    }
  };

  let serialNumber = 1;
  const dateFormat = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return (
    <div className="mt-48 w-full max-w-7xl px-6 mb-20 mx-auto">
      <div className="flex justify-between items-end mb-6 px-4">
        <h1 className="text-3xl font-mono font-bold tracking-tight">
          Codebooks
        </h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg font-mono text-sm hover:bg-gray-800 transition-colors shadow-lg"
        >
          <span className="text-lg leading-none">+</span> Create New
        </button>
      </div>

      <div className="w-full font-mono">
        {/* Headers */}
        <div className="grid grid-cols-12 gap-4 px-6 pb-2 text-xs text-gray-500 uppercase tracking-wider font-semibold">
          <div className="col-span-1">Serial No.</div>
          <div className="col-span-4">Codebook Name</div>
          <div className="col-span-2">Owner</div>
          <div className="col-span-4">Last Modified</div>
          <div className="col-span-1 text-center">Actions</div>
        </div>

        {/* List */}
        <div
          className="block space-y-3 overflow-y-auto max-h-[60vh] px-2 pb-2 custom-scrollbar"
        >
          {filteredCodebooks.map((book) => (
            <div
              key={book._id}
              onClick={async () => {
                codeBookHandler.ultimateCleanUp();
                const toastId = toast.loading("Loading codebook...");
                try {
                  const codebookData = await fetchCodebook(book._id);

                  codeBookHandler.initiate();
                  codeBookHandler.setId(book._id);
                  codeBookHandler.loadCodebook(codebookData);

                  toast.success("Codebook loaded successfully", { id: toastId });
                  router.push("/editor");
                } catch (error) { 
                  console.error("Error fetching codebook data:", error);
                  toast.error("Could not load codebook. Please try again.", {id: toastId});
                }
              }}
              className={`grid grid-cols-12 gap-4 px-6 py-5 rounded-xl items-center shadow-sm transition-all hover:scale-[1.01] cursor-pointer ${
                serialNumber % 2 === 0
                  ? "bg-[#3C3C3C] text-white shadow-md"
                  : "bg-white text-gray-800 hover:bg-white"
              }`}
            >
              <div className="col-span-1 opacity-80">{serialNumber++}</div>
              <div className="col-span-4 font-medium text-sm md:text-lg">
                {book.codebook_name}
              </div>
              <div className="col-span-2 opacity-80 text-sm">
                {book.owner._id === userId ? "You" : book.owner.name}
              </div>
              <div className="col-span-4 flex items-center gap-2 opacity-80 text-sm">
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
                {book.updatedAt
                  ? dateFormat
                      .format(new Date(book.updatedAt))
                      .replace(" at ", ", ")
                  : "N/A"}
              </div>
              <div className="col-span-1 flex justify-center">
                <button
                  onClick={(e) => handleDeleteClick(e, book._id)}
                  className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                  title="Delete Codebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreateCodebookModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      
      <DeleteVerificationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
