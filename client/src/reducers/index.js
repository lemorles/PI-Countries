import { GET_COUNTRIES, GET_COUNTRY, GET_ACTIVITIES } from "../actions";

const initialState = {
  countries: [],
  country: {},
  activities: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
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
    default:
      return state;
  }
};

export default reducer;
