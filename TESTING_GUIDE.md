# 🧪 Testing Setup Guide

Your project is now fully configured for testing! Here's everything you need to know.

## ✅ What's Installed

### Backend
- **Jest** - Testing framework for Node.js
- **Supertest** - HTTP assertion library for testing Express APIs

### Frontend
- **Jest** - Testing framework for React
- **React Testing Library** - Testing utilities for React components
- **Jest DOM** - Custom Jest matchers for DOM assertions

---

## 🚀 Running Tests

### Backend Tests
```bash
cd backend
npm test           # Run tests in watch mode (re-runs on file changes)
npm run test:ci    # Run tests once (for CI/CD pipelines)
```

### Frontend Tests
```bash
cd frontend
npm test           # Run tests in watch mode
npm run test:ci    # Run tests once
```

---

## 📁 Test Directory Structure

Tests are organized in `__tests__` folders next to the code they test:

```
backend/src/
├── routes/
│   └── __tests__/
│       └── health.test.js         ← Test your routes here
├── services/
│   └── __tests__/
│       └── github.service.test.js ← Test your services here
├── controllers/
│   └── __tests__/
│       └── *.test.js              ← Test your controllers here

frontend/src/
├── app/
│   ├── components/
│   │   └── __tests__/
│   │       ├── NavBar.test.js
│   │       └── TESTING_TEMPLATE.test.js
│   └── dashboard/
│       └── __tests__/
│           └── *.test.js
```

---

## 📝 Sample Test Files Included

### 1. **Backend: Health Check Test**
   - Location: [backend/src/routes/__tests__/health.test.js](../../backend/src/routes/__tests__/health.test.js)
   - Tests the root `/` endpoint
   - Shows how to test API responses

### 2. **Backend: Service Test**
   - Location: [backend/src/services/__tests__/github.service.test.js](../../backend/src/services/__tests__/github.service.test.js)
   - Tests the `generateRawFileLink` function
   - Shows how to test utility functions

### 3. **Frontend: Component Test**
   - Location: [frontend/src/app/components/__tests__/NavBar.test.js](../../frontend/src/app/components/__tests__/NavBar.test.js)
   - Tests the NavBar component renders
   - Shows basic component testing

### 4. **Frontend: Testing Template**
   - Location: [frontend/src/app/components/__tests__/TESTING_TEMPLATE.test.js](../../frontend/src/app/components/__tests__/TESTING_TEMPLATE.test.js)
   - Copy this and modify for your components
   - Shows different testing patterns

---

## 📚 Testing Patterns

### Backend - Testing an API Endpoint
```javascript
import request from 'supertest';
import app from '../../app.js';

describe('GitHub API', () => {
  test('POST /api/github/fetch should work', async () => {
    const response = await request(app)
      .post('/api/github/fetch')
      .send({ url: 'https://github.com/user/repo' });
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
```

### Backend - Testing a Service Function
```javascript
import { someFunction } from '../../services/service.js';

describe('Service Function', () => {
  test('should return expected result', () => {
    const result = someFunction('input');
    
    expect(result).toBe('expected output');
  });
});
```

### Frontend - Testing a Component
```javascript
import { render, screen } from '@testing-library/react';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  test('should render text', () => {
    render(<MyComponent />);
    
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Frontend - Testing User Interactions
```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe('Button', () => {
  test('should handle clicks', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalled();
  });
});
```

---

## 🎯 Common Assertions

### Backend (using Jest)
```javascript
expect(value).toBe(5);                    // Exact match
expect(value).toEqual({ name: 'John' }); // Deep equality
expect(value).toContain('text');          // Includes
expect(array).toHaveLength(3);            // Array length
expect(fn).toThrow();                     // Function throws
expect(promise).resolves.toBe(5);         // Promise resolves
```

### Frontend (using React Testing Library)
```javascript
expect(element).toBeInTheDocument();
expect(element).toBeVisible();
expect(element).toHaveTextContent('text');
expect(element).toHaveClass('active');
expect(element).toHaveAttribute('href', '/path');
expect(screen.getByText('text')).toBeInTheDocument();
```

---

## 🔍 Using Debug Tools

### Print rendered HTML (Frontend)
```javascript
import { render, screen } from '@testing-library/react';

test('debug example', () => {
  const { debug } = render(<Component />);
  debug(); // Prints the HTML to console
});
```

### Check test coverage
```bash
npm test -- --coverage
```

---

## ✨ Next Steps

1. **Run the sample tests:**
   ```bash
   cd backend && npm test
   ```

2. **Review the test files** to understand patterns

3. **Start writing tests for your features:**
   - List of features to test:
     - ✅ GitHub API integration
     - ✅ PDF generation
     - ✅ User authentication
     - ✅ Dashboard components
     - ✅ Code editor functionality

4. **Use the template** for new component tests

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Tests not found | Make sure files end with `.test.js` or `.spec.js` |
| Module not found | Check import paths match your project structure |
| Async test timeout | Increase timeout: `jest.setTimeout(10000)` |
| React component errors | Make sure you're using `render()` from `@testing-library/react` |

---

## 📖 Useful Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Supertest Guide](https://github.com/visionmedia/supertest)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

Happy Testing! 🎉
