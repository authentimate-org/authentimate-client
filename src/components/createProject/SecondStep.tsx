import React, { useState } from "react";
import { useFetchTemplatesQuery, useUpdateProjectTemplateMutation } from "../../api/project/projectApi";
import "./SecondStep.css";
import FullScreenLoader from "../ui/FullScreenLoader";

interface SecondStepProps {
  handleChange: (
    input: keyof UserInput
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  projectId: string;
  nextStep: (template: string) => void;
}

interface UserInput {
  projectName: string;
  TitleName: string;
  workspaceName: string;
  workspaceUrl: string;
  checkboxValue: string;
}

const SecondStep: React.FC<SecondStepProps> = ({ handleChange, projectId, nextStep }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const { data: templates, isLoading, isError } = useFetchTemplatesQuery();
  const [updateProjectTemplate] = useUpdateProjectTemplateMutation();

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const event = {
      target: { value: templateId },
    } as React.ChangeEvent<HTMLInputElement>;

    handleChange("checkboxValue")(event);
  };

  const handleNextStep = async () => {
    if (selectedTemplate) {
      console.log(projectId);
      await updateProjectTemplate({ projectId, premadeTemplateId: selectedTemplate });
      nextStep(selectedTemplate);
    } else {
      console.error("Template must be selected");
    }
  };

  if (isLoading) {
    return <div><FullScreenLoader/></div>;
  }

  if (isError || !templates) {
    return <div>Error loading templates</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((template) => (
          <label
            key={template._id}
            className={`relative template-card ${
              selectedTemplate === template._id
                ? "bg-green-100 border-green-400"
                : "bg-white border-gray-300"
            }`}
            onClick={() => handleTemplateSelect(template._id)}
          >
            <input
              type="radio"
              className="hidden"
              onChange={() => handleTemplateSelect(template._id)}
              checked={selectedTemplate === template._id}
            />
            <img
              src={template.templateImageURL}
              alt={`Template ${template._id}`}
            />
            
          </label>
        ))}
      </div>

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
