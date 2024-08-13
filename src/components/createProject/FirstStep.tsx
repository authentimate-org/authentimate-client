import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCreateProjectMutation } from '@/api/project/projectApi';
import { setProjectId, setStage, ProjectStage } from '../../services/project/projectSlice';
import FullScreenLoader from '../ui/FullScreenLoader';

interface FirstStepProps {
  handleChange: (input: keyof UserInput) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: (projectId: string, stage: string) => void;
}

interface UserInput {
  projectName: string;
  TitleName: string;
  workspaceName: string;
  workspaceUrl: string;
  checkboxValue: string;
}

const FirstStep: React.FC<FirstStepProps> = ({ nextStep }) => {
  const [projectName, setProjectName] = useState('');
  const [category, setCategory] = useState('');
  const [createProject, { isLoading, isSuccess, isError, data }] = useCreateProjectMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data) {
      console.log(data)
      const projectId = String(data._id);
      const stage = String(data.stage);
      dispatch(setProjectId(projectId));
      dispatch(setStage(ProjectStage.PROJECT_CREATED));
      nextStep(projectId, stage);
    }
  }, [isSuccess, data, nextStep, dispatch]);

  const handleCreateProject = async () => {
    if (projectName && category) {
      await createProject({ projectName, category });
    } else {
      console.error('Project name and category are required');
    }
  };

  return (
    <div className='space-y-4 max-w-sm mx-auto'>
      <div>
        <label htmlFor='projectName' className='block text-sm font-medium text-gray-700'>
          Project Name
        </label>
        <input
          type='text'
          id='projectName'
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
        />
      </div>

      <div>
        <label htmlFor='category' className='block text-sm font-medium text-gray-700'>
          Select an option
        </label>
        <select
          id='category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        >
          <option value='' disabled>
            Choose a Purpose
          </option>
          <option value='EVENT'>Event</option>
          <option value='COURSE'>Course</option>
          <option value='COMPETITION'>Competition</option>
        </select>
      </div>

      <button
        onClick={handleCreateProject}
        disabled={isLoading}
        className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
      >
        {isLoading ? <FullScreenLoader/> : 'Next'}
      </button>

      {isSuccess && <p className='text-green-500'>Project created successfully!</p>}
      {isError && <p className='text-red-500'>Failed to create project. Please try again.</p>}
    </div>
  );
};

export default FirstStep;
