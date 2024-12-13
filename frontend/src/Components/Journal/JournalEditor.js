import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import axios from "axios";

import "./Journal.css";

import Navigation from "../Navigation/Navigation";

const JournalEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [userID, setUserID] = useState("1");

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const saveJournalEntry = async () => {
    const contentState = editorState.getCurrentContent();
    const content = contentState.getPlainText(); 

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/journal/entries`, {
        userID,
        content,
      });
      console.log("Journal entry saved:", response.data);
      alert("Journal entry saved!");
    } catch (error) {
      console.error("Error saving journal entry:", error);
    }
  };

  return (
    <div className="flex flex-row">
      <Navigation />
      <div className="editorContainer">
        {/* Toolbar */}
        <div className="editorToolbar">
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              toggleInlineStyle("BOLD");
            }}
          >
            Bold
          </button>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              toggleInlineStyle("ITALIC");
            }}
          >
            Italic
          </button>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              toggleInlineStyle("UNDERLINE");
            }}
          >
            Underline
          </button>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              toggleBlockType("blockquote");
            }}
          >
            Blockquote
          </button>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              toggleBlockType("unordered-list-item");
            }}
          >
            Bullet List
          </button>
        </div>

        {/* Editor */}
        <div className="editorWrapper">
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            handleKeyCommand={handleKeyCommand}
            placeholder="Write your thoughts here..."
            spellCheck
          />
        </div>

        {/* Save Button */}
        <button onClick={saveJournalEntry}>Save Entry</button>
      </div>
    </div>
  );
};

export default JournalEditor;