import React, { useState, ChangeEvent, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import LastStep from "./LastStep";
import MultiStepProgressBar from "./MultiStepProgressBar";
import { useLazyFetchProjectQuery } from "@/api/project/projectApi";
import FullScreenLoader from "../ui/FullScreenLoader";

interface UserInput {
  projectName: string;
  TitleName: string;
  workspaceName: string;
  workspaceUrl: string;
  checkboxValue: string;
}

const CreateProject: React.FC = () => {
  const { page, projectId } = useParams<{ page: string; projectId?: string }>();
  const navigate = useNavigate();
  const [fetchProject, { data: projectData, isLoading }] = useLazyFetchProjectQuery();

  const [currentPage, setCurrentPage] = useState<number>(parseInt(page || "0", 10));
  const [userInput, setUserInput] = useState<UserInput>({
    projectName: "",
    TitleName: "",
    workspaceName: "",
    workspaceUrl: "",
    checkboxValue: "",
  });

  useEffect(() => {
    if (projectId) {
      fetchProject({ projectId });
    }
  }, [projectId, fetchProject]);

  useEffect(() => {
    setCurrentPage(parseInt(page || "0", 10));
  }, [page]);

  const nextStep = async (idOrTemplate?: string) => {
    if(projectData){
      await fetchProject({projectId:projectData._id});
    }
    if (currentPage === 0 && idOrTemplate) {
      navigate(`/create-project/1/${idOrTemplate}`);
    } else if (currentPage === 1 && idOrTemplate) {
      navigate(`/create-project/2/${projectId}`);
    } else if (currentPage === 2) {
      navigate(`/create-project/3/${projectId}`);
    } else {
      // navigate(`/create-project/${targetPage}`);
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

  const handleChange = (input: keyof UserInput) => (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [input]: e.target.value });
  };

  if(isLoading)
  {
    <div>
      <FullScreenLoader/>
    </div>
  }

  const PageDisplay = () => {
    if (!isLoading) {
      switch (currentPage) {
        case 0:
          return <FirstStep nextStep={nextStep} handleChange={handleChange} />;
        case 1:
          return projectId ? (
            <SecondStep nextStep={nextStep} handleChange={handleChange} projectId={projectId}/>
          ) : (
            <Navigate to="/create-project" />
          );
        case 2:
          if (!projectData?.components) {
            navigate(`/create-project/1/${projectId}`);
            return null;
          }
          return <ThirdStep projectId={projectData?._id} nextStep={nextStep} handleChange={handleChange} />;
        case 3:
          return <LastStep/>;
        default:
          return null;
      }
    } else {
      return <div><FullScreenLoader/></div>;
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
            {currentPage === pageTitles.length - 1 ? `Congratulations, ${userInput.TitleName}` : pageTitles[currentPage]}
          </h1>
          <p className="text-gray-600">{currentPage < pageSubTitles.length ? pageSubTitles[currentPage] : ""}</p>
        </div>
        <div>{PageDisplay()}</div>
      </div>
    </div>
  );
};

export default CreateProject;
