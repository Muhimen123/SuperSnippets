import GithubRepos from './githubrepos';
import CodeSegment from "./CodeSegment";
import Categories from './Categories';
import ConfigBar from './configbar';
import Settings from './settings';

export default function ContentSection({ activeTool, handleToolSelection }) {
  const renderContent = () => {
    switch (activeTool) {
      case 1:
        return <CodeSegment />;
      case 2:
        return <Categories />;
      case 3:
        return <GithubRepos />;
      case 4:
        return <ConfigBar />;
      case 5:
        return <h1 className="text-3xl font-bold">Download</h1>;
      case 6:
        return <h1 className="text-3xl font-bold">Home</h1>;
      case 7:
        // Pass onClose to switch back to the default tool (e.g., 1)
        return <Settings onClose={() => handleToolSelection(1)} />;
      default:
        return <h1 className="text-3xl font-bold">Default - None</h1>;
    }
  };

  return (
    <div className="h-full w-full">
      {renderContent()}
    </div>
  );
}
