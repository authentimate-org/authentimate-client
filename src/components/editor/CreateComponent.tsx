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
  lineHeight?: number;
  weight?: number;
  title?: string;
  radius?: number;
  setCurrentComponent: (info: Info) => void;
  moveElement: (id: string, info: Info) => void;
  fontFamily?: string;
  removeComponent: (id: string) => void;
}

interface CreateComponentProps {
  info: Info;
  current_component: Info | null;
  removeComponent: (id: string) => void;
  selectItem: string;
  setSelectItem: (id: string) => void;
}

const CreateComponent: React.FC<CreateComponentProps> = ({
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
        // className="hover:border-[2px] hover:border-indigo-500 shadow-md"
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
          position: "absolute",
          opacity: info.opacity,
          // lineHeight:info.lineheight,
          left: `${info.left}px`,
          top: `${info.top}px`,
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
          width: `${info.width}px`,
          height: `${info.lineHeight || 1}px`, // Use lineheight for height, default to 1px
        }}
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
            width: "100%",
            height: "100%",
            backgroundColor: info.color,
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

  if (info.name === "text" && info.type === "title") {
    html = (
      <div onClick={() => info.setCurrentComponent(info)}>
        <div
          id={info.id}
          style={{
            left: info.left + "px",
            top: info.top + "px",
            zIndex: info.z_index,
            transform: info.rotate
              ? `rotate(${info.rotate}deg)`
              : "rotate(0deg)",
            padding: info.padding + "px",
            color: info.color,
            opacity: info.opacity,
            fontFamily: info.fontFamily,
            width: info.width + "px",
            height: info.height + "px",
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

  if (info.name === "text" && info.type === "recipientName") {
    html = (
      <div onClick={() => info.setCurrentComponent(info)}>
        <div
          id={info.id}
          style={{
            left: info.left + "px",
            top: info.top + "px",
            zIndex: info.z_index,
            transform: info.rotate
              ? `rotate(${info.rotate}deg)`
              : "rotate(0deg)",
            padding: info.padding + "px",
            color: info.color,
            opacity: info.opacity,
            fontFamily: info.fontFamily,
            pointerEvents: "auto",
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

  if (info.name === "image" && info.type === "image") {
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
        className={`absolute group outline-indigo-500 outline-2 hover:outline ${
          info.id === selectItem ? "outline" : ""
        }`}
      >
        {selectItem === info.id && (
          <Element id={info.id} info={info} exId={``} />
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

  if (info.name === "image" && info.type === "qrCode") {
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
          pointerEvents: "auto",
        }}
        className={`absolute group outline-indigo-500 outline-2 hover:outline ${
          info.id === selectItem ? "outline" : ""
        } outline-indigo-500`}
      >
        {selectItem === info.id && (
          <Element id={info.id} info={info} exId={``} />
        )}
        <div
          onMouseDown={(e) => {
            e.stopPropagation();
            info.moveElement(info.id, info);
          }}
          className="overflow-hidden"
          id={`${info.id}img`}
          style={{
            // width: "100%",
            // height: "100%",
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
