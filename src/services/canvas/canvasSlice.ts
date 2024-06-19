import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface TextItem {
  id: string|null;
  content: string;
  color: string;
  fontStyle: '' | 'normal' | 'italic' | 'oblique';
  size: number;
}

interface CanvasState {
  texts: TextItem[];
}

const initialState: CanvasState = {
  texts: [],
};

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    addText: (state, action: PayloadAction<Omit<TextItem, 'id'>>) => {
      state.texts.push({ id: uuidv4(), ...action.payload });
    },
    updateText: (state, action: PayloadAction<TextItem>) => {
      const index = state.texts.findIndex(text => text.id === action.payload.id);
      if (index !== -1) {
        state.texts[index] = action.payload;
      }
    },
  },
});

export const { addText, updateText } = canvasSlice.actions;
export default canvasSlice.reducer;
