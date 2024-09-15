// src/react-step-progress-bar.d.ts

declare module 'react-step-progress-bar' {
  import * as React from 'react';

  export interface ProgressBarProps {
    percent: number;
    filledBackground: string;
    height?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode; // Optional children prop
  }

  export const ProgressBar: React.FC<ProgressBarProps>;

  export interface StepProps {
    transition?: string;
    children: (props: { accomplished: boolean; index: number }) => React.ReactNode;
  }

  export const Step: React.FC<StepProps>;
}
