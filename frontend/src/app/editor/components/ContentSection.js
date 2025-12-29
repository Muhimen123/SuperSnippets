import GithubRepos from './githubrepos';
import CodeSegment from "./CodeSegment";
import Categories from './Categories';
import ConfigBar from './configbar';

export default function ContentSection({ activeTool, className }) {
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
        return <h1 className="text-3xl font-bold">Settings</h1>;
      default:
        return <div className={`w-0`}></div>;
    }
  };

  return (
    <div className={`h-full w-full ${className}`}>
      {renderContent()}
    </div>
  );
}
