import React from "react";
import Element from "./Element";
export interface Info {
  rotateElement(id: string, info: Info): void;
  resizeElement(elementId: string, info: Info): void;
  id: string;
  name: string;
  type?: string;
  width?: number;
  height?: number;
  color?: string;
  z_index?: number;
  image?: string;
  left?: number;
  top?: number;
  rotate?: number;
  opacity?: number;
  padding?: number;
  font?: number;
  weight?: number;
  title?: string;
  radius?: number;
  setCurrentComponent: (info: Info) => void;
  moveElement: (id: string, info: Info) => void;
  fontFamily?: string;
}

interface CreateComponentProps {
  info: Info;
  current_component: Info | null;
  removeComponent: (id: string) => void;
  selectItem: string;
  setSelectItem: (id: string) => void;
}

const CreateComponent: React.FC<CreateComponentProps> = ({
  current_component,
  info,
  selectItem,
  setSelectItem,
}) => {
  let html: React.ReactNode = "";

  if (info.name === "main_frame") {
    html = (
      <div
        onClick={() => {
          info.setCurrentComponent(info);
          setSelectItem("");
        }}
        className="hover:border-[2px] hover:border-indigo-500 shadow-md"
        style={{
          width: info.width + "px",
          height: info.height + "px",
          background: info.color,
          zIndex: info.z_index,
        }}
      >
        {info.image && (
          <img className="w-full h-full" src={info.image} alt="image" />
        )}
      </div>
    );
  }

  if (info.name === "shape" && info.type === "rect") {
    html = (
      <div
        id={info.id}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          opacity: info.opacity,
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        //className={`absolute group hover:border-[2px] ${
        //          info.id === selectItem ? "border-[2px]" : ""
        //        } border-indigo-500`}
        className={`absolute group outline-indigo-500 outline-2 hover:outline ${
          info.id === selectItem ? "outline" : ""
        } outline-indigo-500`}
      >
        {selectItem === info.id && (
          <Element id={info.id} info={info} exId={`${info.id}r`} />
        )}
        <div
          onMouseDown={() => info.moveElement(info.id, info)}
          id={`${info.id}r`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
          }}
        ></div>
      </div>
    );
  }
  if (info.name === "shape" && info.type === "line") {
    html = (
      <div
        id={info.id}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          opacity: info.opacity,
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        //className={`absolute group hover:border-[2px] ${
        //          info.id === selectItem ? "border-[2px]" : ""
        //        } border-indigo-500`}
        className={`absolute group outline-indigo-500 outline-2 hover:outline ${
          info.id === selectItem ? "outline" : ""
        } outline-indigo-500`}
      >
        {selectItem === info.id && (
          <Element id={info.id} info={info} exId={`${info.id}r`} />
        )}
        <div
          onMouseDown={() => info.moveElement(info.id, info)}
          id={`${info.id}r`}
          style={{
            width: info.width + "px",
            height: "1px",
            background: info.color,
          }}
        ></div>
      </div>
    );
  }

  if (info.name === "shape" && info.type === "circle") {
    html = (
      <div
        id={info.id}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        //className={`absolute group hover:border-[2px] ${
        //          info.id === selectItem ? "border-[2px]" : ""
        //        } border-indigo-500`}
        className={`absolute group outline-indigo-500 outline-2 hover:outline ${
          info.id === selectItem ? "outline" : ""
        } outline-indigo-500`}
      >
        {selectItem === info.id && (
          <Element id={info.id} info={info} exId={`${info.id}c`} />
        )}
        <div
          onMouseDown={() => info.moveElement(info.id, info)}
          id={`${info.id}c`}
          className="rounded-full"
          style={{
            width: info.width + "px",
            height: info.width + "px",
            background: info.color,
            opacity: info.opacity,
          }}
        ></div>
      </div>
    );
  }

  if (info.name === "shape" && info.type === "trangle") {
    html = (
      <div
        id={info.id}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        // className={`absolute group hover:border-[2px] ${
        //   info.id === selectItem ? "border-[2px]" : ""
        // } border-indigo-500`}
        className={`absolute group outline-indigo-500 outline-2 hover:outline ${
          info.id === selectItem ? "outline" : ""
        } outline-indigo-500`}
      >
        {selectItem === info.id && (
          <Element id={info.id} info={info} exId={`${info.id}t`} />
        )}
        <div
          onMouseDown={() => info.moveElement(info.id, info)}
          id={`${info.id}t`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath: "polygon(50% 0,100% 100%,0 100%)",
          }}
        ></div>
      </div>
    );
  }

  if (info.name === "text") {
    // info.fontFamily=current_component?.fontFamily;
    html = (
      <div onClick={() => {info.setCurrentComponent(info)}}>
        <div
          id={info.id}
          style={{
            left: info.left + "px",
            top: info.top + "px",
            zIndex: info.z_index,
            transform: info.rotate
              ? `rotate(${info.rotate}deg)`
              : "rotate(0deg)",
            // padding: info.padding + "px",
            color: info.color,
            opacity: info.opacity,
            fontFamily: info.fontFamily,
            fontSize:info.font
          }}
          className={`absolute group outline-indigo-500 outline-2 hover:outline ${
            info.id === selectItem ? "outline" : ""
          } outline-indigo-500`}
        >
          {selectItem === info.id && (
            <Element id={info.id} info={info} exId="" />
          )}
          <div onMouseDown={() => info.moveElement(info.id, info)}>
            <h2
              style={{
                fontSize: info.font + "px",
                fontWeight: info.weight,
                fontFamily: info.fontFamily,
              }}
              className="w-full h-full"
            >
              {info.title}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (info.name === "image") {
    html = (
      <div
        id={info.id}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
          opacity: info.opacity,
        }}
        // className={`absolute group outline-indigo-500 outline-2 hover:outline ${
        //   info.id === selectItem ? "outline-[2px]" : ""
        // } outline-indigo-500`}

        className={`absolute group outline-indigo-500 outline-2 hover:outline ${
          info.id === selectItem ? "outline" : ""
        }`}
      >
        {selectItem === info.id && (
          <Element id={info.id} info={info} exId={`${info.id}img`} />
        )}
        <div
          onMouseDown={() => info.moveElement(info.id, info)}
          className="overflow-hidden"
          id={`${info.id}img`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            borderRadius: `${info.radius}%`,
          }}
        >
          <img className="w-full h-full" src={info.image} alt="image" />
        </div>
      </div>
    );
  }

  return <>{html}</>;
};

export default CreateComponent;
