export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY = "GET_COUNTRY";

export const getCountries = () => {
  return async (dispatch) => {
    try {
      const res = await fetch("http://localhost:3001/countries");
      const data = await res.json();

      return dispatch({ type: GET_COUNTRIES, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getCountry = (id) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`http://localhost:3001/countries/${id}`);
      const data = await res.json();

      return dispatch({ type: GET_COUNTRY, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
};
