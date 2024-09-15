// import CertificatePreview from "./CertificatePreview";
// import  { useRef } from 'react';
// type TextAlign = "left" | "center" | "right";
// type DesignElement = {
//   id: number;
//   name: string;
//   type:
//     | "rect"
//     | "circle"
//     | "title"
//     | "image"
//     | "qrCode"
//     | "line"
//     | "recipientName";
//   left?: number;
//   top?: number;
//   width?: number;
//   height?: number;
//   color?: string;
//   image?: string;
//   rotate?: number;
//   z_index: number;
//   opacity?: number;
//   font?: number;
//   fontFamily?: string;
//   title?: string;
//   weight?: number;
//   radius?: number;
//   textAlign?: TextAlign;
//   padding?: number;
// };

// const design: DesignElement[] = [
//   {
//     id: 1720504096339,
//     name: "main_frame",
//     type: "rect",
//     z_index: 1,
//     width: 600,
//     height: 450,
//     color: "#fff",
//     image: "",
//   },
//   {
//     id: 1720504213637,
//     name: "image",
//     type: "image",
//     z_index: 1,
//     left: -6,
//     top: -8,
//     opacity: 1,
//     rotate: 0,
//     width: 628,
//     height: 562,
//     radius: 0,
//     image:
//       "http://res.cloudinary.com/duotwchdn/image/upload/v1720504210/uq39facd97h7teo2rkzc.svg",
//   },
//   {
//     id: 1720504475677,
//     name: "text",
//     type: "title",
//     z_index: 10,
//     left: 165,
//     top: 95,
//     opacity: 1,
//     rotate: 0,
//     padding: 0,
//     width: 400,
//     fontFamily: "Times New Roman",
//     height: 25,
//     font: 27,
//     title: "Certificate of Appreciation",
//     weight: 900,
//     color: "#343874",
//   },
//   {
//     id: 1720504603965,
//     name: "image",
//     type: "image",
//     z_index: 2,
//     left: 256,
//     top: 283,
//     opacity: 1,
//     rotate: 0,
//     width: 100,
//     height: 100,
//     radius: 0,
//     image:
//       "http://res.cloudinary.com/duotwchdn/image/upload/v1720504511/xgwqwth3mjlz7jeb2ue5.svg",
//   },
//   {
//     id: 1720504822229,
//     name: "text",
//     type: "title",
//     z_index: 10,
//     left: 465,
//     top: 331,
//     opacity: 1,
//     rotate: 0,
//     padding: 0,
//     font: 18, 
//     title: "Date",
//     fontFamily: "Times New Roman",
//     weight: 400,
//     color: "#3c3c3d",
//   },
//   {
//     id: 1720504822581,
//     name: "text",
//     type: "title",
//     z_index: 10,
//     left: 64,
//     top: 331,
//     opacity: 1,
//     rotate: 0,
//     padding: 0,
//     font: 18,
//     fontFamily: "Times New Roman",
//     title: "Signature",
//     weight: 400,
//     color: "#3c3c3d",
//   },
//   {
//     id: 1720504861181,
//     name: "text",
//     type: "title",
//     z_index: 10,
//     left: 85,
//     top: 200,
//     opacity: 1,
//     rotate: 0,
//     padding: 0,
//     fontFamily: "Courier New",
//     width: 450,
//     height: 50,
//     font: 13,
//     title:
//       "For outstanding performance and dedication demonstrated in: [Course/Project/Subject Name] Awarded on this day, [Date], in recognition of [specific accomplishment or general excellence] within the [Organization/Institution Name].",
//     weight: 300,
//     color: "#3c3c3d",
//   },
//   {
//     id: 1720504861517,
//     name: "text",
//     type: "title",
//     z_index: 10,
//     left: 220,
//     top: 132,
//     opacity: 1,
//     fontFamily: "Times New Roman",
//     rotate: 0,
//     padding: 0,
//     font: 15,
//     title: "This Certificate Presented To",
//     weight: 400,
//     color: "#3c3c3d",
//   },
//   {
//     id: 1720509222223,
//     name: "image",
//     type: "image",
//     z_index: 2,
//     left: 266,
//     top: 25,
//     opacity: 1,
//     rotate: 0,
//     width: 85,
//     height: 83,
//     image:
//       "http://res.cloudinary.com/duotwchdn/image/upload/v1720509221/wgmhq7nhzwj6ltvdu1mh.png",
//   },
//   {
//     id: 1721379814007,
//     name: "shape",
//     type: "line",
//     z_index: 2,
//     left: 442,
//     top: 320,
//     opacity: 1,
//     rotate: 0,
//     width: 80,
//     height: 1,
//     color: "#3c3c3d",
//   },
//   {
//     id: 1721379816151,
//     name: "shape",
//     type: "line",
//     z_index: 2,
//     left: 55,
//     top: 320,
//     opacity: 1,
//     rotate: 0,
//     width: 90,
//     height: 1,
//     color: "#3c3c3d",
//   },
//   {
//     id: 1721379816575,
//     name: "shape",
//     type: "line",
//     z_index: 2,
//     left: 235,
//     top: 180,
//     opacity: 1,
//     rotate: 0,
//     width: 149,
//     height: 2,
//     color: "#3c3c3d",
//   },
//   {
//     id: 1720508760958,
//     name: "text",
//     type: "recipientName",
//     z_index: 100,
//     left: 238,
//     top: 156,
//     opacity: 1,
//     rotate: 0,
//     padding: 0,
//     fontFamily: "Times New Roman",
//     font: 22,
//     title: "Recipient Name",
//     weight: 400,
//     color: "#464db4",
//   },
//   {
//     id: 1719478747786,
//     name: "image",
//     type: "qrCode",
//     z_index: 100,
//     left: 40,
//     top: 70,
//     opacity: 1,
//     rotate: 0,
//     width: 90,
//     height: 90,
//     image:
//       "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATdSURBVO3BQY4cSRIEQdNA/f/Lun1bPwWQSK8mOTAR/JGqJSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWiT14C8pvUTEA2qfkmIDdqJiC/Sc0bJ1WLTqoWnVQt+mSZmk1AbtRMQG7UbAIyqZmATGreULMJyKaTqkUnVYtOqhZ98mVAnlDzhpoJyARkUjMBmdRMQG6ATGpugExqngDyhJpvOqladFK16KRq0Sf/OCCTmieATGomIJuA/JedVC06qVp0UrXok/8YIE+omYDcqJmA1P+dVC06qVp0UrXoky9T85vU3AB5A8ikZgIyAZnUbFLzNzmpWnRSteikatEny4D8TYBMaiYgk5oJyKRmAjKpmYDcAJnU3AD5m51ULTqpWnRSteiTl9T8S4BsUvMEkEnNjZp/yUnVopOqRSdVi/BHXgAyqXkCyKRmAvKGmhsg36RmAjKpmYBsUnMDZFLzxknVopOqRSdViz75MiCTmknNjZoJyKRmAnID5EbNJiA3QCY1bwCZgPymk6pFJ1WLTqoW4Y8sAjKpuQGySc0EZFJzA+QJNROQSc0NkDfUvAFkUvPGSdWik6pFJ1WLPnkJyKRmAnKj5k8CcqNmAjIBmdQ8oWYC8k1AvumkatFJ1aKTqkWf/GFAJjUTkEnNBGRSM6m5UTMBuVHzBJBvAjKpeULNppOqRSdVi06qFuGP/CIgk5pNQG7U3AC5UTMBmdRMQJ5Q8wSQGzUTkBs1b5xULTqpWnRSteiTl4DcqLkB8oSaGzVvqHkDyKRmE5AbNROQSc0EZNNJ1aKTqkUnVYs+eUnNBORGzQTkRs0TQCY1E5AbNROQSc2kZgJyA2RSMwG5UfOEmgnIN51ULTqpWnRSteiTl4BMaiYgN2pugDyhZgIyqbkBcgPkRs0EZFLzBpBJzQRkUnOjZtNJ1aKTqkUnVYs++WVqJiA3ap4A8gSQSc03AblR8wSQSc0TQCY1b5xULTqpWnRStQh/5C8CZJOaCcikZgLyhJoJyKTmCSCTmgnIpGYCcqNmAjKpeeOkatFJ1aKTqkWffBmQGzWTmhsgN2omIG+omYBMQDapmYDcAJnU3AD5ppOqRSdVi06qFn3yEpAbNROQGyBPqLlRMwF5Q80mIJuATGomNROQTSdVi06qFp1ULcIf+YcBeULNBOQJNROQSc0NkBs1TwCZ1DwBZFLzxknVopOqRSdViz55CchvUvMGkBs1m4BMaiYgN0AmNTdAbtR800nVopOqRSdViz5ZpmYTkBs1E5An1NwAmdRMaiYgk5oJyBNqnlBzA+SbTqoWnVQtOqla9MmXAXlCzRNAJjVPAHkCyI2aCcikZgIyAXkDyKRmUjMB2XRSteikatFJ1aJP/nFqboBMap5Q8wSQGyCTmm8CMqmZ1Gw6qVp0UrXopGrRJ/8xQN5QMwG5UTOpmYDcAJnUTEAmNTdAboDcqHnjpGrRSdWik6pFn3yZmt+k5gbIJiCTmknNE0AmNROQSc2k5gbIN51ULTqpWnRSteiTZUB+E5AbNZOaCcgE5EbNn6RmAnKj5kbNppOqRSdVi06qFuGPVC05qVp0UrXopGrRSdWik6pFJ1WLTqoWnVQtOqladFK16KRq0UnVopOqRSdVi06qFv0PrBgwYIF5MxwAAAAASUVORK5CYII=",
//   },
// ];

const PreviewPage = () => {
  // const stageRef = useRef(null);
  return (
    <div>
      <h1>Preview Page</h1>
      {/* <CertificatePreview  ref={stageRef} design={design} /> */}
    </div>
  );
};
export default PreviewPage;
