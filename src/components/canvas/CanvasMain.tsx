// src/components/CanvasMain.tsx

import React from 'react';
import MovableTextBox from './Toolbar'; // Adjust import path as per your project structure
import Workspace from './WorkSpace'; // Adjust import path as per your project structure

const CanvasMain = () => {
  return (
    <div className="flex h-screen">
      <MovableTextBox/>
      
      <Workspace />
    </div>
  );
};

export default CanvasMain;
