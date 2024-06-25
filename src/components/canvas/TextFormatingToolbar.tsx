import React from "react";
import { fontList, sizeList } from "./Toolbar";

const TextFormattingToolbar = () => {
  return (
    <div id="toolbar" className="text-formatting-toolbar">
      <select className="ql-font">
        {fontList.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
      <select className="ql-size">
        {sizeList.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
    </div>
  );
};

export default TextFormattingToolbar;