import React from "react";
import Toolbar from "./Toolbar";
import WorkSpace from "./WorkSpace";
interface CanvasMainProps {
  projectId: string;
  template: string;
}

const Template1SVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className="h-12 w-12 text-gray-800"
  >
    <circle cx="50" cy="50" r="40" fill="#34D399" />
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fill="white"
      fontSize="20"
    >
      Template 1
    </text>
  </svg>
);

const Template2SVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className="h-48 w-48"
  >
    <rect x="0" y="0" width="100" height="100" fill="#6366F1" />
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fill="white"
      fontSize="20"
    >
      Template 2
    </text>
  </svg>
);

const CanvasMain: React.FC<CanvasMainProps> = ({ projectId, template }) => {
  const renderTemplate = () => {
    switch (template) {
      case "Template1":
        return <Template1SVG />;
      case "Template2":
        return <Template2SVG />;
      default:
        return <p>Invalid template selected</p>;
    }
  };

  return (
    <div className="border p-4 rounded-lg">
      <h4 className="text-lg font-bold">Canvas Main</h4>
      <h1>Canvas for Project ID: {projectId}</h1>
      <h2>Using Template: {template}</h2>
      <div className="flex h-fit">
        <Toolbar />
        <WorkSpace>{renderTemplate()}</WorkSpace>
      </div>
    </div>
  );
};

export default CanvasMain;
