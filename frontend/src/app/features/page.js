import Navbar from "../components/NavBar";
import TileBackground from "../components/TileBackground";
import FeatureCardDocs from "../components/FeatureCardDocs";

export default function FeaturesPage() {
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
                "Fetch entire repositories or selected paths",
                "Authenticate for private repositories (token / OAuth)",
                "Branch selection and shallow fetch options",
                "Filter files by extension or path",
              ]}
            />

            <FeatureCardDocs
              id="syntax-highlighting"
              title="Syntax Highlighting"
              items={[
                "Language-aware highlighting with consistent theme",
                "Optional line numbers and inline annotations",
                "Deterministic rendering for PDF exports",
              ]}
            />

            <FeatureCardDocs
              id="collaboration"
              title="Easy Collaboration"
              items={[
                "Shareable codebooks with invite links",
                "Role-based permissions (owner, editor, commenter, viewer)",
                "Version history with change review and revert",
              ]}
            />

            <FeatureCardDocs
              id="import-export"
              title="Import & Export"
              items={[
                "Export to printable PDF with embedded snippets",
                "Export and import JSON for portable, editable projects",
                "Include or omit source files in exports",
              ]}
            />
          </section>
        </div>
      </main>
    </TileBackground>
  );
}
