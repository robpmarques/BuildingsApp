import styled, { keyframes } from 'styled-components';
import { Button } from '../Styles/styles';

export const Container = styled.div`
  width: calc(85% - 55px);

  @media (max-width: 777px) {
    width: 100%;
  }
`;

export const Card = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 15px;
  position: relative;
`;

export const ImageContainer = styled.div`
  width: 300px;
  background-position: center;

  div {
    width: 300px;
    height: 200px;
    background-repeat: no-repeat;
    background-size: cover;
  }

  @media (max-width: 777px) {
    width: 100%;
    background-position: center;

    div {
      width: 100%;
    }
  }
`;

export const CardDetails = styled.div`
    width: calc(100% - 330px);
    padding: 15px;

    &:after {
      content: "";
      width: 100%;
      height: 1px;
      background-color: rgb(0,0,0,.2);
    }

    @media (max-width: 777px) {
      width: 100%;
      margin-top: 10px;
      padding: 0;
    }
`;

export const CustomButton = styled(Button)`
  padding: 15px 40px;
  margin-top: 10px;
  display: inline-block;
`;

export const Icon = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    color: #4169E1;

    @media (max-width: 777px) {
      position: unset;
      display: block;
      margin: 5px 0;
    }

    span {
      margin-left: 5px;
    }
`;

export const keyframeSpinner = keyframes`
  to { transform: rotate(360deg); }
`

export const Spinner = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-left-color: #22a6b3;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${keyframeSpinner} 1s linear infinite;
`;