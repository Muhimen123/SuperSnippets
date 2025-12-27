export default function Toolbar() {
  const tools = [
    { title: "Code Segments", icon: "icons/code-segment.svg" },
    { title: "Categories", icon: "icons/categories.svg" },
    { title: "Github Repos", icon: "icons/github-repos.svg" },
    { title: "Configure", icon: "icons/configure.svg" },
    { title: "Download", icon: "icons/download.svg" },
  ];
  return (
    <div className={`w-[100px] bg-black min-h-screen`}>
      {tools.map((tool) => (
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
			bg-black text-white p-3 gap-2
		`}
    >
      <img src={icon} height={30} width={30} />
      <h6 className={`text-center text-sm`}>{title}</h6>
    </div>
  );
}
