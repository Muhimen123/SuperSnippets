"use client";

import { ConfigHandler } from "@/utility/configHandler";

export default function Constraints({ constraints, setConstraints }) {
  const configHandler = new ConfigHandler();

  const PREDEFINED_FONTS = [
    "Jetbrains Mono",
    "Inconsolata",
    "Courier",
    "Source Code Pro",
    "Bera Mono",
  ];

  const handleChange = (field, value) => {
    setConstraints((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCounterChange = (field, increment) => {
    setConstraints((prev) => {
      const newValue = Math.max(0, prev[field] + increment);

      if (field === "marginSize") {
        configHandler.setMargin(newValue);
      } else if (field === "fontSize") {
        configHandler.setFontSize(newValue);
      } else if (field === "columns") {
        configHandler.setColumns(newValue);
      } else if (field === "pageLimit") {
        configHandler.setPageLimit(newValue);
      }

      return {
        ...prev,
        [field]: newValue,
      };
    });
  };

  const CounterInput = ({ label, value, field }) => (
    <div>
      <label className="block text-md font-medium text-black mb-1 font-mono">
        {label}
      </label>
      <div
        className="relative flex items-center rounded-lg"
        style={{ backgroundColor: "#aeadadff" }}
      >
        <input
          type="text"
          value={value === 0 ? "0" : value}
          readOnly
          className="w-full bg-transparent text-gray-600 text-left px-4 py-2 text-sm border-none outline-none font-mono"
        />
        <div className="absolute right-2 flex flex-col gap-0.5">
          <button
            onClick={() => handleCounterChange(field, 1)}
            className="text-black hover:text-gray-700 transition-colors leading-none"
            aria-label={`Increase ${label}`}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.25 7.25L6 4.5L8.75 7.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => handleCounterChange(field, -1)}
            className="text-black hover:text-gray-700 transition-colors leading-none"
            aria-label={`Decrease ${label}`}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.25 4.75L6 7.5L8.75 4.75"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-[1200px]">
      <div
        className="rounded-3xl px-6 md:px-16 py-8 min-h-[300px]"
        style={{ backgroundColor: "#d9d9d9" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {/* Font */}
          <div>
            <label className="block text-md font-medium text-black mb-1 font-mono">
              Font
            </label>
            <div className="relative">
              <select
                value={constraints.font}
                onChange={(e) => {
                  handleChange("font", e.target.value);
                  configHandler.setFont(e.target.value);
                }}
                className="w-full rounded-lg px-4 py-2 text-sm border-none outline-none text-gray-600 appearance-none font-mono"
                style={{ backgroundColor: "#aeadadff" }}
              >
                {PREDEFINED_FONTS.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-black">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.25 4.75L6 7.5L8.75 4.75"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Margin Size */}
          <CounterInput
            label="Margin Size"
            value={constraints.marginSize}
            field="marginSize"
          />

          {/* Font Size */}
          <CounterInput
            label="Font Size"
            value={constraints.fontSize}
            field="fontSize"
          />

          {/* Columns */}
          <CounterInput
            label="Columns"
            value={constraints.columns}
            field="columns"
          />

          {/* Header Text */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="block text-md font-medium text-black font-mono">
                Header Text
              </label>
              <span className="text-sm text-gray-600 font-mono">
                {`${(constraints.headerText || "").length} / 100`}
              </span>
            </div>
            <textarea
              value={constraints.headerText}
              onChange={(e) => {
                handleChange("headerText", e.target.value);
                configHandler.setHeader(e.target.value);
              }}
              placeholder="0"
              maxLength={100}
              className="w-full rounded-lg px-4 py-2 text-sm border-none outline-none text-gray-600 font-mono resize-none h-24"
              style={{ backgroundColor: "#aeadadff" }}
            />
          </div>

          {/* Page Limit */}
          <div>
            <CounterInput
              label="Page Limit"
              value={constraints.pageLimit}
              field="pageLimit"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
