// components/ProcessingStages.tsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Recipient = {
  name: string;
  email: string;
};

export const IssueCertification = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [status, setStatus] = useState("Processing");
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRecipients = JSON.parse(
      localStorage.getItem("recipients") || "[]"
    ) as Recipient[];
    setRecipients(storedRecipients);

    const timer = setInterval(() => {
      setCurrentStage((prevStage) => {
        if (prevStage < 4) {
          return prevStage + 1;
        } else {
          clearInterval(timer);
          setStatus("Completed");
          return prevStage;
        }
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const stages = [
    "Initializing",
    "Processing Recipients",
    "Generating Content",
    "Finalizing",
  ];

  const handleContinue = () => {
    const recipientsJSON = JSON.stringify(recipients);
    navigate(`/next-page?data=${encodeURIComponent(recipientsJSON)}`);
  };

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
                    ? "bg-blue-500"
                    : "bg-gray-300"
                }`}
              >
                {index + 1}
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
            </tr>
          </thead>
          <tbody>
            {recipients.map((recipient, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{recipient.name}</td>
                <td className="border border-gray-300 p-2">
                  {recipient.email}
                </td>
                <td className="border border-gray-300 p-2">
                  {status === "Completed"
                    ? "Completed"
                    : ` ${stages[currentStage - 1]}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Continue Button */}
      {currentStage === 4 && status === "Completed" && (
        <Button onClick={handleContinue}>Continue</Button>
      )}
    </div>
  );
};
