import { useFetchAllProjectsQuery } from "@/api/issuer/issuerApi";
import { Analytics } from "./Analytics";
import Create from "./Create";
import { ProjectStage } from "@/services/project/projectSlice";
import ProjectsList from "./ProjectsList";

const Dashboard = () => {
  const { data: projects} = useFetchAllProjectsQuery();

  const incompleteProjects = projects?.filter(
    (project) => project.stage !== ProjectStage.MAIL_SENT
  );

  const completedProjects = projects?.filter(
    (project) => project.stage === ProjectStage.MAIL_SENT
  );
  return (
    <div>
      <Analytics totalProjects={projects?.length??0} totalCertifications={12345}/>
      <Create />
      <div className="p-9 mt-4">
      {incompleteProjects?.length ? (
        <>
          <h2 className="text-xl font-bold mb-5">Incomplete Projects</h2>
          <ProjectsList data={incompleteProjects} />
        </>
      ):null}
      {completedProjects?.length ? (
        <>
          <h2 className="text-xl font-bold mt-8 mb-5">Completed Projects</h2>
          <ProjectsList data={completedProjects} />
        </>
      ):null}
      </div>
    </div>
  );
};
export default Dashboard;
