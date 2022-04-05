import {
  GET_COUNTRIES,
  GET_COUNTRY,
  GET_ACTIVITIES,
  FILTER_BY_REGION,
  FILTER_BY_ACTIVITY,
  SORT_BY_NAME,
  SORT_BY_POPULATION,
  FILTER_BY_NAME,
  CREATE_ACTIVITY,
} from "../actions";

const initialState = {
  countries: [],
  country: {},
  activities: [],
  filteredCountries: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        filteredCountries: action.payload,
      };
    case GET_COUNTRY:
      return {
        ...state,
        country: action.payload,
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    case CREATE_ACTIVITY:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
