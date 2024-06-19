import { RootState } from "@/app/store";
import { setupCanvas } from "@/services/canvas/functions/canvasFunctions";
import { addTextToCanvas } from "@/services/canvas/functions/textFunctions";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const WorkSpace: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const texts = useSelector((state: RootState) => state.canvas.texts);

  useEffect(() => {
    if (canvasRef.current) {
      setupCanvas(canvasRef.current);
    }
    
  }, []);

  useEffect(() => {
    texts.forEach(text => {
      addTextToCanvas(text);
    });
  }, [texts]);

  return (
    <div className="p-12 bg-secondary">
      <canvas ref={canvasRef} id="canvas" width={800} height={500}></canvas>
    </div>
  );
};

export default WorkSpace;
