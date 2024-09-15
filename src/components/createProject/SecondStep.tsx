import React, { useState } from "react";
import {
  useFetchTemplatesQuery,
  useUpdateProjectTemplateMutation,
} from "../../api/project/projectApi";
import "./SecondStep.css";
import FullScreenLoader from "../ui/FullScreenLoader";
import { Loader } from "lucide-react";

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

const SecondStep: React.FC<SecondStepProps> = ({
  handleChange,
  projectId,
  nextStep,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);
  const { data: templates, isLoading, isError } = useFetchTemplatesQuery();
  const [updateProjectTemplate] = useUpdateProjectTemplateMutation();

  const handleTemplateSelect = async (templateId: string) => {
    setSelectedTemplate(templateId);
    setIsLoadingPage(true); // Set loading page to true when button is clicked

    const event = {
      target: { value: templateId },
    } as React.ChangeEvent<HTMLInputElement>;
    handleChange("checkboxValue")(event);

    await updateProjectTemplate({ projectId, premadeTemplateId: templateId });
    nextStep(templateId);
    setIsLoadingPage(false); // Set loading page to false after navigating to the next step
  };

  if (isLoading) {
    return (
      <div>
        <FullScreenLoader/>
      </div>
    );
  }

  if (isError || !templates) {
    return <div>Error loading templates</div>;
  }

  return (
    <div className="relative max-w-screen-lg mx-auto p-4">
      {isLoadingPage && <FullScreenLoader />} {/* Render full-screen loader if loading page */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((template) => (
          <div
            key={template._id}
            className={`relative template-card ${
              selectedTemplate === template._id
                ? "bg-green-100 border-green-400"
                : "bg-white border-gray-300"
            }`}
          >
            <img
              src={template.templateImageURL}
              alt={`Template ${template._id}`}
            />
            <div className="overlay">
              <button
                type="button"
                className="use-button"
                onClick={() => handleTemplateSelect(template._id)}
                disabled={isLoadingPage} // Disable button while loading
              >
                {isLoadingPage && selectedTemplate === template._id ? (
                  <Loader/> // Optional: Show an icon loader if needed
                ) : (
                  "Use This"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecondStep;
