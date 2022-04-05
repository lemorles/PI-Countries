export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY = "GET_COUNTRY";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";

export const getCountries = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(`http://localhost:3001/countries`);
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

export const getActivities = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(`http://localhost:3001/activity`);
      const data = await res.json();

      return dispatch({ type: GET_ACTIVITIES, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const createActivity = (input) => {
  return async (dispatch) => {
    try {
      const res = await fetch("http://localhost:3001/activity", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await res.json();

      return dispatch({
        type: CREATE_ACTIVITY,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
