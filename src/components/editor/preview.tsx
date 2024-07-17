import CertificatePreview from "./CertificatePreview";
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
  weight?: number;
  radius?: number;
  padding?: number;
};

const design: DesignElement[] = [
  {
    name: "main_frame",
    type: "rect",
    id: 1720504096339,
    height: 450,
    width: 600,
    z_index: 1,
    color: "#fff",
    image: "",
  },
  {
    id: 1720504213637,
    name: "image",
    type: "image",
    left: -6,
    top: -8,
    opacity: 1,
    width: 628,
    height: 562,
    rotate: 0,
    z_index: 2,
    radius: 0,
    image:
      "http://res.cloudinary.com/duotwchdn/image/upload/v1720504210/uq39facd97h7teo2rkzc.svg",
  },
  {
    id: 1720504475677,
    name: "text",
    type: "title",
    left: 146,
    top: 83,
    opacity: 1,
    rotate: 0,
    z_index: 1000,
    padding: 21,
    font: 23,
    title: "Certificate of Appreciation",
    weight: 700,
    color: "#343874",
  },
  {
    id: 1720504603965,
    name: "image",
    type: "image",
    left: 236,
    top: 283,
    opacity: 1,
    width: 120,
    height: 75,
    rotate: 0,
    z_index: 2,
    radius: 0,
    image:
      "http://res.cloudinary.com/duotwchdn/image/upload/v1720504511/xgwqwth3mjlz7jeb2ue5.svg",
  },
  {
    id: 1720504822229,
    name: "text",
    type: "title",
    left: 443,
    top: 311,
    opacity: 1,
    rotate: 0,
    z_index: 10,
    padding: 21,
    font: 18,
    title: "Date",
    weight: 400,
    color: "#3c3c3d",
  },
  {
    id: 1720504822581,
    name: "text",
    type: "title",
    left: 58,
    top: 311,
    opacity: 1,
    rotate: 0,
    z_index: 10,
    padding: 21,
    font: 18,
    title: "Signature",
    weight: 400,
    color: "#3c3c3d",
  },
  {
    id: 1720504861181,
    name: "text",
    type: "title",
    left: 30,
    top: 182,
    opacity: 1,
    rotate: 0,
    z_index: 10,
    padding: 31,
    font: 13,
    width: 550,
    title:
      "For outstanding performance and dedication demonstrated in: [Course/Project/Subject Name] Awarded on this day, [Date], in recognition of [specific accomplishment or general excellence] within the [Organization/Institution Name].",
    weight: 300,
    color: "#3c3c3d",
  },
  {
    id: 1720504861517,
    name: "text",
    type: "title",
    left: 186,
    top: 103,
    opacity: 1,
    rotate: 0,
    z_index: 10,
    padding: 31,
    font: 15,
    title: "This Certificate Presented To",
    weight: 400,
    color: "#3c3c3d",
  },

  {
    id: 1720508760958,
    name: "text",
    type: "title",
    left: 202,
    top: 136,
    opacity: 1,
    rotate: 0,
    z_index: 10,
    padding: 31,
    font: 22,
    title: "Name Surname",
    weight: 400,
    color: "#464db4",
  },
  {
    id: 1720508962734,
    name: "shape",
    type: "rect",
    left: 435,
    top: 330,
    opacity: 1,
    width: 96,
    height: 1,
    rotate: 0,
    z_index: 2,
    color: "#3c3c3d",
  },
  {
    id: 1720508981191,
    name: "shape",
    type: "rect",
    left: 70,
    top: 330,
    opacity: 1,
    width: 93,
    height: 1,
    rotate: 0,
    z_index: 2,
    color: "#3c3c3d",
  },
  {
    id: 1720509222223,
    name: "image",
    type: "image",
    left: 266,
    top: 38,
    opacity: 1,
    width: 85,
    height: 83,
    rotate: 0,
    z_index: 1,
    radius: 0,
    image:
      "http://res.cloudinary.com/duotwchdn/image/upload/v1720509221/wgmhq7nhzwj6ltvdu1mh.png",
  },
    {
        "id": 1720509310263,
        "name": "shape",
        "type": "rect",
        "left": 222,
        "top": 190,
        "opacity": 1,
        "width": 169,
        "height": 2,
        "rotate": 0,
        "z_index": 2,
        "color": "#3c3c3d"
    }
];

const PreviewPage = () => {
  return (
    <div>
      <h1>Preview Page</h1>
      <CertificatePreview design={design} />
    </div>
  );
};
export default PreviewPage;
