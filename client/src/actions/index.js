export const GET_COUNTRIES_PENDING = "GET_COUNTRIES_PENDING";
export const GET_COUNTRIES_SUCCESS = "GET_COUNTRIES_SUCCESS";
export const GET_COUNTRIES_ERROR = "GET_COUNTRIES_ERROR";

export const GET_COUNTRY_PENDING = "GET_COUNTRY_PENDING";
export const GET_COUNTRY_SUCCESS = "GET_COUNTRY_SUCCESS";
export const GET_COUNTRY_ERROR = "GET_COUNTRY_ERROR";

export const GET_ACTIVITIES_PENDING = "GET_ACTIVITIES_PENDING";
export const GET_ACTIVITIES_SUCCESS = "GET_ACTIVITIES_SUCCESS";
export const GET_ACTIVITIES_ERROR = "GET_ACTIVITIES_ERROR";

export const CREATE_ACTIVITY_PENDING = "CREATE_ACTIVITY_PENDING";
export const CREATE_ACTIVITY_SUCCESS = "CREATE_ACTIVITY_SUCCESS";
export const CREATE_ACTIVITY_ERROR = "CREATE_ACTIVITY_ERROR";

export const SORT_BY_NAME = "SORT_BY_NAME";
export const SORT_BY_POPULATION = "SORT_BY_POPULATION";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

export const getCountries = (name = "", region = "", activity = "") => {
  const query = `?name=${name}&region=${region}&activity=${activity}`;

  return async (dispatch) => {
    try {
      dispatch({ type: GET_COUNTRIES_PENDING });

      const res = await fetch(`${BASE_URL}/countries${query}`);
      const data = await res.json();

      if (res.ok) {
        dispatch({ type: GET_COUNTRIES_SUCCESS, payload: data });
      } else {
        dispatch({ type: GET_COUNTRIES_ERROR, payload: data });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: GET_COUNTRIES_ERROR, payload: err });
    }
  };
};

export const getCountry = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_COUNTRY_PENDING });

      const res = await fetch(`${BASE_URL}/countries/${id}`);
      const data = await res.json();

      if (res.status === 200) {
        dispatch({ type: GET_COUNTRY_SUCCESS, payload: data });
      } else {
        dispatch({ type: GET_COUNTRY_ERROR, payload: data });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: GET_COUNTRY_ERROR, payload: err });
    }
  };
};

export const getActivities = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_ACTIVITIES_PENDING });

      const res = await fetch(`${BASE_URL}/activity`);
      const data = await res.json();

      if (res.status === 200) {
        dispatch({ type: GET_ACTIVITIES_SUCCESS, payload: data });
      } else {
        dispatch({ type: GET_ACTIVITIES_ERROR, payload: data });
      }
    } catch (err) {
      console.log(err);
      return dispatch({ type: GET_ACTIVITIES_ERROR, payload: err });
    }
  };
};

export const createActivity = (input) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CREATE_ACTIVITY_PENDING });

      const options = {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(input),
      };

      const res = await fetch(`${BASE_URL}/activity`, options);
      const data = await res.json();

      if (res.ok) {
        dispatch({ type: CREATE_ACTIVITY_SUCCESS, payload: data });
      } else {
        dispatch({ type: CREATE_ACTIVITY_ERROR, payload: data });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: CREATE_ACTIVITY_ERROR, payload: err });
    }
  };
};

export const sortCountriesByName = (value) => {
  return {
    type: SORT_BY_NAME,
    payload: value,
  };
};

export const sortCountriesByPopulation = (value) => {
  return {
    type: SORT_BY_POPULATION,
    payload: value,
  };
};
