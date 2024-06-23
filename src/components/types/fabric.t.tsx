// fabric.d.ts

import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';

declare module 'fabric' {
  interface Textbox {
    id: string;
  }
}

// Initialize the custom ID property
fabric.Textbox.prototype.id = uuidv4();
