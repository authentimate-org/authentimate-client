import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const FullScreenLoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  z-index: 9999; /* Ensure it is above other content */
`;

const Spinner = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.1); /* Light grey */
  border-left: 8px solid #000; /* Black */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

const FullScreenLoader: React.FC = () => {
  return (
    <FullScreenLoaderWrapper>
      <Spinner />
    </FullScreenLoaderWrapper>
  );
};

export default FullScreenLoader;
