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
  bgColor: string;
  components:any[];
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

export interface CertificationResponse {
  recipientName:string;
  recipientEmail: string;
  isCertificationCreated?: boolean;
  certificationId?: string;
  certificationUrl?: string;
  status?: string;
  error?: string;
}

export interface GetCertificaionStatusResponse{
  stage:string,
  data:CertificationResponse[]
}

export interface GenerateCertificationRequest {
  projectId: string;
  recipients: Recipient[];
}

export interface Recipient {
  recipientName: string;
  recipientEmail: string;
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
      query: () => ({ url: "/premadeTemplate/all", method: "GET" }),
    }),

    updateProjectTemplate: builder.mutation({
      query: ({ projectId, premadeTemplateId }) => ({
        url: "premadeTemplate/add-to-project",
        method: "PUT",
        body: { projectId,premadeTemplateId },
      }),
    }),


    fetchProject: builder.query({
      query: ({ projectId }) => ({
        url: "/project/get-project",
        method: "POST",
        body: { projectId },
      }),
    }),


    finalizeTemplate:builder.mutation<void ,String>({
      query: (projectId) => ({
        url: "/modifiedTemplate/finalise",
        method: "PUT",
        body: { projectId },
      }),
    }),


    
    generateCertification: builder.mutation<CertificationResponse[], GenerateCertificationRequest>({
      query: ({ projectId, recipients }) => ({
        url: "/certification/create",
        method: "POST",
        body: { projectId, recipients },
      }),
    }),


    getCertificationStatus: builder.query<GetCertificaionStatusResponse, String>({
      query: (projectId) => ({
        url: "/certification/get-status",
        method: "POST",
        body:{projectId}
      }),
    }),
    updateUserDesign: builder.mutation<
      any,
      { design: FormData }
    >({
      query: ({ design }) => ({
        url: "/modifiedTemplate/save",
        method: "PUT",
        body: design
      }),
    }),
    fetchAddUserImage: builder.mutation<AddUserImageResponse, FormData>({
      query: (formData) => ({
        url: "/image",
        method: "POST",
        body: formData,
      }),
    }),
    fetchGetUserImage: builder.query<UserImage[], void>({
      query: () => ({
        url: "/image",
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
  // useFetchTemplateByIdQuery,
  useFinalizeTemplateMutation,
  useUpdateUserDesignMutation,
  useFetchAddUserImageMutation,
  useFetchGetUserImageQuery,
  useLazyFetchProjectQuery,
  useGenerateCertificationMutation, 
  useGetCertificationStatusQuery,
} = projectApi;
export default projectApi;
