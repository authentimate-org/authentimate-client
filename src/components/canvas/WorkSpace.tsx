import { RootState } from "@/app/store";
import { setupCanvas } from "@/services/canvas/functions/canvasFunctions";
import { addTextToCanvas, setCanvasInstance } from "@/services/canvas/functions/textFunctions";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fabric } from 'fabric';
import { setSelectedText, updateText } from "@/services/canvas/canvasSlice";

const WorkSpace: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const texts = useSelector((state: RootState) => state.canvas.texts);
  const dispatch = useDispatch();
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current && !fabricCanvas) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 500,
      });
      setFabricCanvas(canvas);
      setCanvasInstance(canvas);
      setupCanvas(canvas);

      canvas.on('selection:created', handleTextSelection);
      canvas.on('selection:updated', handleTextSelection);
      canvas.on('object:modified', handleObjectModified);
      canvas.on('text:changed', handleTextChange);

      return () => {
        canvas.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (fabricCanvas) {
      texts.forEach(text => {
        const existingText = fabricCanvas.getObjects().find(
          obj => obj.type === 'i-text' && (obj as fabric.IText).data?.id === text.id
        ) as fabric.IText | undefined;

        if (existingText) {
          // Update only the properties that should be controlled by the state
          existingText.set({
            text: text.content,
            fill: text.color,
            fontStyle: text.fontStyle,
            fontWeight: text.fontWeight,
            underline: text.underline,
            fontSize: text.size,
          });
          existingText.setCoords();
        } else {
          addTextToCanvas(text);
        }
      });

      fabricCanvas.renderAll();
    }
  }, [texts, fabricCanvas]);

  const handleTextSelection = (e: fabric.IEvent) => {
    const selectedObject = e.selected?.[0];
    if (selectedObject && selectedObject.type === 'i-text') {
      const textObject = selectedObject as fabric.IText;
      const id = textObject.data?.id;
      if (id) {
        dispatch(setSelectedText(id));
      }
    }
  };

  const handleObjectModified = (e: fabric.IEvent) => {
    const modifiedObject = e.target;
    if (modifiedObject && modifiedObject.type === 'i-text') {
      const textObject = modifiedObject as fabric.IText;
      const id = textObject.data?.id;
      if (id) {
        dispatch(updateText({
          id,
          updates: {
            left: textObject.left,
            top: textObject.top,
          },
        }));
      }
    }
  };

  const handleTextChange = (e: fabric.IEvent) => {
    const textObject = e.target as fabric.IText;
    const id = textObject.data?.id;
    if (id) {
      dispatch(updateText({
        id,
        updates: {
          content: textObject.text,
          underline: textObject.underline,
          size: textObject.fontSize,
          color: textObject.fill as string,
        },
      }));
    }
  };

  return (
    <div className="p-12 bg-secondary">
      <canvas ref={canvasRef} id="canvas"></canvas>
    </div>
  );
};

export default WorkSpace;