import GithubRepos from './githubrepos';
export default function ContentSection({ activeTool }) {
  const renderContent = () => {
    switch (activeTool) {
      case 1:
        return <h1 className="text-3xl font-bold">Code Segment</h1>;
      case 2:
        return <h1 className="text-3xl font-bold">Categories</h1>;
      case 3:
        return <GithubRepos />;
      case 4:
        return <h1 className="text-3xl font-bold">Configuration</h1>;
      case 5:
        return <h1 className="text-3xl font-bold">Download</h1>;
      case 6:
        return <h1 className="text-3xl font-bold">Home</h1>;
      case 7:
        return <h1 className="text-3xl font-bold">Settings</h1>;
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
