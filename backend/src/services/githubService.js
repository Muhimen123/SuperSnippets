import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const extractOwnerAndRepo = (url) => {
  try {
    const cleanUrl = url.replace(/\/$/, "");
    const parts = cleanUrl.split("/");
    const repo = parts.pop();
    const owner = parts.pop();
    return { owner, repo };
  } catch (error) {
    throw new Error("Invalid GitHub URL format");
  }
};

const isCodeFile = (path) => {
  const validExtensions = [
    '.cpp', '.c', '.cc', '.h', '.hpp',
    '.java', '.py',
    '.js', '.jsx', '.ts', '.tsx',
    '.go', '.rs', '.kt', '.cs',
    '.sh', '.md', '.txt'
  ];
  return validExtensions.some(ext => path.toLowerCase().endsWith(ext));
};

export const fetchRepoFiles = async (url) => {
  const { owner, repo } = extractOwnerAndRepo(url);

  const { data: repoData } = await octokit.rest.repos.get({ owner, repo });
  const defaultBranch = repoData.default_branch;

  const { data: treeData } = await octokit.rest.git.getTree({
    owner,
    repo,
    tree_sha: defaultBranch,
    recursive: "1",
  });

  const codeFiles = treeData.tree.filter(
    (item) => item.type === "blob" && isCodeFile(item.path)
  );

  // Return only file metadata (name) to avoid rate limits
  return codeFiles.map((file) => ({
    name: file.path,
  }));
};
