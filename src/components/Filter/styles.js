import styled from 'styled-components';
import { Link } from '../Styles/styles';

export const Container = styled.div`
  border: 1px solid rgb(.42, .42, .42, .2);
  width: 15%;
  border-radius: 5px;
  padding: 20px;
  max-height: 300px;

  

  @media (max-width: 777px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

export const Checkbox = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin-bottom: 5px;
`;

export const Filters = styled.div`
  margin-left: 10px;
`;

export const Select = styled.select`
width: 100%;
    outline: unset;
    border: unset;
    background-color: #4169E1;
    color: #fff;
    padding: 5px;
    border-radius: 5px;`
    ;

export const LinkFilter = styled(Link)`
  margin-top: 15px;
  cursor: pointer;
`;


export const CheckboxLabel = styled.label`
  cursor: pointer;
  margin-left: 5px;
`;

export const RangeContainer = styled.div`
  label, input {
    margin-top: 10px;
    display: block;
  }
  input {
    margin: 10px 0;
    width: 100%;
    padding: 10px 0;
  }
`;