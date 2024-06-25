// src/components/ThirdStep.tsx
import React from "react";
import CanvasMain from "../canvas/CanvasMain";
import { useDispatch } from "react-redux";
import { setStage, ProjectStage } from "../../services/project/projectSlice";

interface ThirdStepProps {
  projectId: string;
  template: string;
  nextStep: () => void;
  handleChange: (input: keyof UserInput) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}
interface UserInput {
  projectName: string;
  TitleName: string;
  workspaceName: string;
  workspaceUrl: string;
  checkboxValue: string;
}

const ThirdStep: React.FC<ThirdStepProps> = ({ projectId, template, nextStep }) => {
  const dispatch = useDispatch();

  const handleNextStep = () => {
    dispatch(setStage(ProjectStage.TEMPLATE_FINALISED));
    nextStep();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Project ID: {projectId}</h2>
      <h3 className="text-xl mb-4">Selected Template: {template}</h3>
      <CanvasMain projectId={projectId} template={template} />
      <button
        onClick={handleNextStep}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Next
      </button>
    </div>
  );
};

export default ThirdStep;
