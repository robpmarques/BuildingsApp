import React from 'react';
import logo from '../../assets/images/orulo.png';

import * as Styled from './styles';

const App = () => {
  return(
      <Styled.Header>
          <a href="https://www.orulo.com.br/"><img src={logo} alt=""/></a>
      </Styled.Header>
  )
}

export default App;
