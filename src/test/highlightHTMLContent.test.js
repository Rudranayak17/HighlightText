/* eslint-disable no-unused-vars */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For better assertions

import Highlighter from '../component/Highlighter';

describe('Highlighter', () => {
  test('should highlight the content in htmlContent', () => {
    const { getByLabelText, getByText, getByTestId } = render(<Highlighter />);
    
    const htmlTextarea = getByLabelText('HTML Content:');
    const highlightTextarea = getByLabelText('Text to Highlight:');
    const highlightButton = getByText('Highlight');
  
    fireEvent.change(htmlTextarea, { target: { value: 'Your HTML content here' } });
    fireEvent.change(highlightTextarea, { target: { value: 'Text to highlight' } });
    fireEvent.click(highlightButton);
    
    const markedContent = getByTestId('highlighted-content'); // Use the correct data-testid
    expect(markedContent).toBeInTheDocument('<mark>Text to highlight</mark>');
  });
  
  test('should handle empty plainText', () => {
    const { getByLabelText, getByText } = render(<Highlighter />);
    
    const highlightButton = getByText('Highlight');

    fireEvent.click(highlightButton);
    
    const highlightedContent = getByText('Highlighted Content:');
    expect(highlightedContent).toBeInTheDocument();
  });

  test('should handle empty plainTextPositions array', () => {
    const { getByLabelText, getByText } = render(<Highlighter />);
    
    const htmlTextarea = getByLabelText('HTML Content:');
    const highlightTextarea = getByLabelText('Text to Highlight:');
    const highlightButton = getByText('Highlight');

    fireEvent.change(htmlTextarea, { target: { value: 'Your HTML content here' } });
    fireEvent.click(highlightButton);
    
    const highlightedContent = getByText('Highlighted Content:');
    expect(highlightedContent).toBeInTheDocument();
  });

  test('should handle plainTextPositions exceeding plainText length', () => {
    const { getByLabelText, getByText } = render(<Highlighter />);
    
    const htmlTextarea = getByLabelText('HTML Content:');
    const highlightTextarea = getByLabelText('Text to Highlight:');
    const highlightButton = getByText('Highlight');

    fireEvent.change(htmlTextarea, { target: { value: 'Your HTML content here' } });
    fireEvent.change(highlightTextarea, { target: { value: 'Text to highlight' } });
    
    // Make sure plainTextPositions exceed the length of the provided text
    fireEvent.click(highlightButton);
    
    const highlightedContent = getByText('Highlighted Content:');
    expect(highlightedContent).toBeInTheDocument();
  });
});
