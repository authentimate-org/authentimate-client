import { ProjectStage } from "@/services/project/projectSlice";
import { api } from "../api";

export interface OnboardRequest {
  category: "COMPANY" | "INSTITUTE" | "INDIVIDUAL";
  companyName?: string;
  CIN?: number;
  instituteName?: string;
  issuerName: string;
  designation?: string;
  address?: string;
}

export interface OnboardResponse {
  message?: string;
  error?: string;
}

export interface GetUserResponse{
  isEmailVerified:boolean,
  onboarding:boolean
}

export interface Project{
  templateImageUrl: string | undefined;
  _id:string;
  projectName:string;
  stage:ProjectStage
}
export interface FetchAllProjectsResponse{
  projects:Project[],
  totalCertifications:number
}

const issuerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    onboard: builder.mutation<OnboardResponse, OnboardRequest>({
      query: (issuerDetails) => ({
        url: "/issuer/onboarding",
        method: "PUT",
        body: issuerDetails,
      }),
    }),
    fetchIssuer: builder.query<GetUserResponse, void>({
      query: () => ({
        url: "/issuer/getUser",
        method: "GET",
      }),
    }),
    fetchAllProjects: builder.query<FetchAllProjectsResponse, void>({
      query: () => ({
        url: "/project/all",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useOnboardMutation, useFetchIssuerQuery ,useFetchAllProjectsQuery} = issuerApi;
export default issuerApi;
