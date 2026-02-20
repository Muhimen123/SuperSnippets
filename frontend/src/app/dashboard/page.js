"use client";

import { useState } from "react";
import TileBackground from "../components/TileBackground";
import Searchbar from "../dashboard/components/searchbar";
import { LogoSection } from "../components/NavBar";
import AccountIcon from "../dashboard/components/accounticon";
import Content from "../dashboard/components/content";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCodebookId, setSelectedCodebookId] = useState(null);

  const codebooks = [
    {
      id: "01",
      name: "Codebook 01",
      owner: "Alice Johnson",
      date: "Just now",
      variant: "dark",
    },
    {
      id: "02",
      name: "MIST Team 06",
      owner: "Bob Smith",
      date: "A minute ago",
      variant: "light",
    },
    {
      id: "03",
      name: "Ultimate Codebook",
      owner: "Charlie Brown",
      date: "1 hour ago",
      variant: "dark",
    },
    {
      id: "04",
      name: "Codebook Draft",
      owner: "David Wilson",
      date: "Yesterday",
      variant: "light",
    },
    {
      id: "05",
      name: "Algorithms Snippets",
      owner: "Eve Davis",
      date: "2 days ago",
      variant: "dark",
    },
    {
      id: "06",
      name: "Data Structures",
      owner: "Frank Miller",
      date: "Last week",
      variant: "light",
    },
    {
      id: "07",
      name: "Graph Theory",
      owner: "Grace Lee",
      date: "2 weeks ago",
      variant: "dark",
    },
    {
      id: "08",
      name: "Dynamic Programming",
      owner: "Hank Green",
      date: "A month ago",
      variant: "light",
    },
    {
      id: "09",
      name: "Math Snippets",
      owner: "Ivy White",
      date: "2 months ago",
      variant: "dark",
    },
    {
      id: "10",
      name: "Geometry Codebook",
      owner: "Jack Black",
      date: "3 months ago",
      variant: "light",
    },
  ];

  return (
    <div>
      <TileBackground>
        <DesktopNavbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          codebooks={codebooks}
          selectedCodebookId={selectedCodebookId}
          setSelectedCodebookId={setSelectedCodebookId}
        />
        <MobileNavbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          codebooks={codebooks}
          selectedCodebookId={selectedCodebookId}
          setSelectedCodebookId={setSelectedCodebookId}
        />
        <div>
          <Content
            codebooks={codebooks}
            selectedCodebookId={selectedCodebookId}
          />
        </div>
      </TileBackground>
    </div>
  );
}

function DesktopNavbar({
  searchQuery,
  setSearchQuery,
  codebooks,
  selectedCodebookId,
  setSelectedCodebookId,
}) {
  return (
    <nav
      className={`
				fixed top-0 w-full z-50 
				hidden lg:flex justify-between items-center p-5
				border-b border-white/0	
      `}
    >
      <LogoSection />
      <Searchbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        codebooks={codebooks}
        selectedCodebookId={selectedCodebookId}
        setSelectedCodebookId={setSelectedCodebookId}
      />
      <AccountIcon />
    </nav>
  );
}

function MobileNavbar({
  searchQuery,
  setSearchQuery,
  codebooks,
  selectedCodebookId,
  setSelectedCodebookId,
}) {
  return (
    <nav
      className={`
				fixed top-0 w-full z-50
				lg:hidden flex justify-between items-center p-5
				border-b border-white/0
			`}
    >
      <LogoSection />
      <div className="flex-1 px-4">
        <Searchbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          codebooks={codebooks}
          selectedCodebookId={selectedCodebookId}
          setSelectedCodebookId={setSelectedCodebookId}
        />
      </div>
      <AccountIcon />
    </nav>
  );
}
