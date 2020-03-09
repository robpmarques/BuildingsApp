import React, { useEffect, useState } from 'react';
import Util from '../../utils/utils';
import * as Styled from './styles';

const Filter = (props, { page }) => {

  const [states, setStates] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [visible, setVisible] = useState(false);
  // const [min, setMin] = useState('');
  // const [max, setMax] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    async function getStates() {
      let items = await Util.getStates();

      setStates(items.data.states)
    }
    getStates();
  }, []);

  // useEffect(() => {
  //   async function getFilteredBuildings() {
  //     props.setPages(1);

  //     let result = await Util.getItems(page, selectedRadio, selectedCity, min, max, "asc");

  //     props._onChange(result.data.buildings, result.data.total);
  //   }
  //   getFilteredBuildings();

  // }, [min, max]);

  const handleSelectChange = async e => {
    setSelectedCity(e.target.value);

    props.setPages(1);

    let items = await Util.getItems(page, selectedRadio, e.target.value);

    props._onChange(items.data.buildings, items.data.total);
  };

  const getCities = async (state) => {
    setVisible(true);

    if (selectedCity)
      setSelectedCity("");

    let items = await Util.getCityByStates(state);

    setCities(items.data.cities);

  };

  const handleChange = async state => {
    getCities(state);
    props.setPages(1);
    setSelectedRadio(state);

    let items = await Util.getItems(page, state);

    props._onChange(items.data.buildings, items.data.total);
  }

  const removeFilters = async () => {
    let imoveis = JSON.parse(localStorage.getItem('imoveisFirstPage'));
    let total = localStorage.getItem('imoveisTotal');
    props.setPages(1);
    setVisible(false);
    setSelectedRadio('');

    if (imoveis.length) {
      props._onChange(imoveis, total);
    } else {
      let items = await Util.getItems();

      props._onChange(items.data.buildings, items.data.total);
    }
  };

  return (
    <Styled.Container>
      <h1>Filtros</h1>
      <Styled.Filters>
        <h2>Estados: </h2>
        {states.map((state) => (
          <Styled.Checkbox>
            <input
              type="radio"
              name="states"
              id={state}
              checked={selectedRadio === state}
              onChange={() => handleChange(state)}
            />
            <Styled.CheckboxLabel htmlFor={state}>{state}</Styled.CheckboxLabel>
          </Styled.Checkbox>
        ))}

        {/* <Styled.RangeContainer>
          <label htmlFor="min">Preço mínimo</label>
          <input id="min" onChange={(e) => setMin(e.target.value)} />
          <label htmlFor="max">Preço máximo</label>
          <input id="max" onChange={(e) => setMax(e.target.value)} />
        </Styled.RangeContainer> */}

        {visible && <>
          <h2>Cidades: </h2>
          <Styled.Select
            value={selectedCity}
            onChange={handleSelectChange}
          >
            <option value="">Selecione uma cidade</option>
            {console.log(cities)}
            {cities.length && cities.map(city => (
              <option value={city}>{city}</option>
            ))}
          </Styled.Select>
        </>}
        {selectedRadio && <Styled.LinkFilter onClick={removeFilters}>Remover Filtros</Styled.LinkFilter>}
      </Styled.Filters>
    </Styled.Container>
  )
}

export default Filter;
