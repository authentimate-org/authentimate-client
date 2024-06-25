import React, { useContext } from "react";
import { CanvasContext } from "./CanvasContainer";

export const sizeList = [
  "8px",
  "9px",
  "10px",
  "11px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "72px"
];

export const fontList = [
  "Arial",
  "Arial Black",
  "Arial Unicode MS",
  "Calibri",
  "Cambria",
  "Cambria Math",
  "Candara",
  `Segoe UI, wf_segoe-ui_normal, helvetica, arial, sans-serif`,
  "Comic Sans MS",
  "Consolas",
  "Constantia",
  "Corbel",
  "Courier New",
  "Georgia",
  "Lucida Sans Unicode",
  "Tahoma",
  "Times New Roman",
  "Trebuchet MS",
  "Verdana"
];

interface IToolbarProps {
  isEditEnable: boolean;
}

export default function Toolbar({ isEditEnable }: IToolbarProps) {
  const { actions } = useContext(CanvasContext);
  
  const addElement = (type: string) => {
    actions?.addElement(type);
  };

  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    actions?.setBackgroundColor(e.target.value);
  
}
  return (
    <div className="vertical-toolbar">
      <div className="toolbar-item" onClick={() => addElement("TEXT")}>
        T
      </div>
      <div className="toolbar-item" onClick={() => addElement("IMAGE")}>
        I
      </div>
      <div className="toolbar-item">
        <input
          type="color"
        //   value={state?.backgroundColor}
          onChange={handleBackgroundColorChange}
          title="Change background color"
        />
      </div>
    </div>
  );

}