import { fabric } from 'fabric';
import { TextItem } from '../canvasSlice';
import { canvas } from './canvasFunctions';




export const addTextToCanvas = (text: TextItem) => {
  const fabricText = new fabric.Text(text.content, {
    left: 100,
    top: 100,
    fill: text.color,
    fontStyle: text.fontStyle,
    fontSize: text.size,
  });
  canvas.add(fabricText);
};
