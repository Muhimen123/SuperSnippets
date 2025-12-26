"use client";

import { useState } from "react";

export default function Constraints() {
  const [constraints, setConstraints] = useState({
    font: 'Placeholder',
    headerText: '',
    marginSize: 0,
    fontSize: 0,
    columns: 0,
    pageLimit: 0
  });

  const handleChange = (field, value) => {
    setConstraints(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCounterChange = (field, increment) => {
    setConstraints(prev => ({
      ...prev,
      [field]: Math.max(0, prev[field] + increment)
    }));
  };

  const CounterInput = ({ label, value, field }) => (
    <div>
      <label className="block text-sm font-medium text-black mb-2 font-mono">{label}</label>
      <div className="flex items-center rounded-lg px-2" style={{ backgroundColor: '#aeadadff' }}>
        <input
          type="text"
          value={value === 0 ? 'Placeholder' : value}
          readOnly
          className="flex-1 bg-transparent text-gray-600 text-left p-3 text-sm border-none outline-none font-mono"
        />
        <div className="flex flex-col">
          <button
            onClick={() => handleCounterChange(field, 1)}
            className="text-black hover:text-gray-700 transition-colors leading-none mb-1"
            aria-label={`Increase ${label}`}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.25 7.25L6 4.5L8.75 7.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => handleCounterChange(field, -1)}
            className="text-black hover:text-gray-700 transition-colors leading-none"
            aria-label={`Decrease ${label}`}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.25 4.75L6 7.5L8.75 4.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full" style={{ width: '1008px' }}>
      <div className="rounded-xl p-12 min-h-[300px]" style={{ backgroundColor: '#d9d9d9' }}>
        <div className="grid grid-cols-2 gap-x-12 gap-y-8">
          {/* Font */}
          <div>
            <label className="block text-sm font-medium text-black mb-2 font-mono">Font</label>
            <div className="relative">
              <select 
                value={constraints.font}
                onChange={(e) => handleChange('font', e.target.value)}
                className="w-full rounded-lg p-3 text-sm border-none outline-none text-gray-600 appearance-none font-mono"
                style={{ backgroundColor: '#aeadadff' }}
              >
                <option>Placeholder</option>
                <option>Arial</option>
                <option>Times New Roman</option>
                <option>Courier New</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-black">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.25 4.75L6 7.5L8.75 4.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
            <div className="flex justify-between mb-2">
              <label className="block text-sm font-medium text-black font-mono">Header Text</label>
              <span className="text-sm text-gray-600 font-mono">0/100</span>
            </div>
            <textarea
              value={constraints.headerText}
              onChange={(e) => handleChange('headerText', e.target.value)}
              placeholder="Placeholder"
              className="w-full rounded-lg p-3 text-sm border-none outline-none text-gray-600 font-mono resize-none h-32"
              style={{ backgroundColor: '#aeadadff' }}
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