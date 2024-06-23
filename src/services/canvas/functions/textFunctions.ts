import { fabric } from 'fabric';

let canvasInstance: fabric.Canvas | null = null;

export const setCanvasInstance = (canvas: fabric.Canvas) => {
  canvasInstance = canvas;
};

export const addTextToCanvas = (text: {
  id: string;
  content: string;
  color: string;
  fontStyle: "normal" | "italic";
  fontWeight: "normal" | "bold";
  underline: boolean;
  size: number;
  left: number;
  top: number;
}) => {
  if (canvasInstance) {
    const fabricText = new fabric.IText(text.content, {
      left: text.left,
      top: text.top,
      fill: text.color,
      fontSize: text.size,
      fontStyle: text.fontStyle,
      fontWeight: text.fontWeight,
      underline: text.underline,
      data: { id: text.id },
      editable: true
    });
    canvasInstance.add(fabricText);
    canvasInstance.renderAll();
  } else {
    console.error('Canvas instance not set');
  }
};

export const updateTextInCanvas = (id: string, updates: Partial<fabric.ITextOptions>) => {
  if (canvasInstance) {
    const textObject = canvasInstance.getObjects().find(
      obj => obj.type === 'i-text' && (obj as fabric.IText).data?.id === id
    ) as fabric.IText | undefined;

    if (textObject) {
      textObject.set(updates);
      canvasInstance.renderAll();
    }
  }
};