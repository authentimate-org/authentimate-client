import React from "react";
import { useDispatch } from "react-redux";
import { setStage, ProjectStage } from "../../services/project/projectSlice";
// import { useFetchTemplateByIdQuery } from '../../api/project/projectApi';
import Main from "../editor/Main";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useFinalizeTemplateMutation } from "@/api/project/projectApi";

interface ThirdStepProps {
  projectId: string;
  // templateData:Temzz;
  nextStep: () => void;
  handleChange: (
    input: keyof UserInput
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface UserInput {
  projectName: string;
  TitleName: string;
  workspaceName: string;
  workspaceUrl: string;
  checkboxValue: string;
}

const ThirdStep: React.FC<ThirdStepProps> = ({ projectId, nextStep }) => {
  const dispatch = useDispatch();
  const [finalizeTemplate] = useFinalizeTemplateMutation();

  const templateData = useSelector(
    (state: RootState) => state.project.components
  );
  // const { data: templateData, isLoading, isError } = useFetchTemplateByIdQuery(projectId);

  if (!projectId || !templateData) {
    console.log(projectId);
    console.log(templateData);
    // return <Navigate to={`/create-project/1/${projectId}`}/>;
  }

  const handleNextStep = () => {
    if (projectId) {
      finalizeTemplate(projectId);
      dispatch(setStage(ProjectStage.TEMPLATE_FINALISED));
    }
    nextStep();
  };

  // if (isLoading) {
  //   return <div>Loading template...</div>;
  // }

  // if (isError || !templateData) {
  //   return <div>Error loading template</div>;
  // }

  return (
    <>
      <div className="max-w-4xl mx-auto">
        {/*   */}
        {/* <h3 className="text-xl mb-4">Selected Template: {template}</h3> */}
        {/* <button
          onClick={handleNextStep}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Next
        </button> */}
      </div>
      <Main
        projectId={projectId}
        templateData={templateData}
        showNextButton={true}
        onNextClick={handleNextStep}
      />
    </>
  );
};

export default ThirdStep;
