// src/components/LastStep.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { setStage, ProjectStage } from "../../services/project/projectSlice";

interface LastStepProps {
  handleChange: (
    input: keyof UserInput
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
}

// Define UserInput type here or import it from a shared location
interface UserInput {
  projectName: string;
  TitleName: string;
  workspaceName: string;
  workspaceUrl: string;
  checkboxValue: string;
}

const LastStep: React.FC<LastStepProps> = ({ nextStep }) => {
  const dispatch = useDispatch();

  const handleCompletion = () => {
    dispatch(setStage(ProjectStage.ISSUED));
    nextStep();
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Successfully Project Created</h1>
      <button
        onClick={handleCompletion}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Finish
      </button>
    </div>
  );
};

export default LastStep;
