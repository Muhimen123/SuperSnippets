import Parser from 'tree-sitter';
import CPP from 'tree-sitter-cpp';

const parser = new Parser();
parser.setLanguage(CPP);

const sourceCode = `
int main() {
    int x = 10;
    return x;
}
`;

const tree = parser.parse(sourceCode);
const rootnode = tree.rootNode.child(0);
console.log(rootnode);


/*

import Parser from 'tree-sitter';
import CPP from 'tree-sitter-cpp';

const parser = new Parser();
parser.setLanguage(CPP);

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

    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);

    const similarity = intersection.size / union.size;
    const distance = 1 - similarity;

    return { similarity, distance };
}

const codeA = `
int main() {
    int x = 10;
    return x;
}
`;

const codeB = `
int main() {
    int y = 20;
    if (y > 10) {
        return y;
    }
    return 0;
}
`;

const result = calculateJaccard(codeA, codeB);

console.log(`Structural Similarity: ${(result.similarity * 100).toFixed(2)}%`);
console.log(`Jaccard Distance: ${result.distance.toFixed(4)}`);

*/