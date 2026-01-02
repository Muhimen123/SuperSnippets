"use client";

export default function ActivityLog() {
  const logs = [
    { name: "Rashed Islam", handle: "rashedhippo@gmail.com", action: "BFS", date: "01/01/26" },
    { name: "Asif Rahman", handle: "asifrifat143@gmail.com", action: "DFS", date: "02/01/26" },
    { name: "Sameen Abrar", handle: "sameenpcc2020@gmail.com", action: "Kadane's Algorithm", date: "03/01/26" },
    { name: "Al Muhimen", handle: "kibene2010@gmail.com", action: "Topological Sort", date: "04/01/26" },
    { name: "Rashed Islam", handle: "rashedhippo@gmail.com", action: "BFS", date: "05/01/26" },
    { name: "Asif Rahman", handle: "asifrifat143@gmail.com", action: "DFS", date: "06/01/26" },
    { name: "Sameen Abrar", handle: "sameenpcc2020@gmail.com", action: "BFS", date: "07/01/26" },
    { name: "Al Muhimen", handle: "kibene2010@gmail.com", action: "Kadane's Algorithm", date: "08/01/26" }
  ];

  return (
    <div className="px-5 py-5 w-full h-full overflow-y-auto custom-scrollbar">
      <div className="space-y-2">
        {logs.map((log, index) => (
          <div key={index} className="bg-white p-3 rounded-lg flex justify-between items-center shadow-sm">
            <div>
              <div className="font-mono font-bold text-sm">{log.name}</div>
              <div className="font-mono text-xs text-gray-500">{log.handle}</div>
            </div>
            <div className="text-right">
              <div className="font-mono font-bold text-sm">{log.action}</div>
              <div className="font-mono text-xs text-gray-500">{log.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}