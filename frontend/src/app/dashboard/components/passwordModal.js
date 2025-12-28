import PasswordField from "../../components/PasswordField";

export default function PasswordModal({ isOpen, onClose }) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
			<div
				className="absolute inset-0 bg-black/50 backdrop-blur-sm"
				onClick={onClose}
			/>
			<div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative z-10 font-mono">
				<h3 className="text-xl font-bold mb-8 text-gray-900">Change Password</h3>
				<div className="space-y-6">
					<PasswordField
						label="CURRENT PASSWORD"
						placeholder="Enter current password"
						showToggle={true}
					/>
					<PasswordField
						label="NEW PASSWORD"
						placeholder="Enter new password"
						showToggle={true}
					/>
					<PasswordField
						label="CONFIRM NEW PASSWORD"
						placeholder="Confirm new password"
						showToggle={true}
					/>
					<div className="flex gap-4 pt-6">
						<button
							onClick={onClose}
							className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
						>
							Cancel
						</button>
						<button
							onClick={onClose}
							className="flex-1 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 font-medium transition-colors shadow-lg shadow-black/20"
						>
							Update Password
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
