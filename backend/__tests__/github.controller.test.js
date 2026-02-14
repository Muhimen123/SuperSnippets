/**
 * GitHub Controller Tests
 * 
 * Tests for request handling, validation, and response formatting
 */

// Mock the github service BEFORE importing controller
jest.mock('../../backend/src/services/github.service.js', () => ({
  fetchRepoFiles: jest.fn(),
  getRawFileData: jest.fn()
}));

import { getRepoFiles, getFileContent } from '../../backend/src/controllers/github.controller.js';
import * as githubService from '../../backend/src/services/github.service.js';

describe('GitHub Controller - getRepoFiles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch repo files with valid URL', async () => {
    // Arrange
    const mockFiles = ['file1.js', 'file2.js', 'README.md'];
    const req = {
      body: { url: 'https://github.com/user/repo' }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    githubService.fetchRepoFiles.mockResolvedValue(mockFiles);

    // Act
    await getRepoFiles(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockFiles);
    expect(githubService.fetchRepoFiles).toHaveBeenCalledWith('https://github.com/user/repo');
  });

  test('should return 400 if URL is missing', async () => {
    // Arrange
    const req = { body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Act
    await getRepoFiles(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'GitHub URL is required'
    });
    expect(githubService.fetchRepoFiles).not.toHaveBeenCalled();
  });

  test('should return 400 if URL is null', async () => {
    // Arrange
    const req = { body: { url: null } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Act
    await getRepoFiles(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'GitHub URL is required'
    });
  });

  test('should return 500 if service throws error', async () => {
    // Arrange
    const req = {
      body: { url: 'https://github.com/user/repo' }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const error = new Error('GitHub API Error');
    githubService.fetchRepoFiles.mockRejectedValue(error);

    // Act
    await getRepoFiles(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'Failed to fetch repository files',
        details: 'GitHub API Error'
      })
    );
  });

  test('should handle network timeout error', async () => {
    // Arrange
    const req = {
      body: { url: 'https://github.com/user/repo' }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const error = new Error('Network timeout');
    githubService.fetchRepoFiles.mockRejectedValue(error);

    // Act
    await getRepoFiles(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'Failed to fetch repository files'
      })
    );
  });

  test('should handle large file responses', async () => {
    // Arrange
    const largeFileList = Array.from({ length: 100 }, (_, i) => `file${i}.js`);
    const req = {
      body: { url: 'https://github.com/user/repo' }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    githubService.fetchRepoFiles.mockResolvedValue(largeFileList);

    // Act
    await getRepoFiles(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(largeFileList);
  });
});

describe('GitHub Controller - getFileContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch file content with valid parameters', async () => {
    // Arrange
    const mockFileContent = ['line 1', 'line 2', 'line 3'];
    const req = {
      body: {
        owner_name: 'user',
        repository: 'repo',
        file_name: 'file.js'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    githubService.getRawFileData.mockResolvedValue(mockFileContent);

    // Act
    await getFileContent(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: mockFileContent
    });
    expect(githubService.getRawFileData).toHaveBeenCalledWith({
      owner_name: 'user',
      repository: 'repo',
      file_name: 'file.js'
    });
  });

  test('should return 400 if owner_name is missing', async () => {
    // Arrange
    const req = {
      body: {
        repository: 'repo',
        file_name: 'file.js'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Act
    await getFileContent(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Not enough information to fetch file content'
    });
    expect(githubService.getRawFileData).not.toHaveBeenCalled();
  });

  test('should return 400 if repository is missing', async () => {
    // Arrange
    const req = {
      body: {
        owner_name: 'user',
        file_name: 'file.js'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Act
    await getFileContent(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Not enough information to fetch file content'
    });
  });

  test('should return 400 if file_name is missing', async () => {
    // Arrange
    const req = {
      body: {
        owner_name: 'user',
        repository: 'repo'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Act
    await getFileContent(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Not enough information to fetch file content'
    });
  });

  test('should return 400 if all parameters are missing', async () => {
    // Arrange
    const req = { body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Act
    await getFileContent(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Not enough information to fetch file content'
    });
  });

  test('should return 400 if parameters are null', async () => {
    // Arrange
    const req = {
      body: {
        owner_name: null,
        repository: null,
        file_name: null
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Act
    await getFileContent(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Not enough information to fetch file content'
    });
  });

  test('should return 500 if service throws error', async () => {
    // Arrange
    const req = {
      body: {
        owner_name: 'user',
        repository: 'repo',
        file_name: 'file.js'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const error = new Error('File not found');
    githubService.getRawFileData.mockRejectedValue(error);

    // Act
    await getFileContent(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'Failed to fetch file content',
        details: 'File not found'
      })
    );
  });

  test('should handle empty file content', async () => {
    // Arrange
    const req = {
      body: {
        owner_name: 'user',
        repository: 'repo',
        file_name: 'empty.js'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    githubService.getRawFileData.mockResolvedValue(['']);

    // Act
    await getFileContent(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: ['']
    });
  });

  test('should handle large file content', async () => {
    // Arrange
    const largeContent = Array.from({ length: 1000 }, (_, i) => `line ${i + 1}`);
    const req = {
      body: {
        owner_name: 'user',
        repository: 'repo',
        file_name: 'large.js'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    githubService.getRawFileData.mockResolvedValue(largeContent);

    // Act
    await getFileContent(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: largeContent
    });
  });

  test('should handle file with special characters in name', async () => {
    // Arrange
    const req = {
      body: {
        owner_name: 'user',
        repository: 'repo',
        file_name: 'my-file[1].js'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockContent = ['code line'];
    githubService.getRawFileData.mockResolvedValue(mockContent);

    // Act
    await getFileContent(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(githubService.getRawFileData).toHaveBeenCalledWith({
      owner_name: 'user',
      repository: 'repo',
      file_name: 'my-file[1].js'
    });
  });
});
