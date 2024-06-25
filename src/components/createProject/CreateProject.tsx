import React, { useState, ChangeEvent } from "react";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import LastStep from "./LastStep";
import MultiStepProgressBar from "./MultiStepProgressBar";

interface UserInput {
  projectName: string;
  TitleName: string;
  workspaceName: string;
  workspaceUrl: string;
  checkboxValue: string;
}

const CreateProject: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [projectId, setProjectId] = useState<string>("");
  const [template, setTemplate] = useState<string>("");
  const [userInput, setUserInput] = useState<UserInput>({
    projectName: "",
    TitleName: "",
    workspaceName: "",
    workspaceUrl: "",
    checkboxValue: "",
  });
  const [templateSelected, setTemplateSelected] = useState<boolean>(false);

  const nextStep = (idOrTemplate?: string) => {
    if (page === 0 && idOrTemplate) {
      setProjectId(idOrTemplate);
    } else if (page === 1 && idOrTemplate) {
      setTemplate(idOrTemplate);
      setTemplateSelected(true);
    }
    setPage((currPage) => currPage + 1);
  };

  const pageTitles = [
    "Welcome! First things first...",
    "Let's set up a home for all your work",
    "How are you planning to use AuthentiMate?",
    "You have completed onboarding, you can start",
  ];
  const pageSubTitles = [
    "You can always change them later.",
    "You can always create another workspace later",
    "We'll streamline your setup experience accordingly.",
  ];

  const handleChange =
    (input: keyof UserInput) => (e: ChangeEvent<HTMLInputElement>) => {
      setUserInput({ ...userInput, [input]: e.target.value });
    };

  const PageDisplay = () => {
    switch (page) {
      case 0:
        return <FirstStep nextStep={nextStep} handleChange={handleChange} />;
      case 1:
        return <SecondStep nextStep={nextStep} handleChange={handleChange} />;
      case 2:
        if (!templateSelected) {
          setPage(1);
          return null;
        }
        return (
          <ThirdStep
            projectId={projectId}
            template={template}
            nextStep={nextStep}
            handleChange={handleChange}
          />
        );
      case 3:
        return <LastStep nextStep={nextStep} handleChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center App mt-16">
      <div className="w-3/4 md:w-1/2 lg:w-1/3">
        <MultiStepProgressBar step={page} />
      </div>
      <div className="w-full p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">
            {page === pageTitles.length - 1
              ? `Congratulations, ${userInput.TitleName}`
              : pageTitles[page]}
          </h1>
          <p className="text-gray-600">
            {page < pageSubTitles.length ? pageSubTitles[page] : ""}
          </p>
        </div>
        <div>{PageDisplay()}</div>
      </div>
    </div>
  );
};

export default CreateProject;
