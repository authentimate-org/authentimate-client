import { FetchAllProjectsResponse } from "@/api/issuer/issuerApi";
import { ProjectStage } from "@/services/project/projectSlice";
import { useNavigate } from "react-router-dom";

const IncompleteProjects = ({ data }: { data: FetchAllProjectsResponse[] }) => {
  const navigate = useNavigate();

  const handleOpenProject = (id: string, stage: string) => {
    switch (stage) {
      case ProjectStage.PROJECT_CREATED:
        navigate(`/create-project/1/${id}`);
        break;
      case ProjectStage.TEMPLATE_SELECTED:
        navigate(`/create-project/2/${id}`);
        break;
      case ProjectStage.TEMPLATE_FINALISED:
        navigate(`/create-project/3/${id}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="m-8">
      <h2 className="text-2xl font-semibold">Incomplete Projects</h2>
      <div className="flex justify-left items-center gap-5 flex-wrap">
        {data.map((project) => (
          <div
            key={project._id}
            className="bg-white rounded-3xl shadow-lg w-[263px] h-[190px] flex items-center justify-center cursor-pointer"
            onClick={() => handleOpenProject(project._id, project.stage)}
          >
            <div className="inline-flex flex-col items-center justify-center">
              <div className="mt-2 text-lg font-medium">{project.projectName}</div>
              <div className="mt-2 text-xs font-medium">{project._id}</div>
              <div className="mt-2 text-xs font-medium">{project.stage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncompleteProjects;
