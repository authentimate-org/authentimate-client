// services/projectApi.ts
import { api } from '../api';

export interface CreateProjectRequest {
  projectName: string;
  category: string;
}

export interface CreateProjectResponse {
  message: string;
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
  }),
  overrideExisting: false,
});

export const { useCreateProjectMutation } = projectApi;
export default projectApi;
