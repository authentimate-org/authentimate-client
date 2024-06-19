import { fabric } from 'fabric';

export let canvas: fabric.Canvas;

export const setupCanvas = (canvasElement: HTMLCanvasElement) => {
    canvas = new fabric.Canvas(canvasElement);
    canvas.setBackgroundColor('white', canvas.renderAll.bind(canvas));
};