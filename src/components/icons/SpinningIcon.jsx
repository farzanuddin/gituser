import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  border: 3px solid rgba(0, 0, 0, 0.2);
  border-top: 3px solid #0079ff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: ${spin} 1s linear infinite;
`;

export const SpinningLoader = () => {
  return <LoaderContainer />;
};
