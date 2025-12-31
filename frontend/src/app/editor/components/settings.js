"use client";
import { useState } from "react";
import ImportExport from "./ImportExport";
import Contributors from "./Contributors";
import ActivityLog from "./ActivityLog";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Import/Export");

  const tabs = ["Import/Export", "Contributors", "Activity Log"];

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#E5E5E5] w-[90%] max-w-5xl h-[80%] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header / Tabs */}
        <div className="px-8 pt-8 pb-0 border-b border-gray-400">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  pb-4 font-mono text-sm font-bold transition-colors relative
                  ${activeTab === tab ? "text-black" : "text-gray-500 hover:text-gray-700"}
                `}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-[#D9D9D9] m-8 rounded-2xl overflow-hidden border border-gray-300 relative">
          {activeTab === "Import/Export" && <ImportExport />}
          {activeTab === "Contributors" && <Contributors />}
          {activeTab === "Activity Log" && <ActivityLog />}
        </div>
      </div>
    </div>
  );
}