export default function Toolbar() {
  const primaryTools = [
    { title: "Code Segments", icon: "icons/code-segment.svg" },
    { title: "Category", icon: "icons/categories.svg" },
    { title: "Github Repos", icon: "icons/github-repos.svg" },
    { title: "Configure", icon: "icons/configure.svg" },
    { title: "Download", icon: "icons/download.svg" },
  ];

  const secondaryTools = [
    { title: "Home", icon: "icons/home.svg" },
    { title: "Settings", icon: "icons/settings.svg" },
  ];

  return (
    <div
      className={`flex flex-col items-center w-[100px] p-5 bg-black min-h-screen`}
    >
      {primaryTools.map((tool) => (
        <ToolbarElement key={tool.title} icon={tool.icon} title={tool.title} />
      ))}

      <div className={`flex-1`}></div>

      {secondaryTools.map((tool) => (
        <ToolbarElement key={tool.title} icon={tool.icon} title={tool.title} />
      ))}
    </div>
  );
}

function ToolbarElement({ icon, title, selected = false }) {
  return (
    <div
      className={`
				flex flex-col items-center justify-center 
				w-full bg-black text-white 
				p-3 gap-2 group cursor-pointer
			`}
    >
      <div
        className={`
          absolute left-0 w-2 bg-white transition-all duration-300 rounded
          ${selected ? "h-10 opacity-100" : "h-0 opacity-0"}
					group-hover:h-10 group-hover:opacity-50
        `}
      ></div>

      <img
        src={icon}
        className="brightness-0 invert group-active:scale-95"
        height={30}
        width={30}
        alt={title}
      />
      <h6 className="text-center text-xs font-medium group-active:scale-95">{title}</h6>
    </div>
  );
}
