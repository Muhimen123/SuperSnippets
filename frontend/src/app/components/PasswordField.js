"use client";

import { useState } from "react";

export default function PasswordField({ 
  label = "PASSWORD", 
  placeholder = "••••••••••••••••••••", 
  value, 
  onChange, 
  className = "",
  showToggle = false,
  ...props 
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={className}>
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={showToggle && showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
          {...props}
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
}