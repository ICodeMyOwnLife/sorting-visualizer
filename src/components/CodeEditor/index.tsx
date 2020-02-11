import React, { FC, memo } from "react";
import Ace, { IAceEditorProps } from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

export const CodeEditorComponent: FC<CodeEditorProps> = props => (
  <Ace {...props} mode="javascript" theme="monokai" />
);

const CodeEditor = memo(CodeEditorComponent);
CodeEditor.displayName = "CodeEditor";
export default CodeEditor;

export interface CodeEditorProps
  extends Omit<IAceEditorProps, "mode" | "theme"> {}
