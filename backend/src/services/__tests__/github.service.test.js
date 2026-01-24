/**
 * GitHub Service Tests
 * 
 * Test basic utility functions
 */

// Simple test without dependencies
describe('String utilities', () => {
  
  const extractOwnerAndRepo = (url) => {
    try {
      const cleanUrl = url.replace(/\/$/, '');
      const parts = cleanUrl.split('/');
      const repo = parts.pop();
      const owner = parts.pop();
      return { owner, repo };
    } catch (error) {
      throw new Error('Invalid GitHub URL format');
    }
  };

  test('should extract owner and repo from URL', () => {
    const result = extractOwnerAndRepo('https://github.com/ShahjalalShohag/code-library');
    
    expect(result.owner).toBe('ShahjalalShohag');
    expect(result.repo).toBe('code-library');
  });

  test('should handle trailing slash', () => {
    const result = extractOwnerAndRepo('https://github.com/user/repo/');
    
    expect(result.owner).toBe('user');
    expect(result.repo).toBe('repo');
  });

});

describe('File link generation', () => {
  
  const generateRawFileLink = ({ owner_name, repository, file_name }) => {
    const safeFileName = encodeURIComponent(file_name);
    const rawFileLink = `https://raw.githubusercontent.com/${owner_name}/${repository}/refs/heads/main/${safeFileName}`;
    return rawFileLink;
  };

  test('should generate correct raw file link', () => {
    const result = generateRawFileLink({
      owner_name: 'ShahjalalShohag',
      repository: 'code-library',
      file_name: 'example.js'
    });

    expect(result).toBe(
      'https://raw.githubusercontent.com/ShahjalalShohag/code-library/refs/heads/main/example.js'
    );
  });

  test('should encode special characters in file name', () => {
    const result = generateRawFileLink({
      owner_name: 'user',
      repository: 'repo',
      file_name: 'my file.js'
    });

    expect(result).toContain('my%20file.js');
  });

});
