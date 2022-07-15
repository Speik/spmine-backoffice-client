import React from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

type TerminalProps = {
  lines: string[];
};

const TerminalRow = (data: string) => {
  return <div>Row</div>;
};

const Terminal = ({ lines }: TerminalProps) => {
  return <div>Terminal</div>;
};

export { Terminal };
