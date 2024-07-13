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

interface GetUserResponse{
  isEmailVerified:boolean,
  onboarding:boolean
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
  }),
  overrideExisting: false,
});

export const { useOnboardMutation, useFetchIssuerQuery } = issuerApi;
export default issuerApi;
