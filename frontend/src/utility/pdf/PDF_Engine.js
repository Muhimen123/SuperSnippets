import { pdf } from "@react-pdf/renderer";
import CodeBookDocument from "./CodeBookDocument";

const snippets = [
  {
    name: "Button.tsx",
    content: "const Button = () => <button>Click</button>",
  },
  { name: "theme.js", content: "export const colors = { blue: '#0070f3' }" },
  {
    name: "Dijkstra.ts",
    content: `function dijkstra(graph, start) {
        const distances = {};
        const visited = new Set();
        const nodes = Object.keys(graph);

        for (let node of nodes) {
          distances[node] = Infinity;
        }
        distances[start] = 0;

        while (nodes.length) {
          nodes.sort((a, b) => distances[a] - distances[b]);
          const closestNode = nodes.shift();

          if (distances[closestNode] === Infinity) break;

          visited.add(closestNode);

          for (let neighbor in graph[closestNode]) {
            if (!visited.has(neighbor)) {
              let newDistance = distances[closestNode] + graph[closestNode][neighbor];
              if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
              }
            }
          }
        }
        return distances;
      }`,
  },
];

const codeData = {
  title: "SuperSnippets Codebook",
  snippets,
};

export async function getPDF() {
  const doc = <CodeBookDocument {...codeData} />;
  const blob = await pdf(doc).toBlob();
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${codeData.title || "Codebook"}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url); // Clean up memory
}
