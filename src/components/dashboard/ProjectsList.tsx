import React from 'react';
import { Project } from '@/api/issuer/issuerApi';
import { useNavigate } from 'react-router-dom';
import { ProjectStage } from '../../services/project/projectSlice';
import './ProjectsList.css';

const ProjectsList: React.FC<{ data: Project[] }> = ({ data }) => {
  const navigate = useNavigate();

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

  const handleProjectClick = (projectId: string, stage: ProjectStage) => {
    let navigateUrl;
    if (stage === ProjectStage.MAIL_SENT || stage === ProjectStage.MAIN_NOT_SENT) {
      navigateUrl = `/finalize/${projectId}`;
    } else {
      navigateUrl = `/create-project/${mapStageToNumber(stage)}/${projectId}`;
    }
    navigate(navigateUrl);
  };

  return (
    <div>
      <div className="tile-container">
        {data.map((project) => (
          <div
            key={project._id}
            onClick={() => handleProjectClick(project._id, project.stage)}
            className="project-tile cursor-pointer"
          >
            <div className="tile-content">
              {mapStageToNumber(project.stage) >= mapStageToNumber(ProjectStage.TEMPLATE_SELECTED) ||
              project.stage === ProjectStage.MAIL_SENT ? (
                <img
                  src={project.templateImageUrl}
                  alt="Template Preview"
                  className="template-image"
                />
              ) : (
                <>
                  <h6>{project.stage}</h6>
                </>
              )}
              {/* Conditional rendering of buttons based on project stage */}
              {project.stage === ProjectStage.MAIL_SENT ? (
                <button className="action-button open-button">Open Project</button>
              ) : mapStageToNumber(project.stage) <= mapStageToNumber(ProjectStage.TEMPLATE_FINALISED) && (
                <button className="action-button continue-button">Continue</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;
