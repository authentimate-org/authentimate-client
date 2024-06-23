import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TextItem {
  id: string;
  content: string;
  color: string;
  fontStyle: "normal" | "italic";
  fontWeight: "normal" | "bold";
  underline: boolean;
  size: number;
  left: number;
  top: number;
}

interface CanvasState {
  texts: TextItem[];
  selectedTextId: string | null;
}

const initialState: CanvasState = {
  texts: [],
  selectedTextId: null,
};

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    addText: (state, action: PayloadAction<Omit<TextItem, 'id'>>) => {
      state.texts.push({ ...action.payload, id: Date.now().toString() });
    },
    setSelectedText: (state, action: PayloadAction<string>) => {
      state.selectedTextId = action.payload;
    },
    updateText: (state, action: PayloadAction<{ id: string, updates: Partial<TextItem> }>) => {
      const text = state.texts.find(t => t.id === action.payload.id);
      if (text) {
        Object.assign(text, action.payload.updates);
      }
    },
    toggleBold: (state) => {
      const text = state.texts.find(t => t.id === state.selectedTextId);
      if (text) {
        text.fontWeight = text.fontWeight === 'bold' ? 'normal' : 'bold';
      }
    },
    toggleItalic: (state) => {
      const text = state.texts.find(t => t.id === state.selectedTextId);
      if (text) {
        text.fontStyle = text.fontStyle === 'italic' ? 'normal' : 'italic';
      }
    },
    toggleUnderline: (state) => {
      const text = state.texts.find(t => t.id === state.selectedTextId);
      if (text) {
        text.underline = !text.underline;
      }
    },
  },
});

export const { 
  addText, 
  setSelectedText, 
  updateText, 
  toggleBold, 
  toggleItalic, 
  toggleUnderline 
} = canvasSlice.actions;

export default canvasSlice.reducer;