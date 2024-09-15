import React from 'react';
import { TbRefresh } from 'react-icons/tb';
import { Info } from "./CreateComponent"

interface ElementProps {
  id: string;
  info: Info;
  exId?: string;
}

const Element: React.FC<ElementProps> = ({ id, info, exId }) => {
  const renderResizeHandles = (elementId: string) => (
    <>
      <div
        onMouseDown={() => info.resizeElement(elementId, info)}
        className="rounded-full border-2 border-white absolute group-hover:block -bottom-[7px] -right-[7px] w-[12px] h-[12px] cursor-nwse-resize bg-purple-500 z-[99999]"
      ></div>
      <div
        onMouseDown={() => info.resizeElement(elementId, info)}
        className="rounded-full border-2 border-white absolute group-hover:block -top-[7px] -right-[7px] w-[12px] h-[12px] cursor-nesw-resize bg-purple-500 z-[99999]"
      ></div>
      <div
        onMouseDown={() => info.resizeElement(elementId, info)}
        className="rounded-full border-2 border-white absolute group-hover:block -bottom-[7px] -left-[7px] w-[12px] h-[12px] cursor-nesw-resize bg-purple-500 z-[99999]"
      ></div>
      <div
        onMouseDown={() => info.resizeElement(elementId, info)}
        className="rounded-full border-2 border-white absolute group-hover:block -top-[7px] -left-[7px] w-[12px] h-[12px] cursor-nwse-resize bg-purple-500 z-[99999]"
      ></div>
    </>
  );

  return (
    <>
      {  (
        exId ? renderResizeHandles(exId) : renderResizeHandles(id)
      ) }

      <div
        onMouseDown={() => info.rotateElement(id, info)}
        className="w-[25px] flex absolute justify-center cursor-pointer left-[50%] -translate-x-[50%] -top-14 items-center hover:bg-indigo-600 hover:text-white h-[25px] rounded-full border-2 border-slate-500"
      >
        <TbRefresh />
      </div>
    </>
  );
};

export default Element;
