import { forwardRef, useImperativeHandle, useRef } from "react";
import CreateComponent from "./CreateComponent";
import "../../App.css";
import * as htmlToImage from "html-to-image";

type TextAlign = "left" | "center" | "right";
type DesignElement = {
  id: number;
  name: string;
  type:
    | "rect"
    | "circle"
    | "title"
    | "image"
    | "qrCode"
    | "line"
    | "recipientName";
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  color?: string;
  image?: string;
  rotate?: number;
  z_index: number;
  opacity?: number;
  fontFamily?: string;
  lineHeight?: number;
  font?: number;
  title?: string;
  weight?: number;
  radius?: number;
  textAlign?: TextAlign;
  padding?: number;
};
type CertificatePreviewProps = {
  design: DesignElement[];
};

// const rotateElement = () => null;
// const resizeElement = () => null;
// const setCurrentComponent = () => null;
// const moveElement = () => null;
// const removeComponent = () => null;
const processDesignArray = (design: DesignElement[]): DesignElement[] => {
  return design.map((element) => {
    if (element.name === "text" && element.type === "recipientName") {
      return {
        ...element,
        width: 600,
        left: 0,
        textAlign: "center" as TextAlign,
      };
    }
    return element;
  });
};
const downloadImage = async () => {
  const getDiv = document.getElementById("previews");
  if (getDiv) {
    const dataUrl = await htmlToImage.toPng(getDiv, {
      style: {
        transform: "scale(1)",
      },
    });

    const link = document.createElement("a");
    link.download = "image";
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
const CertificatePreview = forwardRef<any, CertificatePreviewProps>(
  ({ design }, ref) => {
    const previewRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => ({
      downloadImage,
    }));
    const processedDesign = processDesignArray(design);
    // useEffect(() => {
    //   // Get the canvas width once the component is mounted
    //   const canvasWidth = previewRef.current?.clientWidth || 0; // Update the design elements that are of type "recipientName"
    //   const updatedDesign = design.map((component) => {
    //     if (component.type === "recipientName") {
    //       return {
    //         ...component,
    //         width: canvasWidth,
    //         textAlign: "center" as TextAlign,
    //         left: 0, // Align to the left edge of the canvas
    //       };
    //     }
    //     return component;
    //   });

    //   // You might need to update your state here if you're managing the design in state
    //   // setDesign(updatedDesign);
    // }, [design]);
    return (
      <div
        id="previews"
        ref={previewRef}
        className="relative certificate-preview"
      >
        {processedDesign.map((c, i) => {
          const component = {
            ...c,
            id: c.id.toString(),
            rotateElement: () => null,
            resizeElement: () => null,
            setCurrentComponent: () => null,
            moveElement: () => null,
            removeComponent: () => null,
          };
          return (
            <CreateComponent
              key={i}
              current_component={null}
              removeComponent={() => null}
              selectItem={""}
              setSelectItem={() => null}
              info={component}
            />
          );
        })}
      </div>
    );
  }
);

export default CertificatePreview;
