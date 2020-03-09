import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarFilled } from "@fortawesome/free-solid-svg-icons";
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { Link } from '../Styles/styles';
import * as Styled from './styles';
import Util from '../../utils/utils';

const ImoveisContent = (props) => {

  const [favoritedId, setFavoritedId] = useState([]);
  const [loading, setLoading] = useState(false);

  const setFavorite = id => {
    if (!localStorage.getItem(id, id)) {
      localStorage.setItem(id, id);
      setFavoritedId([...favoritedId, 'id']);
    } else {
      localStorage.removeItem(id, id);
      let favorited = favoritedId.filter((favorite) => {
        return favorite !== id;
      });

      setFavoritedId(favorited);
    }
  };

  const getPagination = () => {
    setLoading(!loading);
    props.nextPage(props.pages + 1);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <Styled.Container>
      {props.imoveis.map((e) => {
        let icon = localStorage.getItem(e.id, e.id);
        return (
          <Styled.Card key={e.id}>
            <Styled.ImageContainer>
              <a href={e.orulo_url}><div style={{ backgroundImage: `url(${e.default_image['520x280']})` }}></div></a>
            </Styled.ImageContainer>
            <Styled.CardDetails>
              <Link href={e.orulo_url}>{e.name}</Link>
              <p>{Util.TextAbstract(e.description, 300)}</p>
              <p>{e.address.city}, {e.address.area}, {e.address.street_type} {e.address.street}, Nº {e.address.number}, {e.address.zip_code}</p>
              <p>Preço: {e.min_price.toLocaleString("pt-BR", { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}</p>
            </Styled.CardDetails>
            <Styled.Icon>
              <FontAwesomeIcon icon={(icon ? faStarFilled : faStar)} onClick={() => setFavorite(e.id)} />
              <span onClick={() => setFavorite(e.id)}>{(icon ? "Favoritado" : "Favoritar")}</span>
            </Styled.Icon>
          </Styled.Card>
        )
      }
      )}

      {loading && <Styled.Spinner></Styled.Spinner>}

      {props.total > 5 && <Styled.CustomButton onClick={getPagination}>Ver mais</Styled.CustomButton>}
    </Styled.Container>
  )
}

export default ImoveisContent;
