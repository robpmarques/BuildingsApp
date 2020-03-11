import React, { useEffect, useState } from 'react';
import Util from '../../utils/utils';
import Axios from 'axios';
import * as Styled from './styles';

const Filter = (props, { page }) => {

  const [states, setStates] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [visible, setVisible] = useState(false);
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [cities, setCities] = useState([]);
  const config = {
    headers: { Authorization: "Bearer a8vZ5ZYVb9c4TyaPwhKTfx8ilehxmPG6lp86KASiHgU" }
  };

  const bodyParameters = {
    key: "value"
  };

  useEffect(() => {
    async function getStates() {
      let items = await Util.getStates();

      setStates(items.data.states)
    }
    getStates();
  }, []);

  useEffect(() => {
    async function getFilteredBuildings() {
      await getSearchableItems();
    }
    getFilteredBuildings();

  }, [selectedRadio, selectedFilter, selectedCity, min, max]);

  const getSearchableItems = async (price_order, results_per_page = 5) => {

    let query = `?results_per_page=${results_per_page}`

    if (page)
      query += `&page=${page}`;

    if (selectedRadio)
      query += `&state=${selectedRadio}`;

    if (selectedCity)
      query += `&city=${selectedCity}`;

    if (min)
      query += `&min_price=${min}`;

    if (max)
      query += `&max_price=${max}`;

    if (price_order)
      query += `&price_order=${price_order}`

    console.log(query);

    let items = await Axios.get(`https://www.orulo.com.br/api/v2/buildings${query}`, config, bodyParameters);

    props._onChange(items.data.buildings);
  }

  const handleSelectChange = async e => {
    setSelectedCity(e.target.value);

    props.setPages(1);

    getSearchableItems();
  };

  const filterByPrice = async orderBy => {
    setSelectedFilter(orderBy);

    getSearchableItems(1, props.page * 5);
  };

  const getCities = async (state) => {
    setVisible(true);

    if (selectedCity)
      setSelectedCity("");

    let items = await Util.getCityByStates(state);

    setCities(items.data.cities);

  };

  const handleChange = async state => {
    setSelectedRadio(state);
    getCities(state);
    props.setPages(1);

    getSearchableItems();
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
      getSearchableItems();
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

        <h2>Filtrar por preço:</h2>


        <Styled.RangeContainer>
          <label htmlFor="min">Preço mínimo</label>
          <input id="min" onChange={(e) => setMin(e.target.value)} />
          <label htmlFor="max">Preço máximo</label>
          <input id="max" onChange={(e) => setMax(e.target.value)} />
        </Styled.RangeContainer>

        <Styled.Checkbox>
          <input
            type="radio"
            name="price"
            id={'desc'}
            checked={selectedFilter === 'desc'}
            onChange={() => filterByPrice('desc')}
          />
          <Styled.CheckboxLabel htmlFor={'desc'}>Preço descendente</Styled.CheckboxLabel>
        </Styled.Checkbox>
        <Styled.Checkbox>
          <input
            type="radio"
            name="price"
            id={'asc'}
            checked={selectedFilter === 'asc'}
            onChange={() => filterByPrice('asc')}
          />
          <Styled.CheckboxLabel htmlFor={'asc'}>Preço ascendente</Styled.CheckboxLabel>
        </Styled.Checkbox>

        {visible && <>
          <h2>Cidades: </h2>
          <Styled.Select
            value={selectedCity}
            onChange={handleSelectChange}
          >
            <option value="">Selecione uma cidade</option>
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
