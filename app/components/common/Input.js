import styled from 'styled-components';

const Input = styled.input`
  padding: 8px 12px;
  background: #fff;
  border: 1px solid #aaa;
  outline: none;
  border-radius: 4px;
  font-size: ${(p) => (p.small ? '1rem' : '1.8rem')};
`;

const TextArea = styled.textarea`
  padding: 8px 12px;
  background: #fff;
  border: 1px solid #aaa;
  outline: none;
  border-radius: 4px;
  height: 50vh;
`;

const PostForm = styled.form`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 30px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  div {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
    margin-top: 10px;
  }
`;

export { Input, TextArea, PostForm };
