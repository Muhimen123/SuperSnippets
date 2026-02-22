import Parser from "tree-sitter";
import CPP from "tree-sitter-cpp";

const parser = new Parser();
parser.setLanguage(CPP);

export const checkMatches = (snippetscode) => {
	console.log("Successfully connected");
  let codesegments = [];

  for (const category of snippetscode) {
    for (const codesegment of category.codesegments) {
      const tree = parser.parse(codesegment.content);
      const rootnode = tree.rootNode;
      codesegments.push({
        name: codesegment.name,
        content: codesegment.content,
        ast: rootnode.toString(),
      });
    }
  }

  const length = codesegments.length;

  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      const similarity = calculateJaccard(
        codesegments[i].content,
        codesegments[j].content,
      );

      if (similarity > 0.75) {
        console.log(
          `Similarity between ${codesegments[i].name} and ${codesegments[j].name}:`,
          similarity,
        );
      }
    }
  }
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
