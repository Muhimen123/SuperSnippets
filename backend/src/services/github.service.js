import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
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

export const generateRawFileLink = ({ owner_name, repository, file_name }) => {
  const safeFileName = encodeURIComponent(file_name);
  const rawFileLink = `https://raw.githubusercontent.com/${owner_name}/${repository}/refs/heads/main/${safeFileName}`;
  return rawFileLink;
};

export const getRawFileData = async ({ owner_name, repository, file_name }) => {
  const fileData = {
    owner_name: owner_name,
    repository: repository,
    file_name: file_name,
  };

  const link = generateRawFileLink(fileData);

  try {
    const response = await fetch(link);

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
    }

    const fileContent = await response.text();
    const linesArray = fileContent.split(/\r?\n/);
    
    return linesArray;
  } catch (error) {
    console.error("Error fetching raw file:", error);
    throw error;
  }
};

const isCodeFile = (path) => {
  const validExtensions = [
    ".cpp",
    ".c",
    ".cc",
    ".h",
    ".hpp",
    ".java",
    ".py",
  ];
  return validExtensions.some((ext) => path.toLowerCase().endsWith(ext));
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
    (item) => item.type === "blob" && isCodeFile(item.path),
  );

  return codeFiles.map((file) => ({
    owner_name: owner,
    repository: repo,
    file_name: file.path,
  }));
};

/**
 * Fetches all repository files and maps them to the CodeSegment schema.
 * @param {string} url - The GitHub repository URL.
 * @param {string} categoryId - The MongoDB ObjectId for the category.
 */
export const fetchAllRepoFiles = async (url) => {
  const filesList = await fetchRepoFiles(url);
  
  const CONCURRENCY_LIMIT = 800; 
  const processedSegments = [];

  for (let i = 0; i < filesList.length; i += CONCURRENCY_LIMIT) {
    const batch = filesList.slice(i, i + CONCURRENCY_LIMIT);
    
    const batchPromises = batch.map(async (file) => {
      try {
        const linesArray = await getRawFileData(file);

        return {
          title: file.file_name.split('/').pop(),
          code: linesArray,
          category_id: null,
          type: "github",
          file_url: url
        };
      } catch (error) {
        console.error(`Skipping ${file.file_name} due to error:`, error.message);
        return null; 
      }
    });

    const results = await Promise.all(batchPromises);
    processedSegments.push(...results.filter(s => s !== null));
  }

  return processedSegments;
};
