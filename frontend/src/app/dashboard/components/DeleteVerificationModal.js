export default function DeleteVerificationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative z-10 font-mono">
        <h3 className="text-xl font-bold mb-4 text-gray-900">Delete Codebook</h3>
        <p className="text-gray-600 mb-8">
          Are you sure you want to delete this codebook? This action cannot be undone.
        </p>
        
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors shadow-lg shadow-red-600/20"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}