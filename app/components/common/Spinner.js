import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

const CircleLoader = styled.div`
  opacity: ${(p) => (p.show === 'loading' ? 1 : 0)};
  transition: opacity 0.45s ease-out, visibility 0.45s ease-out;
  visibility: ${(p) => (p.show === 'loading' ? 'visible' : 'hidden')};
  position: absolute;
  top: 30%;
  left: 50%;
  box-sizing: border-box;
  width: 65px;
  height: 65px;
  border-radius: 100%;
  border: 10px solid rgba(73, 80, 87, 0.2);
  border-top-color: #495057;
  will-change: -webkit-transform, transform;
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-animation: ${spin} 1s infinite linear;
  animation: ${spin} 1s infinite linear;
`;

const Spinner = ({ show }) => {
  return <CircleLoader show={show} />;
};

export { Spinner };
