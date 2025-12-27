export default function Toolbar({ currentTool, handleToolSelection }) {
  const primaryTools = [
    { key: 1, title: "Code Segments", icon: "icons/code-segment.svg" },
    { key: 2, title: "Category", icon: "icons/categories.svg" },
    { key: 3, title: "Github Repos", icon: "icons/github-repos.svg" },
    { key: 4, title: "Configure", icon: "icons/configure.svg" },
    { key: 5, title: "Download", icon: "icons/download.svg" },
  ];

  const secondaryTools = [
    { key: 6, title: "Home", icon: "icons/home.svg" },
    { key: 7, title: "Settings", icon: "icons/settings.svg" },
  ];

  return (
    <div
      className={`flex flex-col items-center w-[100px] p-5 bg-black min-h-screen`}
    >
      {primaryTools.map((tool) => (
        <ToolbarElement
          key={tool.key}
          toolKey={tool.key}
          icon={tool.icon}
          title={tool.title}
          currentTool={currentTool}
          handleToolSelection={handleToolSelection}
        />
      ))}

      <div className={`flex-1`}></div>

      {secondaryTools.map((tool) => (
        <ToolbarElement
          key={tool.key}
          toolKey={tool.key}
          icon={tool.icon}
          title={tool.title}
          currentTool={currentTool}
          handleToolSelection={handleToolSelection}
        />
      ))}
    </div>
  );
}

function ToolbarElement({
  toolKey,
  icon,
  title,
  currentTool,
  handleToolSelection,
}) {
  const selected = toolKey === currentTool;
  return (
    <div
      className={`
				flex flex-col items-center justify-center 
				w-full bg-black text-white 
				p-3 gap-2 group cursor-pointer
			`}
      onClick={() => {
        console.log(`Called from handle ${toolKey}`);
        handleToolSelection(toolKey);
      }}
    >
      <div
        className={`
          absolute left-0 w-1 bg-white transition-all duration-300 rounded-r
          ${selected ? "h-10 opacity-100" : "h-0 opacity-0"}
					group-hover:h-10 group-hover:${selected ? "opacity-100" : "opacity-50"}
        `}
      ></div>

      <img
        src={icon}
        className="brightness-0 invert group-active:scale-95"
        height={30}
        width={30}
        alt={title}
      />
      <h6 className="text-center text-xs font-medium group-active:scale-95">
        {title}
      </h6>
    </div>
  );
}
