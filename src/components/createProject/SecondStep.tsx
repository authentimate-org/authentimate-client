import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setTemplate, setStage, ProjectStage } from "../../services/project/projectSlice";
import { useFetchTemplatesQuery, useUpdateProjectTemplateMutation } from "../../api/project/projectApi";

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
  const dispatch = useDispatch();
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
      console.log(projectId)
      await updateProjectTemplate({ projectId, premadeTemplateId: selectedTemplate });
      dispatch(setTemplate(selectedTemplate));
      dispatch(setStage(ProjectStage.TEMPLATE_SELECTED));
      nextStep(selectedTemplate);
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
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <div className="flex flex-col items-center">
              <img
                src={template.templateImageURL}
                alt={`Template ${template._id}`}
                className="h-32 w-32 object-cover"
              />
              <div className="mt-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Template {template._id}
                </h3>
                <p className="text-gray-600">{template.bgColor}</p>
              </div>
            </div>
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
