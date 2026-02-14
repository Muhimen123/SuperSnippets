/**
 * Frontend Component Tests
 * 
 * Test the NavBar component renders correctly
 */

import { render, screen } from '@testing-library/react';
import NavBar from '../../frontend/src/app/components/NavBar';

describe('NavBar Component', () => {
  
  test('renders without crashing', () => {
    render(<NavBar />);
    const navElements = screen.getAllByRole('navigation');
    expect(navElements.length).toBeGreaterThan(0);
  });

  test('navigation elements are present', () => {
    const { container } = render(<NavBar />);
    const navs = container.querySelectorAll('nav');
    expect(navs.length).toBeGreaterThan(0);
  });

  test('contains at least one logo', () => {
    render(<NavBar />);
    const logos = screen.getAllByAltText('Clipboard Logo');
    expect(logos.length).toBeGreaterThan(0);
  });

  test('contains at least one SuperSnippets title', () => {
    render(<NavBar />);
    const titles = screen.getAllByText('SuperSnippets');
    expect(titles.length).toBeGreaterThan(0);
  });

});
