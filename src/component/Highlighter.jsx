import React, { useState } from 'react';

function Highlighter() {
  const [htmlContent, setHtmlContent] = useState('');
  const [highlightText, setHighlightText] = useState('');
  const [highlightedContent, setHighlightedContent] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [showAlert, setShowAlert] = useState(false); // New state for displaying alert
  const handleHtmlChange = (event) => {
    setHtmlContent(event.target.value);
  };

  const handleHighlightChange = (event) => {
    setHighlightText(event.target.value);
  };

  const handleHighlightSubmit = (event) => {
    event.preventDefault();

    if (!highlightText) {
      setHighlightedContent(htmlContent);
      return;
    }

    const highlighted = htmlContent.replace(
      new RegExp(highlightText, 'gi'),
      (match) => `<mark style="background-color: yellow">${match}</mark>`
    );

    if (highlighted === htmlContent) {
      // No word found, show alert
      setShowAlert(true);
      setHighlightedContent(htmlContent); // Reset highlighted content
    } else {
      setShowAlert(false);
      setHighlightedContent(highlighted);
    }
  };

  const handleToggleMode = () => {
    setDarkMode(!darkMode);
  };

  const appStyle = {
    backgroundColor: darkMode ? '#333' : '#fff',
    color: darkMode ? '#fff' : '#333',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const flexRowStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  };

  const boxStyle = {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: darkMode ? '2px solid #fff' : '2px solid #333',
    borderRadius: '5px',
    backgroundColor: darkMode ? '#222' : '#f8f9fa',
    transition: 'background-color 0.3s, border 0.3s',
  };

  return (
    <div className="container" style={appStyle}>
      <h2 className="my-4">HTML Highlighter</h2>
      <button
      style={{border:darkMode?null:"2px solid black"}}
        className={`btn btn-${darkMode ? 'dark' : 'light'}`}
        onClick={handleToggleMode}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div className="d-flex justify-content-center" style={flexRowStyle}>
        <div style={boxStyle}>
          <label htmlFor="htmlContent">HTML Content:</label>
          <textarea
            id="htmlContent"
            className="form-control"
            value={htmlContent}
            placeholder='please enter the text '
            onChange={handleHtmlChange}
            style={{ width: '100%',  height: "259px" }}
          />
        </div>
        <div style={boxStyle}>
          <label htmlFor="highlightText">Text to Highlight:</label>
          <textarea
            id="highlightText"
            placeholder='please enter which text to Highlight'
            className="form-control"
            value={highlightText}
            onChange={handleHighlightChange}
            style={{ width: '100%', height: '50%' }}
          />
          <button
            type="submit"
            className="btn btn-warning mt-2"
            onClick={handleHighlightSubmit}
            style={{ backgroundColor: 'yellow' }}
          >
            Highlight
          </button>
          {showAlert && ( // Conditionally render alert
          <div className="alert alert-warning mt-2 text-center" style={{ fontSize: '18px' }}>
              No word found in the HTML content.
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 text-center">
        <h3>Highlighted Content:</h3>
        <div
          dangerouslySetInnerHTML={{ __html: highlightedContent }}
          style={{ textAlign: 'center' }}
          data-testid="highlighted-content"
        />
      </div>
    </div>
  );
}

export default Highlighter;