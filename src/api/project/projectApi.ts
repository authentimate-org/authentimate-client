// src/services/projectApi.ts
import { api } from '../api';

export interface CreateProjectRequest {
  projectName: string;
  category: string;
}

export interface CreateProjectResponse {
  createdProject: any;
  stage: string;
  _id: string; 
  projectName: string;
  category: string;
  message: string;
}

export interface Template {
  _id: string;
  name: string;
  description: string;
  svg: string;
}

const projectApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation<CreateProjectResponse, CreateProjectRequest>({
      query: (project) => ({
        url: '/project/create',
        method: 'POST',
        body: project,
      }),
    }),
    fetchTemplates: builder.query<Template[], void>({
      query: () => '/project/templates',
    }),
  }),
  overrideExisting: false,
});

export const { useCreateProjectMutation, useFetchTemplatesQuery } = projectApi;
export default projectApi;
