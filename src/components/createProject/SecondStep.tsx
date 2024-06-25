// src/components/SecondStep.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setTemplate, setStage, ProjectStage } from "../../services/project/projectSlice";
import { useFetchTemplatesQuery } from "../../api/project/projectApi";

interface SecondStepProps {
  handleChange: (
    input: keyof UserInput
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: (template: string) => void;
}

interface UserInput {
  projectName: string;
  TitleName: string;
  workspaceName: string;
  workspaceUrl: string;
  checkboxValue: string;
}

const SecondStep: React.FC<SecondStepProps> = (props) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const dispatch = useDispatch();
  const { data: templates, isLoading, isError } = useFetchTemplatesQuery();

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
    const event = {
      target: { value: template },
    } as React.ChangeEvent<HTMLInputElement>;

    props.handleChange("checkboxValue")(event);
  };

  const handleNextStep = () => {
    if (selectedTemplate) {
      dispatch(setTemplate(selectedTemplate));
      dispatch(setStage(ProjectStage.TEMPLATE_SELECTED));
      props.nextStep(selectedTemplate);
    } else {
      console.error("Template must be selected");
    }
  };

  if (isLoading) {
    return <div>Loading templates...</div>;
  }

  if (isError || !templates) {
    return <div>Error loading templates</div>;
  }

  return (
    <div className="space-y-4 max-w-sm mx-auto">
      {templates.map((template) => (
        <label
          key={template._id}
          className={`block p-4 border rounded-lg shadow-md cursor-pointer ${
            selectedTemplate === template._id
              ? "bg-green-100 border-green-400"
              : "bg-white border-gray-300"
          }`}
        >
          <input
            type="radio"
            className="hidden"
            onChange={() => handleTemplateSelect(template._id)}
            checked={selectedTemplate === template._id}
          />
          <div className="flex items-center">
            <div dangerouslySetInnerHTML={{ __html: template.svg }} className="h-12 w-12 text-gray-800" />
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {template.name}
              </h3>
              <p className="text-gray-600">{template.description}</p>
            </div>
          </div>
        </label>
      ))}

      <button
        onClick={handleNextStep}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 block mx-auto"
      >
        Next
      </button>
    </div>
  );
};

export default SecondStep;
