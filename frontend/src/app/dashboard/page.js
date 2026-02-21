"use client";

import { useEffect, useState } from "react";
import TileBackground from "../components/TileBackground";
import Searchbar from "../dashboard/components/searchbar";
import { LogoSection } from "../components/NavBar";
import AccountIcon from "../dashboard/components/accounticon";
import Content from "../dashboard/components/content";
import { fetchUserCodebooks } from "../api/pdf.api";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: sessionData } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCodebookId, setSelectedCodebookId] = useState(null);

  const [codebooks, setCodebooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = sessionData?.user?.id;

  const loadCodebooks = async () => {
    if (!userId) {
      return [];
    }

    try {
      const fetchedCodebooks = await fetchUserCodebooks(userId);
      console.log("Fetched codebooks:", fetchedCodebooks);
      return fetchedCodebooks;
    } catch (error) {
      console.error("Error fetching codebooks:", error);
      return [];
    }
  };

  const refreshCodebooks = async () => {
    setIsLoading(true);
    const fetchedCodebooks = await loadCodebooks();
    setCodebooks(fetchedCodebooks);
    setIsLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    loadCodebooks().then((fetchedCodebooks) => {
      if (!isMounted) return;
      setCodebooks(fetchedCodebooks);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [userId]);

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
          {isLoading ? (
            <LoadingState />
          ) : (
            <Content
              codebooks={codebooks}
              selectedCodebookId={selectedCodebookId}
              refreshCodebooks={refreshCodebooks}
            />
          )}
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

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] w-full gap-4">
    {/* A simple CSS spinner or pulse effect */}
    <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
    <p className="text-black/60 font-mono text-sm animate-pulse">
      Fetching your codebooks...
    </p>
  </div>
);
