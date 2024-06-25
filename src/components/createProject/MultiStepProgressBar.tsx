import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import "./MultiStepProgressBar.css"; 

interface MultiStepProgressBarProps {
  step: number;
}

const MultiStepProgressBar: React.FC<MultiStepProgressBarProps> = ({ step }) => {
  return (
    <ProgressBar
      percent={(step + 1) * 25}
      filledBackground="#236ddb"
      height="5px"
      style={{width:"100%"}}
    >
      {[...Array(4)].map((_, index) => (
        <Step key={index} transition="scale">
          {({ accomplished }: { accomplished: boolean; index: number }) => (
            <div
              className={`h-8 w-8 border border-gray-300 rounded-full flex items-center justify-center ${
                accomplished ? "bg-blue-500 " : "bg-white "
              }`}
            >
              <span className="text-xs text-black">{index + 1}</span>
            </div>
          )}
        </Step>
      ))}
    </ProgressBar>
  );
};

export default MultiStepProgressBar;
