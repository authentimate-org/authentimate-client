import { useFetchAllProjectsQuery } from "@/api/issuer/issuerApi";
import { Analytics } from "./Analytics";
import Create from "./Create";
import IncompleteProjects from "./IncompleteProjects";

const Dashboard = () => {
  const { data: projects, error, isLoading } = useFetchAllProjectsQuery();
  const incompleteProjects = projects?.filter(
    (project) => project.stage != "ISSUED"
  );
  return (
    <div>
      <Analytics />
      <Create />
      {incompleteProjects?.length && (
        <IncompleteProjects data={incompleteProjects} />
      )}
    </div>
  );
};
export default Dashboard;
