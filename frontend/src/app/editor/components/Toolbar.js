import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getPDF } from "@/utility/pdf/PDF_Engine";
import { ConfigHandler } from "@/utility/configHandler";
import { CodeBookHandler } from "@/utility/codeBookHandler";
import { modifyCodebook } from "@/app/api/pdf.api.js";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function Toolbar({
  currentTool,
  handleToolSelection,
  onDownload,
  canDownload,
}) {
  const configHandler = useMemo(() => new ConfigHandler(), []);

  const primaryTools = [
    { key: 1, title: "Code Segments", icon: "icons/code-segment.svg" },
    { key: 2, title: "Category", icon: "icons/categories.svg" },
    { key: 3, title: "Github Repos", icon: "icons/github-repos.svg" },
    { key: 4, title: "Configure", icon: "icons/configure.svg" },
    { key: 8, title: "Save", icon: "icons/save.svg" },
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
          configHandler={configHandler}
          onDownload={onDownload}
          canDownload={canDownload}
        />
      ))}

      <div
        className={`flex-1 w-full`}
        onClick={() => handleToolSelection(0)}
      ></div>

      {secondaryTools.map((tool) => (
        <ToolbarElement
          key={tool.key}
          toolKey={tool.key}
          icon={tool.icon}
          title={tool.title}
          currentTool={currentTool}
          handleToolSelection={handleToolSelection}
          configHandler={configHandler}
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
  configHandler,
  onDownload,
  canDownload,
}) {
  const selected = toolKey === currentTool;
  const router = useRouter();

  const [id, setId] = useState(null);
  const session = useSession();
  const userId = session?.data?.user?.id;
  const codeBookHandler = new CodeBookHandler();

  useEffect(() => {
    const codebookId = codeBookHandler.getId();
    setId(codebookId);
  }, [configHandler]);

  return (
    <div
      className={`
				flex flex-col items-center justify-center 
				w-full bg-black text-white 
				p-3 gap-2 group cursor-pointer
			`}
      onClick={() => {
        const targetToolKey = selected ? 0 : toolKey;
        if (toolKey === 6) {
          router.push("/dashboard");
          return;
        }

        if (toolKey === 8) {
          const config = codeBookHandler.createSchemaData(id, true);
          config.owner = userId;
          console.log("Config to be saved: ", config);
          toast.promise(modifyCodebook(id, config), {
            loading: "Saving configuration...",
            success: "Configuration saved successfully!",
            error: "Failed to save configuration. Please try again.",
          });

          return;
        }

        if (toolKey === 5) {
          try {
            onDownload();
          } catch (error) {
            console.log("Error occured when downloading file", error);
            toast.error("Failed to download PDF. Please try again.");
          }
          return;
        }

        handleToolSelection(targetToolKey);
      }}
    >
      <div
        className={`
          absolute left-0 w-1 bg-white transition-all duration-300 rounded-r
          ${selected ? "h-10 opacity-100" : "h-0 opacity-0"}
					group-hover:h-10 ${selected ? "group-hover:opacity-100" : "group-hover:opacity-50"}
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
