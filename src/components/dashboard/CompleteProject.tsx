import React from 'react';
import { useFetchAllProjectsQuery } from '@/api/issuer/issuerApi';
import './CompleteProject.css'; // Add or adjust CSS for styling

const CompleteProject: React.FC = () => {
  const { data: projects, isLoading, isError } = useFetchAllProjectsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !projects) return <div>Error loading projects</div>;

  const mapStageToNumber = (stage: string) => {
    switch (stage) {
      case 'ISSUED':
        return 4;
      default:
        return 0;
    }
  };

  // Filter and map projects
  const completeProjects = projects
    .map(project => ({
      ...project,
      stage: mapStageToNumber(project.stage),
    }))
    .filter(project => project.stage === 4);

  return (
    <div>
      <h2 className="text-xl font-bold">Completed Projects</h2>
      <div className="tile-container">
        {completeProjects.map(project => (
          <div key={project._id} className="project-tile">
            <div className="tile-content">
              <h3 className="project-name">{project.projectName}</h3>
              <p className="project-stage">Stage: {project.stage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompleteProject;
