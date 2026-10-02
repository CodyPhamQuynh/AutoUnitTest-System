import React from "react";
import EditorRaw from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-java";
import "prismjs/themes/prism.css";

const Editor = EditorRaw.default || EditorRaw;

const CodeEditor = ({ value, onChange, disabled }) => {
  const safeHighlight = (code) => {
    if (Prism.languages && Prism.languages.java) {
      return Prism.highlight(code, Prism.languages.java, "java");
    }
    return code;
  };

  return (
    <div className={`editor-wrapper ${disabled ? 'disabled-editor' : ''}`}>
      <Editor
        value={value}
        onValueChange={(code) => { if (!disabled) onChange(code) }}
        highlight={safeHighlight}
        padding={20}
        style={{
          fontFamily: '"Fira Code", monospace',
          fontSize: 14,
          minHeight: "450px",
          color: disabled ? "#94a3b8" : "#333",
          backgroundColor: disabled ? "#f1f5f9" : "transparent"
        }}
      />
    </div>
  );
};

export default CodeEditor;