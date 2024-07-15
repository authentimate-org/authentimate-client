import { FetchAllProjectsResponse } from "@/api/issuer/issuerApi";

const IncompleteProjects = ({data}:{data: FetchAllProjectsResponse[]}) => {
  return (
    <div className="m-8">
      <h2 className="text-2xl font-semibold">Incomplete Projects</h2>
      <div className="flex justify-left items-center gap-5">
        {data.map((project) => (
          <div className="bg-white rounded-3xl shadow-lg w-[263px] h-[190px] flex items-center justify-center cursor-pointer">
            <div className="inline-flex flex-col items-center justify-center">
              <div className="mt-2 text-lg font-medium">{project.name}</div>
              <div className="mt-2 text-xs font-medium">{project.projectId}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncompleteProjects;
