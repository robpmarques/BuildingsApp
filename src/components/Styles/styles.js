import styled from 'styled-components';

export const Container = styled.div`
    max-width: 1400px;
    margin: 30px auto;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;

    @media (max-width: 1400px) {
      max-width: 1280px;
    }

    @media (max-width: 1280px) {
      max-width: 1024px;
    }

    @media (max-width: 1024px) {
      max-width: 768px;
    }

    @media (max-width: 768px) {
      max-width: 80%;
    }
`;

export const Button = styled.a`
  background-color: unset;
  outline: unset;
  border-radius: 10px;
  cursor: pointer;
  border: 0;
  background-color: #4169E1;
  color: #fff;
`;

export const Link = styled.a`
  text-decoration: none;
  color: #4169E1;
  margin-bottom: 10px;
  display: inline-block;

  &:hover {
    transition: .1s ease-in-out;
    color: #87CEEB;
  }
`