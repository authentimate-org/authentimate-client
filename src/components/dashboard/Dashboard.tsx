import { useFetchAllProjectsQuery } from "@/api/issuer/issuerApi";
import { Analytics } from "./Analytics";
import Create from "./Create";
import { ProjectStage } from "@/services/project/projectSlice";
import ProjectsList from "./ProjectsList";

const Dashboard = () => {
  const { data: projects} = useFetchAllProjectsQuery();
  const incompleteProjects = projects?.filter(
    (project) => project.stage !== ProjectStage.ISSUED
  );
  const completedProjects = projects?.filter(
    (project) => project.stage === ProjectStage.ISSUED
  );
  return (
    <div>
      <Analytics />
      <Create />
      <div className="p-5">
      {incompleteProjects?.length && (
        <>
          <h2 className="text-xl font-bold mb-5">Incomplete Projects</h2>
          <ProjectsList data={incompleteProjects} />
        </>
      )}
      {completedProjects?.length && (
        <>
          <h2 className="text-xl font-bold">Completed Projects</h2>
          <ProjectsList data={completedProjects} />
        </>
      )}
      </div>
    </div>
  );
};
export default Dashboard;
