// src/components/LastStep.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { setStage, ProjectStage } from "../../services/project/projectSlice";
import { Recipients } from "./Recipients/recipients";

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
      <Recipients/>
    </div>
  );
};

export default LastStep;
