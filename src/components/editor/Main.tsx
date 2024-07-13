// src/components/editor/Main.tsx
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
// import { BsGrid1X2, BsFillImageFill, BsFolder } from "react-icons/bs";
import { FaShapes, FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import { IoDuplicateOutline } from "react-icons/io5";
import { TfiText } from "react-icons/tfi";
import { MdKeyboardArrowLeft } from "react-icons/md";
// import { RxTransparencyGrid } from "react-icons/rx";
import TemplateDesign from "./main/TemplateDesign";
import CreateComponent from "./CreateComponent";
import { useFetchTemplateByIdQuery } from "@/api/project/projectApi";
// import { stringify } from "querystring";
import MyImages from "./Myimages";
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
  padding?: number;
  font?: number;
  weight?: number;
  title?: string;
  radius?: number;
  setCurrentComponent: (info: Component) => void;
  moveElement: (id: string, info: Component) => void;
  fontFamily?: string;
}

interface MainProps {
  projectId: string;
  template: string;
}

type Template = Component[];

const Main: React.FC<MainProps> = ({ projectId, template }) => {
  const [selectItem, setSelectItem] = useState<string>("");
  const { design_id } = useParams<{ design_id: string }>();
  const [state, setState] = useState<string>("");
  const [current_component, setCurrentComponent] = useState<Component | null>(
    null
  );
  const [color, setColor] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [rotate, setRotate] = useState<number>(0);
  const [left, setLeft] = useState<number | string>("");
  const [top, setTop] = useState<number | string>("");
  const [width, setWidth] = useState<number | string>("");
  const [height, setHeight] = useState<number | string>("");
  const [opacity, setOpacity] = useState<number | string>("");
  const [zIndex, setzIndex] = useState<number | string>("");
  const [fontFamily, setFontFamily] = useState<string>("");

  const fonteFamilies = [
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
  const [padding, setPadding] = useState<number | string>("");
  const [font, setFont] = useState<number | string>("");
  const [weight, setWeight] = useState<number | string>("");
  const [text, setText] = useState<string>("");
  const [radius, setRadius] = useState<number>(0);
  const handleClick = () => {
    setElements("text", "text");
    setShow({ name: "", status: true });
    add_text("text", "title");
  };
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
      setCurrentComponent: (a) => setCurrentComponent(a),
      rotateElement: function (id: string, info: Component): void {
        throw new Error("Function not implemented.");
      },
      resizeElement: function (elementId: string, info: Component): void {
        throw new Error("Function not implemented.");
      },
      moveElement: function (id: string, info: Component): void {
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

  const moveElement = (id: string, currentInfo: Component) => {
    setCurrentComponent(currentInfo);
    let isMoving = true;

    const currentDiv = document.getElementById(id);

    const mouseMove = ({ movementX, movementY }: MouseEvent) => {
      setSelectItem("");
      const getStyle = window.getComputedStyle(currentDiv!);
      const left = parseInt(getStyle.left);
      const top = parseInt(getStyle.top);
      if (isMoving) {
        currentDiv!.style.left = `${left + movementX}px`;
        currentDiv!.style.top = `${top + movementY}px`;
      }
    };

    const mouseUp = (e: MouseEvent) => {
      setSelectItem(currentInfo.id);
      isMoving = false;
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      setLeft(parseInt(currentDiv!.style.left));
      setTop(parseInt(currentDiv!.style.top));
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    currentDiv!.ondragstart = function () {
      return false;
    };
  };

  const resizeElement = (id: string, currentInfo: Component) => {
    setCurrentComponent(currentInfo);

    let isMoving = true;

    const currentDiv = document.getElementById(id);

    const mouseMove = ({ movementX, movementY }: MouseEvent) => {
      const getStyle = window.getComputedStyle(currentDiv!);
      const width = parseInt(getStyle.width);
      const height = parseInt(getStyle.height);
      if (isMoving) {
        currentDiv!.style.width = `${width + movementX}px`;
        currentDiv!.style.height = `${height + movementY}px`;
      }
    };

    const mouseUp = (e: MouseEvent) => {
      isMoving = false;
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      setWidth(parseInt(currentDiv!.style.width));
      setHeight(parseInt(currentDiv!.style.height));
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    currentDiv!.ondragstart = function () {
      return false;
    };
  };

  const rotateElement = (id: string, currentInfo: Component) => {
    setCurrentComponent(currentInfo);

    const target = document.getElementById(id);

    const mouseMove = ({ movementX, movementY }: MouseEvent) => {
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
    const mouseUp = (e: MouseEvent) => {
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
    setCurrentComponent(null);
    setComponents(temp);
  };

  const duplicate = (current: Component) => {
    if (current) {
      setComponents([...components, { ...current, id: Date.now().toString() }]);
    }
  };

  const remove_background = () => {
    const com = components.find((c) => c.id === current_component!.id);
    const temp = components.filter((c) => c.id !== current_component!.id);
    if (com) {
      com.image = "";
    }
    setImage("");
    setComponents([...temp, com!]);
  };

  const opacityHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpacity(parseFloat(e.target.value));
  };

  const createShape = (name: string, type: string) => {
    setCurrentComponent(null);
    const id = Date.now().toString();
    const style: Component = {
      id: id,
      name: name,
      type,
      left: 10,
      top: 10,
      opacity: 1,
      width: 200,
      height: 150,
      rotate,
      z_index: 2,
      color: "#3c3c3d",
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
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
      z_index: 10,
      padding: 6,
      font: 22,
      title: "Add text",
      weight: 400,
      color: "#3c3c3d",
      fontFamily: "Arial",
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
    };
    console.log(style);
    setWeight("");
    setFont("");
    setSelectItem(id); // Ensure selectItem is a string
    setCurrentComponent(style);
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
      image: img,
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
    };

    setSelectItem(id);
    setCurrentComponent(style);
    setComponents([...components, style]);
  };

  useEffect(() => {
    if (current_component) {
      const index = components.findIndex((c) => c.id === current_component.id);
      const temp = components.filter((c) => c.id !== current_component.id);

      if (current_component.name !== "text") {
        components[index].width =
          typeof width === "string"
            ? parseInt(width)
            : width || current_component.width;
        components[index].height =
          typeof height === "string"
            ? parseInt(height)
            : height || current_component.height;
        components[index].rotate = rotate || current_component.rotate;
      }
      if (current_component.name === "text") {
        components[index].font =
          typeof font === "string"
            ? parseInt(font)
            : font || current_component.font;
        components[index].padding =
          typeof padding === "string"
            ? parseInt(padding)
            : padding || current_component.padding;
        components[index].weight =
          typeof weight === "string"
            ? parseInt(weight)
            : weight || current_component.weight;
        components[index].fontFamily =
          typeof fontFamily === "string"
            ? fontFamily
            : fontFamily || current_component.fontFamily;
        components[index].title = text || current_component.title;
      }
      if (current_component.name === "image") {
        components[index].radius = radius || current_component.radius;
      }

      if (current_component.name === "main_frame" && image) {
        components[index].image = image || current_component.image;
      }
      components[index].color = color || current_component.color;

      if (current_component.name !== "main_frame") {
        components[index].left =
          typeof left === "string"
            ? parseInt(left)
            : left || current_component.left;
        components[index].top =
          typeof top === "string"
            ? parseInt(top)
            : top || current_component.top;
        components[index].opacity =
          typeof opacity === "string"
            ? parseFloat(opacity)
            : opacity || current_component.opacity;
        components[index].z_index =
          typeof zIndex === "string"
            ? parseInt(zIndex)
            : zIndex || current_component.z_index;
        components[index].fontFamily =
          typeof fontFamily === "string"
            ? fontFamily
            : fontFamily || current_component.fontFamily;
      }
      setComponents([...components]);

      setColor("");
      setWidth("");
      setHeight("");
      setTop("");
      setLeft("");
      setRotate(0);
      setOpacity("");
      setPadding(0);
      setzIndex("");
      setText("");
    }
  }, [
    color,
    image,
    left,
    top,
    width,
    height,
    opacity,
    zIndex,
    padding,
    fontFamily,
    font,
    weight,
    text,
    radius,
    rotate,
  ]);

  const {
    data: templateData,
    isLoading,
    isError,
  } = useFetchTemplateByIdQuery(template);

  // useEffect(() => {
  //   if (templateData && templateData.components) {
  //     const design = templateData.components.flatMap((array:any) =>
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
    if (templateData && templateData.components) {
      const design = templateData.components.map((element: any) => ({
        ...element,
        setCurrentComponent: (a: any) => setCurrentComponent(a),
        moveElement: moveElement,
        resizeElement: resizeElement,
        rotateElement: rotateElement,
      }));

      console.log(design);
      setComponents(design);
    } else {
      console.error(
        "Template data is undefined or does not contain graphicElements"
      );
    }
  }, [templateData]);

  if (isLoading) {
    return <div>Loading template...</div>;
  }

  if (isError || !templateData?.components) {
    return <div>Error loading template</div>;
  }

  return (
    <div className="min-w-screen h-screen bg-black">
      <Header components={components} design_id={design_id || ""} />
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
            } bg-[#6e7484] h-[92%] absolute transition-all w-[350px] z-30 duration-700`}
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
              <div className="m-w-[650px] m-h-[480px] flex justify-center items-center overflow-hidden">
                <div
                  id="main_design"
                  className="w-auto relative h-auto overflow-hidden select-none"
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
                  {current_component.name !== "main_frame" && (
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
                          current_component.color &&
                          current_component.color !== "#fff"
                            ? current_component.color
                            : "gray"
                        }`,
                      }}
                      htmlFor="color"
                    ></label>
                    <input
                      onChange={(e) => setColor(e.target.value)}
                      type="color"
                      className="invisible"
                      id="color"
                    />
                  </div>
                  {current_component.name === "main_frame" &&
                    current_component.image && (
                      <div>
                        <button
                          className="p-[6px] bg-slate-700 text-white rounded-sm"
                          onClick={remove_background}
                        >
                          Remove background
                        </button>
                      </div>
                    )}

                  {current_component.name !== "main_frame" && (
                    <div className="flex gap-6 flex-col">
                      <div className="flex gap-1 justify-start items-start">
                        <span className="text-md w-[70px]">Opacity : </span>
                        <input
                          onChange={opacityHandle}
                          className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                          type="number"
                          step={0.1}
                          min={0.1}
                          max={1}
                          value={current_component.opacity}
                        />
                      </div>
                      <div className="flex gap-1 justify-start items-start">
                        <span className="text-md w-[70px]">Z-Index : </span>
                        <input
                          onChange={(e) => setzIndex(parseInt(e.target.value))}
                          className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                          type="number"
                          step={1}
                          value={current_component.z_index}
                        />
                      </div>
                      {current_component.name === "image" && (
                        <div className="flex gap-1 justify-start items-start">
                          <span className="text-md w-[70px]">Radius : </span>
                          <input
                            onChange={(e) =>
                              setRadius(parseInt(e.target.value))
                            }
                            className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                            type="number"
                            step={1}
                            value={current_component.radius}
                          />
                        </div>
                      )}
                      {current_component.name === "text" && (
                        <>
                          <div className="flex gap-1 justify-start items-start">
                            <span className="text-md w-[70px]">Padding : </span>
                            <input
                              onChange={(e) =>
                                setPadding(parseInt(e.target.value))
                              }
                              className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              type="number"
                              step={1}
                              value={current_component.padding}
                            />
                          </div>
                          <div className="flex gap-1 justify-start items-start">
                            <span className="text-md w-[72px]">
                              Font size :{" "}
                            </span>
                            <input
                              onChange={(e) =>
                                setFont(parseInt(e.target.value))
                              }
                              className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              type="number"
                              step={1}
                              value={current_component.font}
                            />
                          </div>
                          <div className="flex gap-1 justify-start items-start">
                            <span className="text-md w-[70px]">Weight : </span>
                            <input
                              onChange={(e) =>
                                setWeight(parseInt(e.target.value))
                              }
                              className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              type="number"
                              step={100}
                              min={100}
                              max={900}
                              value={current_component.weight}
                            />
                          </div>
                          <div className="flex gap-1 justify-start items-start">
                            <span className="text-md w-[70px]">Font: </span>
                            <select
                              onChange={(e) => setFontFamily(e.target.value)}
                              className="border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              value={current_component.fontFamily}
                            >
                              {fonteFamilies.map((font) => (
                                <option key={font} value={font}>
                                  {font}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="flex gap-2 flex-col justify-start items-start">
                            <input
                              onChange={(e) =>
                                setCurrentComponent({
                                  ...current_component,
                                  title: e.target.value,
                                })
                              }
                              className="border border-gray-700 bg-transparent outline-none p-2 rounded-md"
                              type="text"
                              value={current_component.title}
                            />
                            <div className="flex pl-5">
                              <button
                                onClick={() => add_text("text", "title")}
                                className="px-4 py-2 bg-purple-500 text-xs text-white rounded-sm  mr-4"
                              >
                                Add
                              </button>
                              <button
                                onClick={() =>
                                  setText(current_component.title || "")
                                }
                                className="px-4 py-2 bg-purple-500 text-xs text-white rounded-sm"
                              >
                                Update
                              </button>
                            </div>
                          </div>
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
