import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  CertificationResponse,
  useGenerateCertificationMutation,
  useGetCertificationStatusQuery,
} from "@/api/project/projectApi";
import FullScreenLoader from "@/components/ui/FullScreenLoader";

type Recipient = {
  recipientName: string;
  recipientEmail: string;
  certificationUrl?: string;
};

const stages = [
  "Processing",
  "Certification created",
  "Mail sent / Problem while sending mail",
];

export const IssueCertification = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [status, setStatus] = useState("Processing");
  const [recipients, setRecipients] = useState<CertificationResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const [generateCertification] = useGenerateCertificationMutation();
  const { refetch } = useGetCertificationStatusQuery(projectId || "", { skip: !projectId });
  const [loading,setLoading]=useState<boolean>(false)
  

  const handleGenerateCertification = async (projectId: string, recipients: Recipient[]) => {
    setCurrentStage(1);
    try {
      const response=await generateCertification({ projectId, recipients }).unwrap();

      setRecipients(response.map((recipient) => ({
        recipientName: recipient.recipientName,
        recipientEmail: recipient.recipientEmail,
        certificationUrl: recipient.certificationUrl,
      })));

      setCurrentStage(2);
      sessionStorage.removeItem("recipients");
      handleFetchStatus();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const handleFetchStatusOnce = async () => {
    try {
      const response = await refetch();
      if (response.data) {
        const { data } = response.data;
        setRecipients(data.map((recipient) => ({
          recipientName: recipient.recipientName,
          recipientEmail: recipient.recipientEmail,
          certificationUrl: recipient.certificationUrl,
        })));
        if (response.data.stage === 'MAIL_SENT') {
          setCurrentStage(3);
          setStatus("Completed");
        } else if (response.data.stage === 'MAIL_NOT_SENT') {
          setCurrentStage(3);
          setStatus("Error");
        } else {
          setCurrentStage(2);
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally{
      setLoading(false)
    }
  };

  const handleFetchStatus = async () => {
    const fetchStatus = async () => {
      try {
        const response = await refetch();
        if (response.data) {
          const { data } = response.data;

          setRecipients(data.map((recipient) => ({
            recipientName: recipient.recipientName,
            recipientEmail: recipient.recipientEmail,
            certificationUrl: recipient.certificationUrl,
          })));

          if (response.data.stage === "MAIL_SENT") {
            setCurrentStage(3);
            setStatus("Completed");
            clearInterval(interval);
          } else if (response.data.stage === 'MAIL_NOT_SENT') {
            setCurrentStage(3);
            setStatus("Error");
            clearInterval(interval);
          }
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    };

    const interval = setInterval(() => {
      fetchStatus();
    }, 5000);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    const storedRecipients = JSON.parse(sessionStorage.getItem("recipients") || "[]") as Recipient[];
    setRecipients(storedRecipients.map((recipient) => ({
      recipientName: recipient.recipientName,
      recipientEmail: recipient.recipientEmail,
      certificationUrl: "_",
    })));

    if (storedRecipients.length > 0 && projectId) {
      handleGenerateCertification(projectId, storedRecipients);
    } else if (projectId) {
      setLoading(true)
      setLoading(true)
      handleFetchStatusOnce();
    }
  }, [projectId]);

  const handleContinue = () => {
    const recipientsJSON = JSON.stringify(recipients);
    navigate(`/next-page?data=${encodeURIComponent(recipientsJSON)}`);
  };

  if(loading){
    return<FullScreenLoader/>
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Processing Your Campaign</h1>

      {/* Stages */}
      <div className="mb-8 flex justify-between items-center">
        {stages.map((stage, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  currentStage > index + 1
                    ? "bg-green-500"
                    : currentStage === index + 1
                    ? error && currentStage === index + 1
                      ? "bg-red-500"
                      : "bg-blue-500"
                    : "bg-gray-300"
                }`}
              >
                {error && currentStage === index + 1 ? "!" : index + 1}
              </div>
              <span className="text-sm text-center">{stage}</span>
            </div>
            {index < stages.length - 1 && (
              <div className="flex-grow h-0.5 bg-gray-300 mx-2"></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Recipients Table */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Recipients</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Recipient Name</th>
              <th className="border border-gray-300 p-2">Recipient Email</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Certification URL</th>
            </tr>
          </thead>
          <tbody>
            {recipients.map((recipient, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{recipient.recipientName}</td>
                <td className="border border-gray-300 p-2">{recipient.recipientEmail}</td>
                <td className="border border-gray-300 p-2">
                  {status === "Completed"
                    ? "Completed"
                    : stages[currentStage - 1]}
                </td>
                <td className="border border-gray-300 p-2">
                  {<a href={recipient.certificationUrl}>{recipient.certificationUrl}</a> || "_"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Continue Button */}
      {currentStage === 3 && status === "Completed" && (
        <Button onClick={handleContinue}>Continue</Button>
      )}
      {error && (
        <div className="mt-4 text-red-500">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};
