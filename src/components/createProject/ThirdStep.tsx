import React, { useState } from "react";

interface ThirdStepProps {
  handleChange: (input: keyof UserInput) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
}

interface UserInput {
  projectName: string;
  TitleName: string;
  workspaceName: string;
  workspaceUrl: string;
  checkboxValue: string;
}

const ThirdStep: React.FC<ThirdStepProps> = (props) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    props.handleChange("checkboxValue")(value as any); // TypeScript workaround for type assertion
  };

  return (
    <>
      <div className="card-container max-w-md mx-auto ">
        <label
          className={`card-input cursor-pointer ${
            selectedOption === "Individual" ? "bg-green-100" : "bg-white"
          }`}
        >
          <input
            type="radio"
            className="card-input-element hidden"
            onChange={() => handleOptionChange("Individual")}
            checked={selectedOption === "Individual"}
          />
          <div className="card-body p-4 border rounded-lg shadow-md hover:shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">For myself</h3>
            <p className="text-gray-600">
              Write better things more clearly. Stay organized.
            </p>
          </div>
        </label>

        <label
          className={`card-input cursor-pointer ${
            selectedOption === "Company" ? "bg-blue-300" : "bg-white"
          }`}
        >
          <input
            type="radio"
            className="card-input-element hidden"
            onChange={() => handleOptionChange("Company")}
            checked={selectedOption === "Company"}
          />
          <div className="card-body p-4 border rounded-lg shadow-md hover:shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">With my team</h3>
            <p className="text-gray-600">
              Wikis, docs, tasks, and projects, all in one place.
            </p>
          </div>
        </label>
      </div>

      <button
        onClick={props.nextStep}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 block mx-auto"
      >
        Next
      </button>
    </>
  );
};

export default ThirdStep;
