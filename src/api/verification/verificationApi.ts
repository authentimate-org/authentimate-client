import { api } from "../api";



// interface VerifyCertificationResponse{
    
// }

const verificationApi = api.injectEndpoints({
    endpoints: (builder) => ({
      verifyCertification: builder.query<any, String>({
        query: (certificationId) => ({
          url: `certification/${certificationId}`,
          method: "GET",
        }),
      }),
    }),
    overrideExisting: false,
  });

export const {useVerifyCertificationQuery} = verificationApi;

export default verificationApi;
