import { Stage, Layer, Rect, Circle, Text, Image } from "react-konva";
import useImage from "use-image";

type DesignElement = {
  id: number;
  name: string;
  type: "rect" | "circle" | "title" | "image";
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  color?: string;
  image?: string;
  rotate?: number;
  z_index: number;
  opacity?: number;
  font?: number;
  title?: string;
  radius?:number;
  weight?: number;
  padding?: number;
};

const CertificatePreview = ({ design }: { design: DesignElement[] }) => {
  return (
    <Stage width={600} height={450} style={{scale:"0.8"}}>
      <Layer>
        {design.map((element) => {
          switch (element.type) {
            case "rect":
              return (
                <Rect
                  key={element.id}
                  x={element.left || 0}
                  y={element.top || 0}
                  width={element.width || 0}
                  height={element.height || 0}
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
                  radius={Math.min(element.width || 0, element.height || 0) / 2}
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
                  padding={element.padding || 0}
                  width={element.width }
                  zIndex= {element.z_index}
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
                  zIndex= {element.z_index}
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
};

export default CertificatePreview;
