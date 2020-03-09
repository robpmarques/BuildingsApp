import Axios from "axios";

class Util {

  constructor() {
    this.config = {
      headers: { Authorization: "Bearer a8vZ5ZYVb9c4TyaPwhKTfx8ilehxmPG6lp86KASiHgU" }
    };

    this.bodyParameters = {
      key: "value"
    };

  }

  TextAbstract(text, length) {
    if (text == null) {
      return "";
    }
    if (text.length <= length) {
      return text;
    }
    text = text.substring(0, length);
    let last = text.lastIndexOf(" ");
    text = text.substring(0, last);
    return text + "...";
  }

  getItems(page = 1, state = "", city = "", min = "", max = "", price_order = "") {

    let query = "?results_per_page=5"

    if (page)
      query += `&page=${page}`;

    if (state)
      query += `&state=${state}`;

    if (city)
      query += `&city=${city}`;

    if (min)
      query += `&min_price=${min}`;

    if (max)
      query += `&max_price=${max}`;
    
    if (price_order) 
      query += `&price_order=${price_order}`

    console.log(query);

    let items = Axios.get(`https://www.orulo.com.br/api/v2/buildings${query}`, this.config, this.bodyParameters);

    return items;
  }

  getStates() {
    let items = Axios.get('https://www.orulo.com.br/api/v2/addresses/states', this.config, this.bodyParameters);

    return items;
  }

  getCityByStates(state) {
    let items = Axios.get(`https://www.orulo.com.br/api/v2/addresses/cities?state=${state}`, this.config, this.bodyParameters);

    return items;
  }

}

export default new Util();