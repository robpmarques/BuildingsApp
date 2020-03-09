import React, { useState, useEffect } from 'react';
import Header from './components/Header/index'
import Filter from './components/Filter';
import ImoveisContent from './components/ImoveisContent';
import * as Styled from './components/Styles/styles.js';
import Util from './utils/utils';

const App = () => {

  const [imoveis, setImoveis] = useState([]);
  const [total, setTotal] = useState('');
  const [pages, setPages] = useState(1);

  useEffect(() => {
    localStorage.removeItem('imoveisFirstPage');
    localStorage.removeItem('imoveisTotal');
    getItems();
  }, []);

  async function getItems(page) {
    let result = await Util.getItems(page);

    setTotal(result.data.total);
    setImoveis([...imoveis, ...result.data.buildings]);
    if (!(localStorage.getItem('imoveisFirstPage') && localStorage.getItem('imoveisTotal'))) {
      localStorage.setItem('imoveisFirstPage', JSON.stringify(imoveis));
      localStorage.setItem('imoveisTotal', result.data.total);
    }
  }

  const nextPage = page => {
    setPages(page);
    getItems(page);
  }

  const _onChange = (obj, total = "") => {
    if (total)
      setTotal(total);
    setImoveis(obj);
  };

  return (
    <>
      <Header></Header>
      <Styled.Container>
        <Filter setPages={setPages} total={total} imoveis={imoveis} _onChange={_onChange}></Filter>
        <ImoveisContent pages={pages} nextPage={nextPage} total={total} imoveis={imoveis}></ImoveisContent>
      </Styled.Container>
    </>
  )
}

export default App;
