import { api } from "../api";

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
}

export interface Template {
  _id: string;
  texts: any[];
  recipientName: any;
  graphicElements: any[];
  bgColor: string;
  templateImageURL: string;
}

export interface BackgroundImage {
  image_url: string;
}
export interface IntialImage {
  image_url: string;
}
const projectApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation<
      CreateProjectResponse,
      CreateProjectRequest
    >({
      query: (project) => ({
        url: "/project/create",
        method: "POST",
        body: project,
      }),
    }),
    fetchTemplates: builder.query<Template[], void>({
      query: () => ({ url: "/project/premadeTemplate", method: "GET" }),
    }),
    fetchTemplateById: builder.query<Template, string>({
      query: (id) => ({ url: `/project/premadeTemplate/${id}`, method: "GET" }),
    }),
    fetchBackgroundImages: builder.query<BackgroundImage[], void>({
      query: () => ({ url: "/background-images", method: "GET" }),
    }),
    fetchIntialImages: builder.query<IntialImage[], void>({
      query: () => ({ url: "/intial-images", method: "GET" }),
    }),
    updateUserDesign: builder.mutation<
      any,
      { design_id: string; formData: FormData }
    >({
      query: ({ design_id, formData }) => ({
        url: `/api/update-user-design/${design_id}`,
        method: "PUT",
        body: formData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateProjectMutation,
  useFetchTemplatesQuery,
  useFetchTemplateByIdQuery,
  useFetchBackgroundImagesQuery,
  useFetchIntialImagesQuery,
  useUpdateUserDesignMutation,
} = projectApi;
export default projectApi;
