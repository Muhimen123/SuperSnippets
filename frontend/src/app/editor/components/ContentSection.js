import React from "react";
import GithubRepos from "./GithubRepos";
import CodeSegment from "./CodeSegment";
import Categories from "./Categories";
import ConfigBar from "./ConfigBar";
import Settings from "./Settings";

export default function ContentSection({
  activeTool,
  handleToolSelection,
  files,
  setFiles,
  activeFileIndex,
  setActiveFileIndex,
  categories,
  setCategories
}) {
  const renderContent = () => {
    switch (activeTool) {
      case 1:
        return (
          <CodeSegment 
            files={files} 
            setFiles={setFiles} 
            activeFileIndex={activeFileIndex} 
            setActiveFileIndex={setActiveFileIndex}
          />
        );
      case 2:
        return <Categories categories={categories} setCategories={setCategories} />;
      case 3:
        return <GithubRepos />;
      case 4:
        return <ConfigBar />;
      case 5:
        return <div className="w-0"></div>;
      case 6:
        return <h1 className="text-3xl font-bold">Home</h1>;
      case 7:
        return <Settings onClose={() => handleToolSelection(1)} />;
      default:
        return <div className="w-0"></div>;
    }
  };

  return <div className="h-full w-full">{renderContent()}</div>;
}
