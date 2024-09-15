import React from "react";
import Element from "./Element";
type TextAlign = "left" | "center" | "right";
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
  textAlign?: TextAlign;paddingAmount?:number;
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
        style={{
          width: info.width + "px",
          height: info.height + "px",
          background: info.color,
          zIndex: info.z_index,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {info.image && (
          <img
            src={info.image}
            alt="image"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        )}
      </div>
    );
  }

  // if (info.name === "shape" && info.type === "rect") {
  //   html = (
  //     <div
  //       id={info.id}
  //       onClick={() => info.setCurrentComponent(info)}
  //       style={{
  //         opacity: info.opacity,
  //         left: info.left + "px",
  //         top: info.top + "px",
  //         zIndex: info.z_index,
  //         transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
  //       }}
  //       className={`absolute group outline-indigo-500 outline-2 hover:outline ${
  //         info.id === selectItem ? "outline" : ""
  //       } outline-indigo-500`}
  //     >
  //       {selectItem === info.id && (
  //         <Element id={info.id} info={info} exId={`${info.id}r`} />
  //       )}
  //       <div
  //         onMouseDown={() => info.moveElement(info.id, info)}
  //         id={`${info.id}r`}
  //         style={{
  //           width: info.width + "px",
  //           height: info.height + "px",
  //           background: info.color,
  //         }}
  //       ></div>
  //     </div>
  //   );
  // }
  if (info.name === "shape" && info.type === "line") {
    const paddingAmount = 10; // Adjust this value as needed
    
    // Calculate the actual position considering the padding
    const displayLeft = (info.left || 0) - paddingAmount;
    const displayTop = (info.top || 0) - paddingAmount;
  
    html = (
      <div
        id={info.id}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          position: "absolute",
          opacity: info.opacity,
          left: `${displayLeft}px`,
          top: `${displayTop}px`,
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
          width: `${(info.width || 0) + (2 * paddingAmount)}px`,
          height: `${(2 * paddingAmount) + (info.lineHeight || 1)}px`,
          cursor: 'move',
        }}
        className={`absolute group outline-indigo-500 outline-2 hover:outline ${
          info.id === selectItem ? "outline" : ""
        } outline-indigo-500`}
      >
        {selectItem === info.id && (
          <Element id={info.id} info={{...info, paddingAmount}}  exId={`${info.id}r`} />
        )}
        <div
          onMouseDown={(_) => {
            // Pass the padding information to the moveElement function
            info.moveElement(info.id, { ...info, paddingAmount });
          }}
          id={`${info.id}r`}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: `${info.width}px`,
              height: `${info.lineHeight || 1}px`,
              backgroundColor: info.color,
            }}
          />
        </div>
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
            textAlign: info.textAlign || "center",cursor: 'move'
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
                textAlign: info.textAlign || "center",
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
            width: info.width + "px",
            // width: "100%",
            height: info.height + "px",
            textAlign: info.textAlign || "center",
            pointerEvents: "auto",cursor: 'move'
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
                textAlign: info.textAlign || "center",
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
          opacity: info.opacity,cursor: 'move'
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
          pointerEvents: "auto",cursor: 'move'
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
