"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import TileBackground from "../components/TileBackground";
import FeatureCardDocs from "../components/FeatureCardDocs";

export default function FeaturesPage() {
  const [highlightId, setHighlightId] = useState(null);

  useEffect(() => {
    function handleHash() {
      const h = window.location.hash;
      if (h && h.startsWith("#")) {
        const id = h.slice(1);
        setHighlightId(id);
        const el = document.getElementById(id);
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
        }
      } else {
        setHighlightId(null);
      }
    }

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <TileBackground>
      <Navbar />
      <main className="flex items-start justify-center min-h-screen pt-28 pb-16 px-6">
        <div className="max-w-4xl w-full">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-2 inline-block heading-with-underline">Features</h1>
            <style>{`
.heading-with-underline{position:relative}
.heading-with-underline::after{content:'';position:absolute;left:0;bottom:-8px;height:3px;background:#000;width:0;animation:underlineGrow 1s ease forwards}
@keyframes underlineGrow{from{width:0}to{width:100%}}
`}</style>
          </header>

          <section className="flex flex-col gap-6">
            <FeatureCardDocs
              id="code-fetching"
              title="Code Fetching"
              items={[
                "Give your repository URL to fetch code automatically",
                "guide your codebook constraints",
                "Add,remove or customize your codebook as your wish",
              ]}
              highlight={highlightId === "code-fetching"}
            />

            <FeatureCardDocs
              id="syntax-highlighting"
              title="Syntax Highlighting"
              items={[
                " Highlight your codebook with consistent theme",
                "Optional line numbers and inline annotations",
                "Easy PDF exports",
              ]}
              highlight={highlightId === "syntax-highlighting"}
            />

            <FeatureCardDocs
              id="collaboration"
              title="Easy Collaboration"
              items={[
                "Shareable codebooks with invite links",
                "Let others customize your codebooks",
              ]}
              highlight={highlightId === "collaboration"}
            />

            <FeatureCardDocs
              id="import-export"
              title="Import & Export"
              items={[
                "Export to printable PDF with embedded snippets",
                "Save your latest work and happily use in offline mode",
              ]}
              highlight={highlightId === "import-export"}
            />
          </section>
        </div>
      </main>
    </TileBackground>
  );
}
