import React from 'react';
import { FetchAllProjectsResponse, useFetchAllProjectsQuery } from '@/api/issuer/issuerApi';
import { useNavigate } from 'react-router-dom';
import { ProjectStage } from '../../services/project/projectSlice';
import './ProjectsList.css';

const ProjectsList: React.FC<{data:FetchAllProjectsResponse[]}> = ({data}) => {
  // const { data: projects, isLoading, isError } = useFetchAllProjectsQuery();
  const navigate = useNavigate();

  // if (isLoading) return <div>Loading...</div>;
  // if (isError || !projects) return <div>Error loading projects</div>;

  const mapStageToNumber = (stage: string) => {
    switch (stage) {
      case ProjectStage.PROJECT_CREATED:
        return 1;
      case ProjectStage.TEMPLATE_SELECTED:
        return 2;
      case ProjectStage.TEMPLATE_FINALISED:
        return 3;
      default:
        return 0;
    }
  };

  const incompleteProjects = data.filter(project => project.stage !==ProjectStage.ISSUED);

  const handleProjectClick = (projectId:string,stage:ProjectStage) => {
    const navigateUrl =  `/create-project/${mapStageToNumber(stage)}/${projectId}` 
    navigate(navigateUrl);
  };

  return (
    <div>
      <div className="tile-container">
        {incompleteProjects.map(project => (
          <div
            key={project._id}
            onClick={() => handleProjectClick(project._id,project.stage)}
            className="project-tile cursor-pointer"
          >
            <div className="tile-content">
              <h3>{project.projectName}</h3>
              <h6>{project.stage}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;
