import React, { useEffect, useRef } from "react";
import { RootState } from "@/app/store";
import { setupCanvas } from "@/services/canvas/functions/canvasFunctions";
import { addTextToCanvas } from "@/services/canvas/functions/textFunctions";
import { useSelector } from "react-redux";

interface WorkSpaceProps {
  children: React.ReactNode;
}

const WorkSpace: React.FC<WorkSpaceProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const texts = useSelector((state: RootState) => state.canvas.texts);

  useEffect(() => {
    if (canvasRef.current) {
      setupCanvas(canvasRef.current); 
    }
  }, []);

  useEffect(() => {
    texts.forEach((text) => {
      addTextToCanvas(text); 
    });
  }, [texts]);

  return (
    <div className="p-6 bg-secondary">
      <canvas
      className="canvas-container"
        ref={canvasRef}
        id="canvas"
        width={800} 
        height={500}
      ></canvas>
      {children} 
    </div>
  );
};

export default WorkSpace;
