// import React, { useState } from 'react';

import React from 'react';
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { addText } from "@/services/canvas/canvasSlice";

const Toolbar = () => {
  const dispatch = useDispatch();
  // const [showTextOptions, setShowTextOptions] = useState(false);
  let textCount = 0;

  const handleAddText = () => {
    textCount++;
    const newText = {
      id: Date.now().toString(), // Add this line to generate a unique id
      content: `Text ${textCount}`,
      color: "#000000",
      fontStyle: "normal" as "normal" | "italic",
      fontWeight: "normal" as "normal" | "bold",
      underline: false,
      size: 20,
      left: 50 + (textCount * 10),
      top: 50 + (textCount * 10),
    };
    dispatch(addText(newText));
    // setShowTextOptions(true);
  };

  return (
    <div className="h-auto bg-slate-200 w-64">
      <Button onClick={handleAddText}>Add Text</Button>
      {/* {showTextOptions && (
        <div>
          <Button onClick={() => dispatch({ type: 'TOGGLE_BOLD' })}>B</Button>
          <Button onClick={() => dispatch({ type: 'TOGGLE_ITALIC' })}>I</Button>
          <Button onClick={() => dispatch({ type: 'TOGGLE_UNDERLINE' })}>U</Button>
        </div>
      )} */}
    </div>
  );
};

export default Toolbar;