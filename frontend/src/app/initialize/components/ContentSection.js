import GithubRepo from "./GithubRepo";
import CodeImport from "./CodeImport";
import Constraints from "./Constraints";
import FinalCheck from "./FinalCheck";

export default function ContentSection({ activeStep, repos, setRepos, files, setFiles, githubUrl, setGithubUrl }) {
  const renderContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <GithubRepo 
            repos={repos} 
            setRepos={setRepos} 
            githubUrl={githubUrl} 
            setGithubUrl={setGithubUrl} 
          />
        );
      case 2:
        return <CodeImport files={files} setFiles={setFiles} />;
      case 3:
        return <Constraints />;
      default:
        return <FinalCheck repos={repos} files={files} />;
    }
  };

  return (
    <div className="min-h-[200px] flex items-center justify-center w-full">
      {renderContent()}
    </div>
  );
}