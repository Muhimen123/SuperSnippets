import Parser from "tree-sitter";
import CPP from "tree-sitter-cpp";

const parser = new Parser();
parser.setLanguage(CPP);

export const checkMatches = (snippetscode) => {
  console.log("Successfully connected");
  let codesegments = [];

  for (const category of snippetscode) {
    for (const codesegment of category.codesegments) {
      codesegments.push({
        name: codesegment.name,
        content: codesegment.content,
      });
    }
  }

  const length = codesegments.length;
  const similarities = [];
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      const similarity = calculateJaccard(
        codesegments[i].content,
        codesegments[j].content,
      );

      if (similarity > 0.8) {
        const sim = {
          fila_one: codesegments[i].name,
          file_two: codesegments[j].name,
          similarity: similarity,
        };
        similarities.push(sim);
      }
    }
  }

	return similarities;
};

function getAllNodeTypes(node, types = []) {
  types.push(node.type);
  for (let i = 0; i < node.childCount; i++) {
    getAllNodeTypes(node.child(i), types);
  }
  return types;
}

function calculateJaccard(code1, code2) {
  const tree1 = parser.parse(code1);
  const tree2 = parser.parse(code2);

  const setA = new Set(getAllNodeTypes(tree1.rootNode));
  const setB = new Set(getAllNodeTypes(tree2.rootNode));

  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);

  const similarity = intersection.size / union.size;
  const distance = 1 - similarity;

  return similarity;
}
