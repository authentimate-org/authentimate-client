import { forwardRef } from "react";
import CreateComponent from "./CreateComponent";
import "../../App.css"

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

const rotateElement=()=>null
const resizeElement=()=>null;
const setCurrentComponent=()=>null;
const moveElement=()=>null;
const removeComponent=()=>null;

const CertificatePreview = forwardRef<any, CertificatePreviewProps>(
  ({ design }, ref) => {
    return (

        <div className="relative certificate-preview" >
        {design.map((c, i) => {
            const component={...c,id:c.id.toString(),rotateElement, resizeElement, setCurrentComponent, moveElement, removeComponent}
            return(
                <CreateComponent
                current_component={null}
                removeComponent={()=>null}
                selectItem={''}
                setSelectItem={()=>null}
                key={i}
                info={component}
                />
             )
        })}
          </div>
    );
  }
);

export default CertificatePreview;
