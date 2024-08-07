import React,{ forwardRef } from "react";
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
    const sortedDesign = [...design].sort((a, b) => a.z_index - b.z_index);
    return (
      <Stage ref={ref} width={600} height={450}>
        <Layer id="canvas_preview">
          {sortedDesign.map((element) => {
            switch (element.type) {
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
    );
  }
);

export default CertificatePreview;
