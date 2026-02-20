import TextField from "../../components/TextField";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConfigHandler } from "@/utility/configHandler";

export default function CreateCodebookModal({ isOpen, onClose }) {
	if (!isOpen) return null;
	const router = useRouter();
	const [codebookName, setCodebookName] = useState("");
	const [error, setError] = useState("");

	const handleCreate = () => {
		if (!codebookName.trim()) {
			setError("Codebook name cannot be empty");
			return;
		}

		const configHandler = new ConfigHandler();
		configHandler.clearAll();
		configHandler.initiate(codebookName);

		router.push('/initialize');
	};

	return (
		<div className="fixed inset-0 z-60 flex items-center justify-center p-4">
			<div
				className="absolute inset-0 bg-black/50 backdrop-blur-sm"
				onClick={onClose}
			/>
			<div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative z-10 font-mono">
				<h3 className="text-xl font-bold mb-8 text-gray-900">Create New Codebook</h3>
				<div className="space-y-6">
					<div>
						{error && <p className="text-red-500 text-xs mb-2 font-medium">{error}</p>}
						<TextField
							label="CODEBOOK NAME"
							placeholder="Enter codebook name"
							autoFocus
							value={codebookName}
							onChange={(e) => {
								setCodebookName(e.target.value);
								if (error) setError("");
							}}
						/>
					</div>
					<div className="flex gap-4 pt-6">
						<button
							onClick={onClose}
							className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
						>
							Cancel
						</button>
						<button
							onClick={handleCreate}
							className="flex-1 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 font-medium transition-colors shadow-lg shadow-black/20"
						>
							Create
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
