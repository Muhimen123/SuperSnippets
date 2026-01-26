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
