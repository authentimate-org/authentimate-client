import { forwardRef, useImperativeHandle } from "react";
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

const rotateElement = () => null;
const resizeElement = () => null;
const setCurrentComponent = () => null;
const moveElement = () => null;
const removeComponent = () => null;
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
    useImperativeHandle(ref, () => ({
      downloadImage
    }));
    return (
      <div id="previews" className="relative certificate-preview">
        {design.map((c, i) => {
          const component = {
            ...c,
            id: c.id.toString(),
            rotateElement,
            resizeElement,
            setCurrentComponent,
            moveElement,
            removeComponent,
          };
          return (
            <div>
              <CreateComponent
                current_component={null}
                removeComponent={() => null}
                selectItem={""}
                setSelectItem={() => null}
                key={i}
                info={component}
              />
            </div>
          );
        })}
      </div>
    );
  }
);

export default CertificatePreview;
