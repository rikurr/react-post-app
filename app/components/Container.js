import React, { useEffect } from 'react';
import styled from 'styled-components';

const LayoutContainer = styled.main`
  max-width: ${(p) => (p.wide ? '1120px' : '960px')};
  width: 100%;
  margin: 0 auto;
  margin-top: 80px;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Container = ({ children, wide }) => {
  return <LayoutContainer wide={wide}>{children}</LayoutContainer>;
};

export default Container;
