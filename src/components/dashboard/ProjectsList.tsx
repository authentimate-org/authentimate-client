import React, { useState } from 'react';
import { Project } from '@/api/issuer/issuerApi';
import { useNavigate } from 'react-router-dom';
import { ProjectStage } from '../../services/project/projectSlice';
import './ProjectsList.css';

const ProjectsList: React.FC<{ data: Project[] }> = ({ data }) => {
  const navigate = useNavigate();
  const [clickedButtonId, setClickedButtonId] = useState<string | null>(null);

  const mapStageToNumber = (stage: string): number => {
    switch (stage) {
      case ProjectStage.PROJECT_CREATED:
        return 1;
      case ProjectStage.TEMPLATE_SELECTED:
        return 2;
      case ProjectStage.TEMPLATE_FINALISED:
        return 3;
      case ProjectStage.CERTIFICATION_CREATED:
        return 4;
      default:
        return 0;
    }
  };

  const handleProjectClick = (projectId: string, stage: ProjectStage) => {
    const navigateUrl =
      stage === ProjectStage.MAIL_SENT || stage === ProjectStage.MAIN_NOT_SENT
        ? `/finalize/${projectId}`
        : `/create-project/${mapStageToNumber(stage)}/${projectId}`;
    navigate(navigateUrl);
  };

  const handleButtonClick = (projectId: string, stage: ProjectStage) => {
    setClickedButtonId(projectId);
    setTimeout(() => handleProjectClick(projectId, stage), 300);
  };

  const chunkedData = Array.from({ length: Math.ceil(data.length / 4) }, (_, i) =>
    data.slice(i * 4, i * 4 + 4)
  );

  return (
    <div>
      {chunkedData.map((chunk, index) => (
        <div key={index} className="tile-container ">
          {chunk.map((project) => (
            <div key={project._id} className="project-tile cursor-pointer">
              <div className="curved-card">
                <div className="card-image-section">
                  {mapStageToNumber(project.stage) <= mapStageToNumber(ProjectStage.CERTIFICATION_CREATED) &&
                    mapStageToNumber(project.stage) > mapStageToNumber(ProjectStage.PROJECT_CREATED) || mapStageToNumber(project.stage) === mapStageToNumber(ProjectStage.MAIL_SENT)  ? (
                    <img
                      src={project.templateImageUrl}
                      alt={project.stage}
                      className="template-image"
                    />
                  ) : (
                    <h3>{project.stage}</h3>
                  )}
                </div>
                <div className="card-content">
                  <div className="project-name">
                    <h5>{project.projectName}</h5>
                  </div>
                  <div className="project-stage">
                    <p>{project.stage}</p>
                  </div>
                </div>
                <div className="card-action">
                  {project.stage === ProjectStage.MAIL_SENT ? (
                    <button
                      onClick={() => handleButtonClick(project._id, project.stage)}
                      className={`action-button open-button ${clickedButtonId === project._id ? 'clicked' : ''}`}
                    >
                      Open Project
                    </button>
                  ) : mapStageToNumber(project.stage) <= mapStageToNumber(ProjectStage.CERTIFICATION_CREATED) ? (
                    <button
                      onClick={() => handleButtonClick(project._id, project.stage)}
                      className={`action-button continue-button ${clickedButtonId === project._id ? 'clicked' : ''}`}
                    >
                      Continue
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProjectsList;
