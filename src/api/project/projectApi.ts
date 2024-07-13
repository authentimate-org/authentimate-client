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
  length: number;
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

export interface UserImage {
  _id: string;
  image_url: string;
}
export interface AddUserImageResponse {
  userImage: UserImage;
  data: UserImage;
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
    updateProjectTemplate: builder.mutation({
      query: ({ projectId, templateId }) => ({
        url: `projects/${projectId}`,
        method: "PATCH",
        body: { templateId },
      }),
    }),
    fetchTemplates: builder.query<Template[], void>({
      query: () => ({ url: "/premadeTemplate/all", method: "GET" }),
    }),
    fetchTemplateById: builder.query({
      query: (premadeTemplateId) => ({
        url: `premadeTemplate`,
        method: "POST",
        body: { premadeTemplateId },
      }),
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
    fetchAddUserImage: builder.mutation<AddUserImageResponse, FormData>({
      query: (formData) => ({
        url: "/project/image",
        method: "POST",
        body: formData,
      }),
    }),
    fetchGetUserImage: builder.query<UserImage[], void>({
      query: () => ({
        url: "/project/image",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateProjectMutation,
  useFetchTemplatesQuery,
  useUpdateProjectTemplateMutation,
  useFetchTemplateByIdQuery,
  useFetchBackgroundImagesQuery,
  useFetchIntialImagesQuery,
  useUpdateUserDesignMutation,
  useFetchAddUserImageMutation,
  useFetchGetUserImageQuery,
} = projectApi;
export default projectApi;
