import styled from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  background: ${(p) => (p.logout ? '#aaa' : '#53A573')};
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  width: ${(p) => (p.small ? '30%' : '100%')};
  :hover {
    opacity: 0.8;
  }
  :focus {
    outline: none;
  }
`;

export { Button };
