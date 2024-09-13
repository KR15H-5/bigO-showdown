import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

function CodeSnippet({ code }) {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <pre>
      <code className="language-javascript">{code}</code>
    </pre>
  );
}

export default CodeSnippet;