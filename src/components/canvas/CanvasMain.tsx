import React from "react";
import Toolbar from "./Toolbar";
import WorkSpace from "./WorkSpace";

interface CanvasMainProps {
  projectId: string;
  template: any;
}

const CanvasMain: React.FC<CanvasMainProps> = ({ projectId, template }) => {
  // Render the template content
  function renderTemplate(): React.ReactNode {
    // Check if the template has elements to render
    if (template && template.elements && template.elements.length > 0) {
      return (
        <div>
          {/* Example rendering logic for template elements */}
          {template.elements.map((element: any) => (
            <div key={element.id} className="template-element">
              <p>{element.content}</p>
              {/* Add more rendering logic based on your element structure */}
            </div>
          ))}
        </div>
      );
    } else {
      return <p>No elements to display in this template.</p>;
    }
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
