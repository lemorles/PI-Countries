export const GET_COUNTRIES = "GET_COUNTRIES";

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
