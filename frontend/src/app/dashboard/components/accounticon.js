"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PasswordModal from "./passwordModal";
import { MOCK_AUTH_DATABASE } from "../../../utility/mockAuthDatabase";

export default function AccountIcon() {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
	const [name, setName] = useState("John Doe");
	const [email, setEmail] = useState("john.doe@example.com");
	const [isEditingName, setIsEditingName] = useState(false);

	useEffect(() => {
		const userEmail = localStorage.getItem("userEmail");
		if (userEmail) {
			const user = MOCK_AUTH_DATABASE.find((u) => u.email === userEmail);
			if (user) {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, []);

	return (
		<div>
			<div
				onClick={() => setIsOpen(true)}
				className="w-10 h-10 bg-black rounded-full flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
			>
				<img
					src="/github-mark-white.svg"
					alt="Account"
					className="w-6 h-6"
				/>
			</div>

			{/* Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/20 z-40"
					onClick={() => setIsOpen(false)}
				/>
			)}

			{/* Side Menu */}
			<div className={`
                fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
				<div className="p-6 flex flex-col h-full">
					<div className="flex justify-between items-center mb-8">
						<h2 className="text-xl font-bold text-gray-800">Account</h2>
						<button
							onClick={() => setIsOpen(false)}
							className="p-2 hover:bg-gray-100 rounded-full transition-colors"
						>
							<svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					<div className="space-y-2 flex-1 flex flex-col items-center pt-8">
						<div className="w-24 h-24 bg-black rounded-full flex items-center justify-center overflow-hidden mb-4">
							<img
								src="/github-mark-white.svg"
								alt="Account"
								className="w-14 h-14"
							/>
						</div>

						{isEditingName ? (
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								onBlur={() => setIsEditingName(false)}
								onKeyDown={(e) => {
									if (e.key === 'Enter') setIsEditingName(false);
								}}
								autoFocus
								className="text-xl font-semibold text-center border-b-2 border-black outline-none pb-1 w-full max-w-[200px]"
							/>
						) : (
							<h3
								onClick={() => setIsEditingName(true)}
								className="text-xl font-semibold text-gray-800 cursor-pointer hover:text-gray-600 flex items-center gap-2"
							>
								{name}
								<svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
								</svg>
							</h3>
						)}
						<p className="text-sm text-gray-500 mt-1">{email}</p>
					</div>

					<div className="pt-4 border-t border-gray-100">
						<button
							onClick={() => setIsChangePasswordOpen(true)}
							className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-3 text-gray-700"
						>
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
							Change Password
						</button>
						<button
							onClick={() => {
								localStorage.removeItem("userEmail");
								router.push("/");
							}}
							className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-3">
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
							</svg>
							Logout
						</button>
					</div>
				</div>
			</div>

			{/* Change Password Modal */}
			<PasswordModal
				isOpen={isChangePasswordOpen}
				onClose={() => setIsChangePasswordOpen(false)}
			/>
		</div>
	)
};