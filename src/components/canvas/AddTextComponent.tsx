// AddTextComponent.tsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';
import { addText, updateText } from '../redux/canvasSlice';
import { TextItem } from '../types';

// Ensure that the 'fabric.d.ts' file is imported or referenced somewhere in your project

interface AddTextComponentProps {
  fabricCanvas: fabric.Canvas | null;
}

const AddTextComponent: React.FC<AddTextComponentProps> = ({ fabricCanvas }) => {
  const [content, setContent] = useState<string>('');
  const [fill, setFill] = useState<string>('#000000');
  const [fontStyle, setFontStyle] = useState<'normal' | 'italic' | 'oblique'>('normal');
  const [fontSize, setFontSize] = useState<number>(16);
  const [selectedText, setSelectedText] = useState<fabric.Textbox | null>(null);
  const dispatch = useDispatch();

  const handleAddText = () => {
    if (fabricCanvas) {
      let textObject: fabric.Textbox;

      if (selectedText) {
        // Update existing text
        selectedText.set({
          text: content,
          fill: fill,
          fontStyle: fontStyle,
          fontSize: fontSize,
        });
        fabricCanvas.renderAll();
        textObject = selectedText;
      } else {
        // Add new text
        textObject = new fabric.Textbox(content, {
          left: 100,
          top: 100,
          fill: fill,
          fontStyle: fontStyle,
          fontSize: fontSize,
          textAlign: 'left',
          editable: true,
          id: uuidv4(), // Now 'id' is recognized due to module augmentation
        });
        fabricCanvas.add(textObject);
        fabricCanvas.setActiveObject(textObject);
      }

      const newTextItem: TextItem = {
        id: textObject.id, // TypeScript now recognizes 'id' on fabric.Textbox
        content: content,
        left: textObject.left!,
        top: textObject.top!,
        color: fill,
        fontStyle: fontStyle,
        size: fontSize,
      };

      if (selectedText) {
        dispatch(updateText(newTextItem));
      } else {
        dispatch(addText(newTextItem));
      }

      setContent('');
      setFill('#000000');
      setFontStyle('normal');
      setFontSize(16);
      setSelectedText(null);
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg mb-4">
      <h2 className="text-lg font-semibold mb-2">{selectedText ? 'Edit Text' : 'Add Text'}</h2>
      <label className="block mb-2">
        Content:
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-input mt-1 block w-full"
        />
      </label>
      <label className="block mb-2">
        Fill Color:
        <input
          type="color"
          value={fill}
          onChange={(e) => setFill(e.target.value)}
          className="form-input mt-1 block"
        />
      </label>
      <label className="block mb-2">
        Font Style:
        <select
          value={fontStyle}
          onChange={(e) => setFontStyle(e.target.value as 'normal' | 'italic' | 'oblique')}
          className="form-select mt-1 block w-full"
        >
          <option value="normal">Normal</option>
          <option value="italic">Italic</option>
          <option value="oblique">Oblique</option>
        </select>
      </label>
      <label className="block mb-2">
        Font Size:
        <input
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
          className="form-input mt-1 block"
        />
      </label>
      <button
        onClick={handleAddText}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
      >
        {selectedText ? 'Update Text' : 'Add Text'}
      </button>
    </div>
  );
};

export default AddTextComponent;
