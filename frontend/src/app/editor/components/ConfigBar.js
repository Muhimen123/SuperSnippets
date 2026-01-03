import React from "react";
import { useState } from "react";

const Input = (props) => (
  <input
    {...props}
    className="w-full bg-[#E5E5E5] text-black p-3 rounded-lg outline-none focus:ring-2 focus:ring-black/20 transition-all placeholder-black/40 hover:bg-[#E5E5E5] font-mono"
  />
);

const Select = ({ children, ...props }) => (
  <div className="relative">
    <select
      {...props}
      className="w-full bg-[#E5E5E5] text-black p-3 rounded-lg appearance-none outline-none focus:ring-2 focus:ring-black/20 transition-all cursor-pointer hover:bg-[#E5E5E5] font-mono"
    >
      {children}
    </select>
    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
      <svg
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L5 5L9 1"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </div>
);

const PREDEFINED_FONTS = [
  "Jetbrains Mono",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Cascadia Code",
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Georgia",
  "Courier New",
  "Verdana",
];

export default function ConfigBar() {
  const [fonts, setFonts] = useState(PREDEFINED_FONTS);

  return (
    <div className="flex flex-col h-full w-80 border-r-2 border-black bg-white text-black font-mono p-6 overflow-y-auto gap-6">
      {/* Font */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm">Font</label>
        <Select>
          {fonts.map((font, index) => (
            <option key={index} value={font} style={{ fontFamily: font }}>
              {font}
            </option>
          ))}
        </Select>
      </div>

      {/* Font Size */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm">Font Size</label>
        <Input type="number" placeholder="11" />
      </div>

      {/* Header Text */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="font-bold text-sm">Header Text</label>
          <span className="text-xs opacity-60">0/100</span>
        </div>
        <textarea
          className="w-full bg-[#E5E5E5] text-black p-3 rounded-lg outline-none resize-none h-24 focus:ring-2 focus:ring-black/20 transition-all placeholder-black/40 hover:bg-[#E5E5E5] font-mono"
          placeholder="CodeBook"
          maxLength={100}
        />
      </div>

      {/* Margin Size */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm">Margin Size (cm)</label>
        <Input type="number" placeholder="3" />
      </div>

      {/* Columns */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm">Columns</label>
        <Input type="number" placeholder="1" />
      </div>

      {/* Page Limit */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm">Page Limit</label>
        <Input type="number" placeholder="1" />
      </div>

      {/* Page Orientation */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm">Page Orientation</label>
        <Select>
          <option value={"landscape"}>Landscape</option>
          <option value={"portrait"}>Portrait</option>
        </Select>
      </div>
    </div>
  );
}
