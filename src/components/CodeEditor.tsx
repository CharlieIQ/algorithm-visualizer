import React, { useState } from 'react';
import { createInstrumentedTemplate, createSimpleTemplate } from '../utils/codeInstrumentation';

// Props for the CodeEditor component
interface CodeEditorProps {
  initialCode?: string;
  onRunCode?: (code: string, useVisualization?: boolean) => void;
  language?: string;
}

/**
 * The CodeEditor component provides a text area for users to write and edit code.
 * It includes buttons to insert code templates (with or without visualization support),
 * a dropdown to adjust the editor height, and a checkbox to toggle visualization mode.
 * 
 * Users can run their code, which triggers the onRunCode callback with the current code
 * and whether visualization is enabled.
 * @param param0 - CodeEditorProps
 * @returns The CodeEditor component
 */
const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = '',
  onRunCode,
  language = 'javascript'
}) => {
  // State variables for code, running status, editor height, and visualization mode
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [height, setHeight] = useState(256); // Default height in pixels
  const [useVisualization, setUseVisualization] = useState(true);

  /**
   * The function to handle running the code.
   * @param withVisualization - optional boolean to override current visualization setting
   */
  const handleRunCode = async (withVisualization?: boolean) => {
    if (!onRunCode) return;

    setIsRunning(true);
    try {
      await onRunCode(code, withVisualization ?? useVisualization);
    } catch (error) {
      console.error('Error running code:', error);
    } finally {
      setIsRunning(false);
    }
  };

  // Functions to insert code templates
  const insertVisualTemplate = () => {
    setCode(createInstrumentedTemplate());
    setUseVisualization(true);
  };

  const insertSimpleTemplate = () => {
    setCode(createSimpleTemplate());
    setUseVisualization(false);
  };

  return (
    <div className="border border-dark-600 rounded-lg overflow-hidden bg-dark-900">
      <div className="bg-dark-700 px-4 py-2 border-b border-dark-600 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-white">Code Editor</span>
          <span className="text-xs text-dark-300 uppercase">{language}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <button
              onClick={insertVisualTemplate}
              className="px-2 py-1 text-xs bg-primary-600 hover:bg-primary-700 text-white rounded transition-colors"
              title="Insert template with step-by-step visualization"
            >
              Visual Template
            </button>
            <button
              onClick={insertSimpleTemplate}
              className="px-2 py-1 text-xs bg-dark-600 hover:bg-dark-500 text-dark-200 rounded transition-colors"
              title="Insert simple template (no visualization)"
            >
              Simple Template
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-xs text-dark-300">Height:</label>
            <select
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="text-xs bg-dark-600 text-white border border-dark-500 rounded px-1 py-0.5"
            >
              <option value={200}>Small</option>
              <option value={256}>Medium</option>
              <option value={350}>Large</option>
              <option value={500}>Extra Large</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-xs text-dark-300 flex items-center space-x-1">
              <input
                type="checkbox"
                checked={useVisualization}
                onChange={(e) => setUseVisualization(e.target.checked)}
                className="rounded"
              />
              <span>Visualize</span>
            </label>
          </div>
          <button
            onClick={() => handleRunCode()}
            disabled={isRunning || !code.trim()}
            className={`px-4 py-1 text-xs font-medium rounded transition-colors ${isRunning || !code.trim()
                ? 'bg-dark-600 text-dark-400 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700 text-white'
              }`}
          >
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
        </div>
      </div>

      <div className="p-2 bg-dark-800 text-xs text-dark-300 border-b border-dark-600">
        <strong>Tips:</strong> Use <code>Visual Template</code> for step-by-step animation, or <code>Simple Template</code> for instant results.
        Check <code>Visualize</code> to enable step-by-step mode for any code.
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={useVisualization ?
          "Write your algorithm using the instrumented array methods for visualization..." :
          "Write your sorting algorithm here..."
        }
        className="w-full p-4 font-mono text-sm border-none outline-none resize-none bg-dark-900 text-dark-100 placeholder-dark-400"
        style={{ height: `${height}px` }}
        spellCheck={false}
      />
    </div>
  );
};

export default CodeEditor;
