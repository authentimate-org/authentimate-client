// src/components/editor/Main.tsx
import React, { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
// import { BsGrid1X2, BsFillImageFill, BsFolder } from "react-icons/bs";
import { FaShapes, FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import { IoDuplicateOutline } from "react-icons/io5";
import { TfiText } from "react-icons/tfi";
import { MdKeyboardArrowLeft } from "react-icons/md";
// import { RxTransparencyGrid } from "react-icons/rx";
// import TemplateDesign from "./main/TemplateDesign";
import CreateComponent from "./CreateComponent";
// import { useFetchTemplateByIdQuery } from "@/api/project/projectApi";
// import { stringify } from "querystring";
import MyImages from "./Myimages";
type TextAlign = "left" | "center" | "right";
interface Component {
  rotateElement(id: string, info: Component): void;
  resizeElement(elementId: string, info: Component): void;
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
  lineHeight?: number;
  padding?: number;
  font?: number;
  weight?: number;
  title?: string;
  radius?: number;
  setCurrentComponent: (info: Component) => void;
  moveElement: (id: string, info: Component) => void;
  fontFamily?: string;
  textAlign?: TextAlign;
  removeComponent: (id: string) => void;
}

type Template = Component[];

interface MainProps {
  projectId: string;
  templateData: Template;
  showNextButton?: boolean;
  onNextClick?: () => void;
}

const Main: React.FC<MainProps> = ({
  projectId,
  templateData,
  showNextButton,
  onNextClick,
}) => {
  const [selectItem, setSelectItem] = useState<string>("");
  const { design_id } = useParams<{ design_id: string }>();
  const [state, setState] = useState<string>("");
  const [current_component, setCurrentComponent] = useState<Component | null>(
    null
  );
  const [textAlign, setTextAlign] = useState<TextAlign>("center");
  const [color, setColor] = useState<string>("");
  // const [image, setImage] = useState<string>("");
  const [rotate, setRotate] = useState<number>(0);
  // const [left, setLeft] = useState<number | string>("");
  // const [top, setTop] = useState<number | string>("");
  // const [width, setWidth] = useState<number | string>("");
  // const [height, setHeight] = useState<number | string>("");
  const [opacity, setOpacity] = useState<number | string>("");
  const [zIndex, setzIndex] = useState<number | string>("");
  const [fontFamily, setFontFamily] = useState<string>("");
  const [title, settitle] = useState<string>("");
  const [padding, setPadding] = useState<number | string>(0);
  const [lineHeight, setLineheight] = useState<number | string>(1);

  const handleResetProperties = (a: Component) => {
    setColor(a.color ?? "");
    // setImage(a.image ?? "");
    setRotate(a.rotate ?? 0);
    setTextAlign(a.textAlign ?? "center");
    // setLeft(a.left ?? "");
    // setTop(a.top ?? "");
    // setWidth(a.width ?? "");
    // setHeight(a.height ?? "");
    setOpacity(a.opacity ?? "");
    setRadius(a.radius ?? 0);
    setLineheight(a.lineHeight ?? 1);
    setzIndex(a.z_index ?? "");
    setFontFamily(a.fontFamily ?? "");
    setPadding(a.padding ?? 0);
    settitle(a.title ?? "");
    setFont(a.font ?? 12);
    setWeight(a.weight ?? "");
  };

  const fontFamilies = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Courier New",
    "Georgia",
    "fantasy",
    "Brush Script MT",
    "Lucida Console",
    "Papyrus",
  ];
  // const setFontFamily = (fontFamily: any) => {
  //   if (current_component) {
  //     setCurrentComponent({
  //       ...current_component,
  //       fontFamily: fontFamily,
  //     });
  //   }
  //   console.log(current_component)
  // };
  const [font, setFont] = useState<number>(12);
  const [weight, setWeight] = useState<number | string>("");
  // const [text, setText] = useState<string>("");
  const [radius, setRadius] = useState<number>(0);
  const handleClick = () => {
    setElements("text", "text");
    setShow({ name: "", status: true });
    add_text("text", "title");
  };
  // const handleClicking = (e: any) => {
  //   setText(e.target.value);
  //   settitle(e.target.value);
  //   handlePropertyChange("title", e.target.value);
  // };
  const [show, setShow] = useState<{ status: boolean; name: string }>({
    status: true,
    name: "",
  });
  const [components, setComponents] = useState<Component[]>([
    {
      name: "main_frame",
      type: "rect",
      id: String(Math.floor(Math.random() * 100 + 1)),
      height: 450,
      width: 650,
      z_index: 1,
      color: "#fff",
      image: "",
      setCurrentComponent: (a) => {
        handleResetProperties(a);
        setCurrentComponent(a);
      },
      rotateElement: function (id: string, info: Component): void {
        console.log(id,info)
        throw new Error("Function not implemen  ted.");
      },
      resizeElement: function (elementId: string, info: Component): void {
        console.log(elementId,info)
        throw new Error("Function not implemented.");
      },
      moveElement: function (id: string, info: Component): void {
        console.log(id,info)
        throw new Error("Function not implemented.");
      },
      removeComponent: function (id: string): void {
        console.log(id)
        throw new Error("Function not implemented.");
      },
    },
  ]);

  const setElements = (type: string, name: string) => {
    setState(type);
    setShow({
      status: false,
      name,
    });
  };

  const handlePropertyChange = useCallback(
    (property: string, value?: any, id?: string) => {
      setComponents((prevComponents) => {
        const componentId = id || current_component?.id;
        if (!componentId) {
          console.error("No valid component ID provided.");
          return prevComponents;
        }
        const index = components.findIndex((c) => c.id === componentId);
        const name = components[index]?.name;

        return prevComponents.map((component) => {
          if (component.id === componentId) {
            let updatedComponent = { ...component };
            // Update the component based on the property
            if (property === "position") {
              updatedComponent.left = value.left;
              updatedComponent.top = value.top;
            } else if (property === "size") {
              updatedComponent.width = value.width;
              updatedComponent.height = value.height;
            } else if (property === "colors") {
              setColor(value);
              updatedComponent.color = value;
            } else if (property === "Zindex") {
              setzIndex(value);
              updatedComponent.z_index = value;
            } else if (property === "Opacity") {
              setOpacity(value);
              updatedComponent.opacity = value;
            } else if (property === "Lineheights") {
              updatedComponent.lineHeight = value;
              setLineheight(value);
            } else if (name === "text") {
              if (property === "fontSize") {
                setFont(value);
                updatedComponent.font = value;
              } else if (property === "textAligns") {
                setTextAlign(value as TextAlign);
                updatedComponent.textAlign = value as TextAlign;
              } else if (property === "fontFamilys") {
                console.log(value);
                setFontFamily(value);
                updatedComponent.fontFamily = value;
              } else if (property === "Paddings") {
                setPadding(value);
                updatedComponent.padding = value;
              } else if (property === "weights") {
                setWeight(value);
                updatedComponent.weight = value;
              } else if (property === "titles") {
                settitle(value);
                updatedComponent.title = value;
              }
            } else if (name === "image") {
              if (property === "Radius") {
                setRadius(value);
                updatedComponent.radius = value;
              }
            }
            return updatedComponent;
          }
          return component;
        });
      });
    },
    [current_component, setComponents]
  );

  const moveElement = useCallback(
    (id: string, currentInfo: Component & { paddingAmount?: number }) => {
      setCurrentComponent(currentInfo);

      let isMoving = true;

      const currentDiv = document.getElementById(id);
      const canvas = document.getElementById("main_design");
      const canvasRect = canvas?.getBoundingClientRect();

      if (!canvasRect) {
        console.error("Canvas element not found.");
        return;
      }

      const canvasWidth = canvasRect.width;
      const canvasHeight = canvasRect.height;

      const mouseMove = ({ movementX, movementY }: MouseEvent) => {
        setSelectItem("");
        const getStyle = window.getComputedStyle(currentDiv!);
        let left = parseInt(getStyle.left);
        let top = parseInt(getStyle.top);

        if (isMoving) {
          left += movementX;
          top += movementY;

          const width = currentInfo.width ?? currentDiv!.offsetWidth;
          const height = currentInfo.height ?? currentDiv!.offsetHeight;

          // Adjust for padding if it exists
          const paddingAmount = currentInfo.paddingAmount || 0;
          left = Math.max(
            -paddingAmount,
            Math.min(left, canvasWidth - width + paddingAmount)
          );
          top = Math.max(
            -paddingAmount,
            Math.min(top, canvasHeight - height + paddingAmount)
          );

          currentDiv!.style.left = `${left}px`;
          currentDiv!.style.top = `${top}px`;
        }

        // Adjust the position to account for padding when updating the component
        const adjustedLeft = left + (currentInfo.paddingAmount || 0);
        const adjustedTop = top + (currentInfo.paddingAmount || 0);
        handlePropertyChange(
          "position",
          { left: adjustedLeft, top: adjustedTop },
          id
        );
      };

      const mouseUp = (_: MouseEvent) => {
        setSelectItem(currentInfo.id);
        isMoving = false;
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mouseup", mouseUp);
      };

      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mouseup", mouseUp);
      currentDiv!.ondragstart = () => false;
    },
    [handlePropertyChange]
  );

  const resizeElement = useCallback(
    (id: string, currentInfo: Component & { paddingAmount?: number }) => {
      setCurrentComponent(currentInfo);
      let isMoving = true;

      const currentDiv = document.getElementById(id);
      const paddingAmount = currentInfo.paddingAmount || 0;
      const mouseMove = ({ movementX, movementY }: MouseEvent) => {
        const getStyle = window.getComputedStyle(currentDiv!);

        let width = parseInt(getStyle.width) - 2 * paddingAmount;
        let height = parseInt(getStyle.height) - 2 * paddingAmount;

        if (isMoving) {
          if (currentInfo.name === "image" && currentInfo.type === "qrCode") {
            // Maintain aspect ratio for QR code
            const aspectRatio = width / height;
            let newWidth = width + movementX;

            if (newWidth < 60) {
              newWidth = 60; // Ensure minimum width of 30px
            }

            const newHeight = newWidth / aspectRatio;

            currentDiv!.style.width = `${newWidth}px`;
            currentDiv!.style.height = `${newHeight}px`;
          } else if (
            currentInfo.name === "shape" &&
            currentInfo.type === "line"
          ) {
            width += movementX;
            width = Math.max(width, 1);
            // height = Math.min(Math.max(height + movementY, 1), 8);
            let newLineHeight = Math.max(
              currentInfo.lineHeight || 1 + movementY,
              1
            );
            height = newLineHeight;

            currentDiv!.style.width = `${width + 2 * paddingAmount}px`;
            currentDiv!.style.height = `${height + 2 * paddingAmount}px`;
          } else {
            currentDiv!.style.width = `${width + movementX}px`;
            currentDiv!.style.height = `${height + movementY}px`;
          }
        }
        console.log(height, width);
        console.log(id);
        handlePropertyChange("size", { width, height }, id);
      };

      const mouseUp = (_: MouseEvent) => {
        isMoving = false;
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mouseup", mouseUp);
        if (currentInfo.name === "shape" && currentInfo.type === "line") {
          handlePropertyChange(
            "size",
            {
              width: parseInt(currentDiv?.style.width ?? ""),
              height: currentInfo.lineHeight || 1, // Maintain the line height
            },
            currentInfo.id
          );
        }
      };

      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mouseup", mouseUp);
      currentDiv!.ondragstart = function () {
        return false;
      };
    },
    [handlePropertyChange]
  );

  const rotateElement = (id: string, currentInfo: Component) => {
    setCurrentComponent(currentInfo);

    const target = document.getElementById(id);

    const mouseMove = ({ movementX }: MouseEvent) => {
      const getStyle = window.getComputedStyle(target!);

      const trans = getStyle.transform;

      const values = trans.split("(")[1].split(")")[0].split(",");

      const angle = Math.round(
        Math.atan2(parseFloat(values[1]), parseFloat(values[0])) *
          (180 / Math.PI)
      );

      let deg = angle < 0 ? angle + 360 : angle;

      if (movementX) {
        deg = deg + movementX;
      }
      target!.style.transform = `rotate(${deg}deg)`;
    };
    const mouseUp = (_: MouseEvent) => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);

      const getStyle = window.getComputedStyle(target!);
      const trans = getStyle.transform;
      const values = trans.split("(")[1].split(")")[0].split(",");
      const angle = Math.round(
        Math.atan2(parseFloat(values[1]), parseFloat(values[0])) *
          (180 / Math.PI)
      );
      let deg = angle < 0 ? angle + 360 : angle;
      setRotate(deg);
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);

    target!.ondragstart = function () {
      return false;
    };
  };

  const removeComponent = (id: string) => {
    const temp = components.filter((c) => c.id !== id);
    const tempe = components.filter((c) => c.name === "main_frame");
    // console.log((temp)
    setCurrentComponent(tempe[0]);
    setComponents(temp);
  };

  const duplicate = (current: Component) => {
    if (current) {
      setComponents([...components, { ...current, id: Date.now().toString() }]);
    }
  };

  // const remove_background = () => {
  //   const com = components.find((c) => c.id === current_component!.id);
  //   const temp = components.filter((c) => c.id !== current_component!.id);
  //   if (com) {
  //     com.image = "";
  //   }
  //   setImage("");
  //   setComponents([...temp, com!]);
  // };

  // const opacityHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setOpacity(parseFloat(e.target.value));
  // };

  const createShape = (name: string, type: string) => {
    setCurrentComponent(null);
    const id = Date.now().toString();
    const style: Component = {
      id: id,
      name: name,
      textAlign: "center",
      type,
      left: 10,
      top: 10,
      opacity: 1,
      lineHeight: 1,
      width: 200,
      height: 150,
      rotate,
      z_index: 2,
      color: "#3c3c3d",
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
      removeComponent,
    };
    setSelectItem(id); // Ensure selectItem is a string
    setCurrentComponent(style);
    setComponents([...components, style]);
  };

  const add_text = (name: string, type: string) => {
    setCurrentComponent(null);
    const id = Date.now().toString();
    const style: Component = {
      id: id,
      name: name,
      type,
      left: 10,
      top: 10,
      opacity: 1,
      rotate,
      height: 40,
      width: 100,
      z_index: 10,
      padding: 0,
      font: 22,
      title: "Add text",
      weight: 400,
      color: "#3c3c3d",
      textAlign: "center",
      fontFamily: "Arial",
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
      removeComponent,
    };
    setWeight(100);
    setFont(16);
    setPadding(0);
    setFontFamily("Arial");
    setTextAlign("center");
    setSelectItem(id);
    setCurrentComponent(style);
    console.log(style);
    console.log(components);
    setComponents([...components, style]);
  };

  const add_image = (img: string) => {
    setCurrentComponent(null);
    const id = Date.now().toString();
    const style: Component = {
      id: id,
      name: "image",
      type: "image",
      left: 10,
      top: 10,
      opacity: 1,
      width: 200,
      height: 150,
      rotate,
      z_index: 2,
      radius: 0,
      // lineheight:1,
      image: img,
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
      removeComponent,
    };

    setSelectItem(id);
    setCurrentComponent(style);
    setComponents([...components, style]);
  };

  // useEffect(() => {
  //   if (current_component) {
  //     const index = components.findIndex((c) => c.id === current_component.id);
  //     const temp = components.filter((c) => c.id !== current_component.id);

  //     if (current_component.name !== "text") {
  //       components[index].width =
  //         typeof width === "string"
  //           ? parseInt(width)
  //           : width || current_component.width;
  //       components[index].height =
  //         typeof height === "string"
  //           ? parseInt(height)
  //           : height || current_component.height;
  //       components[index].rotate = rotate || current_component.rotate;
  //     }
  //     if (current_component.name === "text") {
  //       components[index].font =
  //         typeof font === "string"
  //           ? parseInt(font)
  //           : font || current_component.font;
  //       components[index].padding =
  //         typeof padding === "string"
  //           ? parseInt(padding)
  //           : padding || current_component.padding;
  //       components[index].weight =
  //         typeof weight === "string"
  //           ? parseInt(weight)
  //           : weight || current_component.weight;
  //       components[index].fontFamily =
  //         typeof fontFamily === "string"
  //           ? fontFamily
  //           : fontFamily || current_component.fontFamily;
  //       components[index].title = text || current_component.title;
  //     }
  //     if (current_component.name === "image") {
  //       components[index].radius = radius || current_component.radius;
  //     }

  //     if (current_component.name === "main_frame" && image) {
  //       components[index].image = image || current_component.image;
  //     }
  //     components[index].color = color || current_component.color;

  //     if (current_component.name !== "main_frame") {
  //       components[index].left =
  //         typeof left === "string"
  //           ? parseInt(left)
  //           : left || current_component.left;
  //       components[index].top =
  //         typeof top === "string"
  //           ? parseInt(top)
  //           : top || current_component.top;
  //       components[index].opacity =
  //         typeof opacity === "string"
  //           ? parseFloat(opacity)
  //           : opacity || current_component.opacity;
  //       components[index].z_index =
  //         typeof zIndex === "string"
  //           ? parseInt(zIndex)
  //           : zIndex || current_component.z_index;
  //       components[index].fontFamily =
  //         typeof fontFamily === "string"
  //           ? fontFamily
  //           : fontFamily || current_component.fontFamily;
  //     }
  //     setComponents([...components]);

  //     setColor("");
  //     setWidth("");
  //     setHeight("");
  //     setTop("");
  //     setLeft("");
  //     setRotate(0);
  //     setOpacity("");
  //     setPadding(0);
  //     setzIndex("");
  //     setText("");
  //   }
  // }, [
  //   color,
  //   image,
  //   left,
  //   top,
  //   width,
  //   height,
  //   opacity,
  //   zIndex,
  //   padding,
  //   fontFamily,
  //   font,
  //   weight,
  //   text,
  //   radius,
  //   rotate,
  // ]);

  // const {
  //   data: templateData,
  //   isLoading,
  //   isError,
  // } = useFetchTemplateByIdQuery(projectId);

  // useEffect(() => {
  //   if (templateData && templateData) {
  //     const design = templateData.flatMap((array:any) =>
  //       array.map((element: any) => ({
  //         ...element,
  //         setCurrentComponent: (a: any) => setCurrentComponent(a),
  //         moveElement: moveElement,
  //         resizeElement: resizeElement,
  //         rotateElement: rotateElement,
  //       }))
  //     );

  //     console.log(design);
  //     setComponents(design);
  //   } else {
  //     console.error(
  //       "Template data is undefined or does not contain graphicElements"
  //     );
  //   }
  // }, [templateData]);
  useEffect(() => {
    if (selectItem) {
      const selected = components.find((c) => c.id === selectItem);
      if (selected) {
        setCurrentComponent(selected);
      }
    }
  }, [selectItem, components]);
  useEffect(() => {
    // console.log(templateData)
    if (templateData) {
      const design = templateData.map((element: any) => ({
        ...element,
        setCurrentComponent: (a: any) => {
          handleResetProperties(a);
          setCurrentComponent(a);
        },
        moveElement: moveElement,
        resizeElement: resizeElement,
        rotateElement: rotateElement,
        removeComponent: removeComponent,
      }));

      setComponents(design);
      const tempe = components.filter((c) => c.name === "main_frame");
      setCurrentComponent(tempe[0]);
    } else {
      console.error(
        "Template data is undefined or does not contain components"
      );
    }
  }, [templateData]);
  useEffect(() => {
    console.log("Updated components: in useeffeci", components);
  }, [components]);

  // if (isLoading) {
  //   return <div>Loading template...</div>;
  // }

  // if (isError || !templateData) {
  //   return <div>Error loading template</div>;
  // }
  // console.log(mainFrame)
  if (components.length > 0) {
    var mainFrame = components.find((c) => c.name === "main_frame");
  }
  return (
    <div className="min-w-screen h-screen bg-black overflow-hidden">
      <Header
        components={components}
        projectId={projectId}
        design_id={design_id || ""}
        showNextButton={showNextButton}
        onNextClick={onNextClick}
      />
      {/* Provide a default value */}
      <div className="flex h-[calc(100%-60px)] w-screen">
        <div className="w-[80px] bg-[#252627] z-50 h-full text-gray-400 overflow-y-auto">
          {/* <div
            onClick={() => setElements("design", "design")}
            className={` ${
              show.name === "design" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <BsGrid1X2 />
            </span>
            <span className="text-xs font-medium">Design</span>
          </div> */}

          <div
            onClick={() => setElements("shape", "shape")}
            className={`${
              show.name === "shape" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <FaShapes />
            </span>
            <span className="text-xs font-medium">Shapes</span>
          </div>

          <div
            onClick={() => setElements("image", "uploadImage")}
            className={`${
              show.name === "uploadImage" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <FaCloudUploadAlt />
            </span>
            <span className="text-xs font-medium">Upload</span>
          </div>

          <div
            onClick={handleClick}
            className={`${
              show.name === "text" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <TfiText />
            </span>
            <span className="text-xs font-medium">Text</span>
          </div>

          {/* <div
            onClick={() => setElements("project", "projects")}
            className={`${
              show.name === "projects" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <BsFolder />
            </span>
            <span className="text-xs font-medium">Project</span>
          </div> */}

          {/* <div
            onClick={() => setElements("initImage", "images")}
            className={`${
              show.name === "images" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <BsFillImageFill />
            </span>
            <span className="text-xs font-medium">Images</span>
          </div> */}

          {/* <div
            onClick={() => setElements("background", "background")}
            className={`${
              show.name === "background" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <RxTransparencyGrid />
            </span>
            <span className="text-xs font-medium">Background</span>
          </div> */}
        </div>
        <div className="h-full w-[calc(100%-75px)]">
          <div
            className={`${
              show.status ? "p-0 -left-[350px]" : "px-8 left-[100px] py-5"
            } bg-[#6e7484] h-[91%] absolute transition-all w-[342px] z-30 duration-700`}
          >
            <div
              onClick={() => setShow({ name: "", status: true })}
              className="flex absolute justify-center items-center bg-[#252627] w-[20px] -right-2 text-slate-300 top-[40%] cursor-pointer h-[100px] rounded-full"
            >
              <MdKeyboardArrowLeft />
            </div>
            {/* {state === "design" && (
              <div>
                <TemplateDesign type="main" />
              </div>
            )} */}
            {state === "shape" && (
              <div className="grid grid-cols-3 gap-2">
                <div
                  onClick={() => createShape("shape", "rect")}
                  className="h-[90px] bg-[#3c3c3d] cursor-pointer"
                ></div>
                <div
                  onClick={() => createShape("shape", "line")}
                  className="h-[10px] w-full bg-[#3c3c3d] cursor-pointer"
                ></div>
                <div
                  onClick={() => createShape("shape", "circle")}
                  className="h-[90px] bg-[#3c3c3d] cursor-pointer rounded-full"
                ></div>
                <div
                  onClick={() => createShape("shape", "triangle")}
                  style={{ clipPath: "polygon(50% 0,100% 100%,0 100%)" }}
                  className="h-[90px] bg-[#3c3c3d] cursor-pointer"
                ></div>
              </div>
            )}
            {state === "image" && <MyImages add_image={add_image} />}
            {/* {state === "text" && (
              <div>
                <div className="grid grid-cols-1 gap-2">
                  <div
                    onClick={() => add_text("text", "title")}
                    className="bg-[#3c3c3d] cursor-pointer font-bold p-3 text-white text-xl rounded-sm"
                  >
                    <h2>Add a Text</h2>
                  </div>
                </div>
              </div>
            )} */}
          </div>

          <div className="w-full flex h-full">
            <div
              className={`flex justify-center relative items-center h-full ${
                !current_component
                  ? "w-full"
                  : "w-[calc(100%-250px)] overflow-hidden"
              }`}
            >
              <div
                className="flex justify-center items-center overflow-hidden"
                style={{
                  width: mainFrame?.width ? `${mainFrame.width}px` : "auto",
                  height: mainFrame?.height ? `${mainFrame.height}px` : "auto",
                }}
              >
                <div
                  id="main_design"
                  className="relative overflow-hidden select-none"
                  style={{
                    width: mainFrame?.width ? `${mainFrame.width}px` : "auto",
                    height: mainFrame?.height
                      ? `${mainFrame.height}px`
                      : "auto",
                  }}
                >
                  {components.map((c, i) => (
                    <CreateComponent
                      selectItem={selectItem}
                      setSelectItem={setSelectItem}
                      key={i}
                      info={c}
                      current_component={current_component}
                      removeComponent={removeComponent}
                    />
                  ))}
                </div>
              </div>
            </div>
            {current_component && (
              <div className="h-full w-[250px] text-gray-300 bg-[#252627] px-3 py-2 relative left-[-79px]">
                <div className="flex gap-6 flex-col items-start h-full px-3 justify-start pt-4">
                  {current_component.name !== "main_frame" &&
                    current_component.type !== "recipientName" &&
                    current_component.type !== "qrCode" && (
                      <div className="flex justify-start items-center gap-5">
                        <div
                          onClick={() => removeComponent(current_component?.id)}
                          className="w-[30px] flex justify-center items-center rounded-md cursor-pointer h-[30px] bg-slate-700 hover:bg-slate-800"
                        >
                          <FaTrash />
                        </div>
                        <div
                          onClick={() => duplicate(current_component)}
                          className="w-[30px] flex justify-center items-center rounded-md cursor-pointer h-[30px] bg-slate-700 hover:bg-slate-800"
                        >
                          <IoDuplicateOutline />
                        </div>
                      </div>
                    )}
                  <div className="flex gap-4 justify-start items-start">
                    <span>Color : </span>
                    <label
                      className="w-[30px] h-[30px] cursor-pointer rounded-sm"
                      style={{
                        background: `${
                          color && color !== "#fff" ? color : "gray"
                        }`,
                      }}
                      htmlFor="color"
                    ></label>
                    <input
                      onChange={(e) =>
                        handlePropertyChange("colors", e.target.value)
                      }
                      type="color"
                      className="invisible"
                      id="color"
                    />
                  </div>
                  {/* {current_component.name === "main_frame" &&
                    current_component.image && (
                      <div>
                        <button
                          className="p-[6px] bg-slate-700 text-white rounded-sm"
                          onClick={remove_background}
                        >
                          Remove background
                        </button>
                      </div>
                    )} */}

                  {current_component.name !== "main_frame" && (
                    <div className="flex gap-6 flex-col">
                      <div className="flex gap-1 justify-start items-start">
                        <span className="text-md w-[70px]">Opacity : </span>
                        <input
                          onChange={(e) =>
                            handlePropertyChange("Opacity", e.target.value)
                          }
                          className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                          type="number"
                          step={0.1}
                          min={0.1}
                          max={1}
                          value={opacity}
                        />
                      </div>
                      <div className="flex gap-1 justify-start items-start">
                        <span className="text-md w-[70px]">Z-Index : </span>
                        <input
                          onChange={(e) =>
                            handlePropertyChange("Zindex", e.target.value)
                          }
                          className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                          type="number"
                          step={1}
                          min={-5}
                          max={150}
                          value={zIndex}
                        />
                      </div>
                      {current_component.name === "shape" &&
                        current_component.type === "line" && (
                          <div className="flex gap-1 justify-start items-start">
                            <span className="text-md w-[70px]">
                              Line height:
                            </span>
                            <input
                              onChange={(e) =>
                                handlePropertyChange(
                                  "Lineheights",
                                  parseFloat(e.target.value)
                                )
                              }
                              className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              type="number"
                              min={1}
                              max={8}
                              step={1}
                              value={lineHeight}
                            />
                          </div>
                        )}
                      {current_component.name === "image" && (
                        <div className="flex gap-1 justify-start items-start">
                          <span className="text-md w-[70px]">Radius : </span>
                          <input
                            onChange={(e) =>
                              handlePropertyChange("Radius", e.target.value)
                            }
                            className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                            type="number"
                            step={1}
                            min={0}
                            max={100}
                            value={radius}
                          />
                        </div>
                      )}
                      {current_component.name === "text" && (
                        <>
                          <div className="flex gap-1 justify-start items-start">
                            <span className="text-md w-[70px]">Padding : </span>
                            <input
                              onChange={(e) =>
                                handlePropertyChange("Paddings", e.target.value)
                              }
                              className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              type="number"
                              step={1}
                              min={0}
                              max={150}
                              value={padding}
                            />
                          </div>
                          <div className="flex gap-1 justify-start items-start">
                            <span className="text-md w-[72px]">
                              Font size :
                            </span>
                            <input
                              onChange={(e) => {
                                handlePropertyChange(
                                  "fontSize",
                                  e.target.value
                                );
                                // setFont(parseInt(e.target.value))
                              }}
                              className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              type="number"
                              step={1}
                              min={5}
                              max={90}
                              value={font}
                            />
                          </div>
                          <div className="flex gap-1 justify-start items-start">
                            <span className="text-md w-[70px]">Weight : </span>
                            <input
                              onChange={(e) =>
                                handlePropertyChange("weights", e.target.value)
                              }
                              className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              type="number"
                              step={100}
                              min={100}
                              max={900}
                              value={weight}
                            />
                          </div>
                          <div className="flex gap-1 justify-start items-start">
                            <span className="text-md w-[70px]">Font: </span>
                            <select
                              onChange={(e) => {
                                handlePropertyChange(
                                  "fontFamilys",
                                  e.target.value
                                );
                                // setFontFamily(e.target.value);
                              }}
                              className="border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              value={fontFamily}
                            >
                              {fontFamilies.map((font) => (
                                <option key={font} value={font}>
                                  {font}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex gap-1 justify-start items-start">
                            <span className="text-md w-[70px]">Align: </span>
                            <select
                              onChange={(e) =>
                                handlePropertyChange(
                                  "textAligns",
                                  e.target.value as TextAlign
                                )
                              }
                              className="border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              value={textAlign}
                            >
                              <option value="left">Left</option>
                              <option value="center">Center</option>
                              <option value="right">Right</option>
                            </select>
                          </div>
                          {current_component.type !== "recipientName" && (
                            <div className="flex gap-2 flex-col justify-start items-start">
                              <input
                                onChange={(e) =>
                                  handlePropertyChange("titles", e.target.value)
                                }
                                className="border border-gray-700 bg-transparent outline-none p-2 rounded-md"
                                type="text"
                                value={title}
                              />
                              <div className="flex pl-5">
                                <button
                                  onClick={() => add_text("text", "title")}
                                  className="px-4 py-2 bg-purple-500 text-xs text-white rounded-sm  mr-4"
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
