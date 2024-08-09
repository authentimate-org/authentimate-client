import Konva from "konva";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Stage, Layer, Rect, Circle, Text, Image } from "react-konva";
import useImage from "use-image";

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
  padding?: number;
};
type CertificatePreviewProps = {
  design: DesignElement[];
};
const CertificatePreview = forwardRef<any, CertificatePreviewProps>(
  ({ design }, ref) => {
    const stageRef = useRef<Konva.Stage>(null);

    useImperativeHandle(ref, () => ({
      downloadImage: () => {
        if (stageRef.current) {
          const dataURL = stageRef.current.toDataURL({ pixelRatio: 3 });
          downloadURI(dataURL, "certificate.png");
        }
      },
    }));

    // Function to download the image
    const downloadURI = (uri: string, name: string) => {
      const link = document.createElement("a");
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    const bgcolors= design[0].color;
    const sortedDesign = [...design].sort((a, b) => a.z_index - b.z_index);
    
    return (
      <div style={{backgroundColor:bgcolors}}>
      <Stage ref={ref} width={600} height={450}>
        <Layer id="container" sty>
          {sortedDesign.map((element) => {
            switch (element.type) {
              case "rect":
                if (element.image) {
                  const [image] = useImage(element.image || "");
                  return (
                    <Image
                      key={element.id}
                      x={element.left || 0}
                      y={element.top || 0}
                      width={element.width || 0}
                      height={element.height || 0}
                      image={image}
                      
                      zIndex={element.z_index}
                      opacity={element.opacity || 1}
                      rotation={element.rotate || 0}
                    />
                  );
                } else {
                  return (
                    <Rect
                      key={element.id}
                      x={element.left || 0}
                      y={element.top || 0}
                      width={element.width || 0}
                      height={element.height || 0}
                      fill={element.color || "white"}
                      opacity={element.opacity || 1}
                      rotation={element.rotate || 0}
                    />
                  );
                }
              case "line":
                return (
                  <Rect
                    key={element.id}
                    x={element.left || 0}
                    y={element.top || 0}
                    width={element.width || 0}
                    height={element?.lineHeight || 0}
                    fill={element.color || "black"}
                    opacity={element.opacity || 1}
                    rotation={element.rotate || 0}
                  />
                );
              case "circle":
                return (
                  <Circle
                    key={element.id}
                    x={(element.left || 0) + (element.width || 0) / 2}
                    y={(element.top || 0) + (element.height || 0) / 2}
                    radius={
                      Math.min(element.width || 0, element.height || 0) / 2
                    }
                    fill={element.color || "black"}
                    opacity={element.opacity || 1}
                    rotation={element.rotate || 0}
                  />
                );
              case "title":
                return (
                   
                    
                  <Text
                    key={element.id}
                    x={element.left || 0}
                    y={element.top || 0}
                    text={element.title || ""}
                    fontSize={element.font || 12}
                    fill={element.color || "black"}
                    fontFamily={element.fontFamily || "Arial"}
                    fontStyle={element.weight?.toString() ?? "0"}
                    padding={element.padding || 0}
                    width={element.width}
                    zIndex={element.z_index}
                    opacity={element.opacity || 1}
                    rotation={element.rotate || 0}
                  />
                );
              case "recipientName":
                return (
                  <Text
                    key={element.id}
                    x={element.left || 0}
                    y={element.top || 0}
                    text={element.title || ""}
                    fontSize={element.font || 12}
                    fontWeight={element.weight || "normal"}
                    fill={element.color || "black"}
                    fontFamily={element.fontFamily || "Arial"}
                    padding={element.padding || 0}
                    width={element.width}
                    zIndex={element.z_index}
                    opacity={element.opacity || 1}
                    rotation={element.rotate || 0}
                  />
                );
              case "image":
                const [image] = useImage(element.image || "");
                return (
                  <Image
                    key={element.id}
                    x={element.left || 0}
                    y={element.top || 0}
                    width={element.width || 0}
                    height={element.height || 0}
                    image={image}
                    zIndex={element.z_index}
                    opacity={element.opacity || 1}
                    rotation={element.rotate || 0}
                  />
                );
              case "qrCode":
                const [qrCode] = useImage(element.image || "");
                return (
                  <Image
                    key={element.id}
                    x={element.left || 0}
                    y={element.top || 0}
                    width={element.width || 0}
                    height={element.height || 0}
                    image={qrCode}
                    zIndex={element.z_index}
                    opacity={element.opacity || 1}
                    rotation={element.rotate || 0}
                  />
                );
              default:
                return null;
            }
          })}
        </Layer>
      </Stage>
      </div>
    );
  }
);

export default CertificatePreview;
