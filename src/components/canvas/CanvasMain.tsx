import React from "react";
import Toolbar from "./Toolbar";
import WorkSpace from "./WorkSpace";

interface CanvasMainProps {
  projectId: string;
  template: any; 
}

const CanvasMain: React.FC<CanvasMainProps> = ({ projectId, template }) => {

  function renderTemplate(): React.ReactNode {
    // Implement the rendering logic for the template here
    return (
      <div>
        {/* Example rendering logic */}
        <h3>{template.name}</h3>
        <div>
          {template.elements && template.elements.map((element: any) => (
            <div key={element.id}>
              <p>{element.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border p-4 rounded-lg">
      <h4 className="text-lg font-bold">Canvas Main</h4>
      <h1>Canvas for Project ID: {projectId}</h1>
      <h2>Using Template: {template.name}</h2>
      <div className="flex h-fit">
        <Toolbar />
        <WorkSpace>{renderTemplate()}</WorkSpace>
      </div>
    </div>
  );
};

export default CanvasMain;
