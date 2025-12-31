"use client";

export default function ActivityLog() {
  const logs = [
    { name: "Rashed Islam", handle: "GitHub Handle?", action: "BFS", date: "12/10/25" },
    { name: "Asif Rahman", handle: "Email?", action: "DFS", date: "12/10/25" },
    { name: "Sameen Abrar", handle: "Email?", action: "Tree", date: "12/11/25" },
    { name: "Al Muhimen", handle: "GitHub?", action: "Dijkstra", date: "13/11/25" },
  ];

  return (
    <div className="p-8 w-full h-full overflow-y-auto">
      <div className="space-y-3">
        {logs.map((log, index) => (
          <div key={index} className="bg-white p-4 rounded-lg flex justify-between items-center shadow-sm">
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