import React, { useState, ChangeEvent, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const { page, projectId, templateId } = useParams<{ page: string, projectId?: string, templateId?: string }>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(parseInt(page || "0", 10));
  const [currentProjectId, setCurrentProjectId] = useState<string>(projectId || "");
  const [currentTemplateId, setCurrentTemplateId] = useState<string>(templateId || "");
  const [userInput, setUserInput] = useState<UserInput>({
    projectName: "",
    TitleName: "",
    workspaceName: "",
    workspaceUrl: "",
    checkboxValue: "",
  });
  const [templateSelected, setTemplateSelected] = useState<boolean>(false);

  useEffect(() => {
    setCurrentPage(parseInt(page || "0", 10));
  }, [page]);

  const nextStep = (idOrTemplate?: string) => {
    if (currentPage === 0 && idOrTemplate) {
      setCurrentProjectId(idOrTemplate);
      navigate(`/create-project/1/${idOrTemplate}`);
    } else if (currentPage === 1 && idOrTemplate) {
      setCurrentTemplateId(idOrTemplate);
      setTemplateSelected(true);
      navigate(`/create-project/2/${currentProjectId}/${idOrTemplate}`);
    } else {
      navigate(`/create-project/${currentPage + 1}/${currentProjectId}/${currentTemplateId}`);
    }
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
    switch (currentPage) {
      case 0:
        return <FirstStep nextStep={nextStep} handleChange={handleChange} />;
      case 1 :
        return projectId && <SecondStep nextStep={nextStep} handleChange={handleChange} projectId={projectId}  />;
      case 2:
        if (!currentTemplateId) {
          navigate(`/create-project/1/${currentProjectId}`);
          return null;
        }
        return (
          <ThirdStep
            projectId={currentProjectId}
            template={currentTemplateId}
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
        <MultiStepProgressBar step={currentPage} />
      </div>
      <div className="w-full p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">
            {currentPage === pageTitles.length - 1
              ? `Congratulations, ${userInput.TitleName}`
              : pageTitles[currentPage]}
          </h1>
          <p className="text-gray-600">
            {currentPage < pageSubTitles.length ? pageSubTitles[currentPage] : ""}
          </p>
        </div>
        <div>{PageDisplay()}</div>
      </div>
    </div>
  );
};

export default CreateProject;