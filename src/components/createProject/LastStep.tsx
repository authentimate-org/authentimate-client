import React from "react";
interface LastStep {
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
const LastStep: React.FC<LastStep> = () => {
  return (
    <>
      <h1>SucessFully Poject Created</h1>
      {/* <button></button> */}
    </>
  );
};

export default LastStep;
