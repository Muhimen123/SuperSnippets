import { useState, useEffect, useRef } from "react";

export default function Searchbar({ searchQuery, setSearchQuery, codebooks, selectedCodebookId, setSelectedCodebookId }) {
	const [showDropdown, setShowDropdown] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const dropdownRef = useRef(null);
	const listRef = useRef(null);

	const suggestions = codebooks
		.filter((book) =>
			book.codebook_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			book.owner.name.toLowerCase().includes(searchQuery.toLowerCase())
		)
		.sort((a, b) => {
			const query = searchQuery.toLowerCase();
			const aName = a.codebook_name.toLowerCase();
			const bName = b.codebook_name.toLowerCase();

			// Prioritize name starts with query
			if (aName.startsWith(query) && !bName.startsWith(query)) return -1;
			if (!aName.startsWith(query) && bName.startsWith(query)) return 1;

			// Then prioritize owner starts with query
			const aOwner = a.owner.name.toLowerCase();
			const bOwner = b.owner.name.toLowerCase();
			if (aOwner.startsWith(query) && !bOwner.startsWith(query)) return -1;
			if (!aOwner.startsWith(query) && bOwner.startsWith(query)) return 1;

			return 0;
		});

	const handleInputChange = (e) => {
		const value = e.target.value;
		setSearchQuery(value);
		setSelectedCodebookId(null); // Reset selection when typing
		setShowDropdown(true);
		setSelectedIndex(-1);
	};

	const handleClear = () => {
		setSearchQuery("");
		setSelectedCodebookId(null);
		setShowDropdown(false);
	};

	const handleKeyDown = (e) => {
		if (!showDropdown || suggestions.length === 0) return;

		if (e.key === "ArrowDown") {
			e.preventDefault();
			setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
		} else if (e.key === "Enter" && selectedIndex >= 0) {
			e.preventDefault();
			handleSelect(suggestions[selectedIndex]);
		} else if (e.key === "Escape") {
			setShowDropdown(false);
		}
	};

	const handleSelect = (book) => {
		setSearchQuery(book.codebook_name);
		setSelectedCodebookId(book._id);
		setShowDropdown(false);
		setSelectedIndex(-1);
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setShowDropdown(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Scroll to selected item
	useEffect(() => {
		if (selectedIndex >= 0 && listRef.current) {
			const list = listRef.current;
			const element = list.children[selectedIndex];
			if (element) {
				element.scrollIntoView({ block: 'nearest' });
			}
		}
	}, [selectedIndex]);

	return (
		<div className="w-full lg:w-[40vw] max-w-2xl mx-auto relative lg:-translate-x-15" ref={dropdownRef}>
			<input
				type="text"
				value={searchQuery}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				onFocus={() => setShowDropdown(true)}
				placeholder="Search CodeBooks..."
				className="p-3 pr-10 border border-gray-300 rounded-lg w-full shadow-sm bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
			/>
			<div 
				className={`absolute inset-y-0 right-0 flex items-center pr-3 ${selectedCodebookId ? 'cursor-pointer pointer-events-auto' : 'pointer-events-none'}`}
				onClick={selectedCodebookId ? handleClear : undefined}
			>
				{selectedCodebookId ? (
					<svg
						className="w-5 h-5 text-gray-500 hover:text-gray-700"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M6 18L18 6M6 6l12 12"
						></path>
					</svg>
				) : (
					<svg
						className="w-5 h-5 text-gray-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						></path>
					</svg>
				)}
			</div>

			{/* Dropdown Suggestions */}
			{showDropdown && searchQuery && suggestions.length > 0 && (
				<div
					ref={listRef}
					className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
				>
					{suggestions.map((book, index) => (
						<div
							key={book._id}
							onClick={() => handleSelect(book)}
							className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-none ${index === selectedIndex ? "bg-gray-100" : "hover:bg-gray-50"
								}`}
						>
							<div className="font-medium text-sm text-gray-900">{book.codebook_name}</div>
							<div className="text-xs text-gray-500">{book.owner.name}</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}