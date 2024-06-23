// In canvasFunctions.ts
import { fabric } from 'fabric';

export const setupCanvas = (canvas: fabric.Canvas) => {
  // Any initial setup for your canvas
  canvas.setBackgroundColor('#f0f0f0', canvas.renderAll.bind(canvas));
};