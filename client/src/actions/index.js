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

export const FILTER_BY_NAME_PENDING = "FILTER_BY_NAME_PENDING";
export const FILTER_BY_NAME_SUCCESS = "FILTER_BY_NAME_SUCCESS";
export const FILTER_BY_NAME_ERROR = "FILTER_BY_NAME_ERROR";

export const FILTER_BY_REGION = "FILTER_BY_REGION";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const SORT_BY_NAME = "SORT_BY_NAME";
export const SORT_BY_POPULATION = "SORT_BY_POPULATION";

export const getCountries = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_COUNTRIES_PENDING });

      const res = await fetch(`http://localhost:3001/countries`);
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

      const res = await fetch(`http://localhost:3001/countries/${id}`);
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

      const res = await fetch(`http://localhost:3001/activity`);
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

      const res = await fetch("http://localhost:3001/activity", options);
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

export const filterCountriesByName = (query = "") => {
  return async (dispatch) => {
    try {
      dispatch({ type: FILTER_BY_NAME_PENDING });

      const res = await fetch(`http://localhost:3001/countries?${query}`);
      const data = await res.json();

      dispatch({ type: FILTER_BY_NAME_SUCCESS, payload: data });
    } catch (err) {
      console.log(err);
      return dispatch({ type: FILTER_BY_NAME_ERROR, payload: err });
    }
  };
};

export const filterCountriesByRegion = (value) => {
  return {
    type: FILTER_BY_REGION,
    payload: value,
  };
};

export const filterCountriesByActivity = (value) => {
  return {
    type: FILTER_BY_ACTIVITY,
    payload: value,
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
