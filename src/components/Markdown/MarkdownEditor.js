import React from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/markdown/markdown';

const MarkdownEditor = ({ markdown, onChange }) => (
  <CodeMirror
    value={markdown}
    onChange={onChange}
    options={{ mode: 'markdown', lineNumbers: true }}
  />
);

export default MarkdownEditor;