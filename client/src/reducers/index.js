import {
  GET_COUNTRIES_PENDING,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_ERROR,
  GET_COUNTRY_PENDING,
  GET_COUNTRY_SUCCESS,
  GET_COUNTRY_ERROR,
  GET_ACTIVITIES_PENDING,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_ERROR,
  CREATE_ACTIVITY_PENDING,
  CREATE_ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_ERROR,
  SORT_BY_NAME,
  SORT_BY_POPULATION,
} from "../actions";

const initialState = {
  countries: [],
  country: {},
  activities: [],
  activity: {},
  filteredCountries: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES_PENDING:
      return { ...state, loading: true };
    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        countries: [...action.payload],
        filteredCountries: [...action.payload],
      };
    case GET_COUNTRIES_ERROR:
      return {
        ...state,
        loading: false,
        countries: [],
        filteredCountries: [],
        error: action.payload,
      };
    case GET_COUNTRY_PENDING:
      return { ...state, loading: true };
    case GET_COUNTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        country: action.payload,
      };
    case GET_COUNTRY_ERROR:
      return {
        ...state,
        loading: false,
        country: [],
        error: action.payload,
      };
    case GET_ACTIVITIES_PENDING:
      return { ...state, loading: true };
    case GET_ACTIVITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        activities: action.payload,
      };
    case GET_ACTIVITIES_ERROR:
      return {
        ...state,
        loading: false,
        activities: [],
        error: action.payload,
      };
    case CREATE_ACTIVITY_PENDING:
      return { ...state, loading: true, activity: {}, error: null };
    case CREATE_ACTIVITY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        activity: action.payload,
      };
    case CREATE_ACTIVITY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SORT_BY_NAME:
      if (action.payload === "") {
        return { ...state, filteredCountries: [...state.countries] };
      }

      const newCountries = state.filteredCountries;

      // if (action.payload === "ASC") {
      //   return {
      //     ...state,
      //     filteredCountries: newCountries.sort((a, b) => {
      //       if (a.name > b.name) {
      //         return 1;
      //       }
      //       if (a.name < b.name) {
      //         return -1;
      //       }

      //       return 0;
      //     }),
      //   };
      // }
      //
      // // DESC
      // return {
      //   ...state,
      //   filteredCountries: newCountries.sort((a, b) => {
      //     if (a.name < b.name) {
      //       return 1;
      //     }
      //     if (a.name > b.name) {
      //       return -1;
      //     }

      //     return 0;
      //   }),
      // };

      if (action.payload === "ASC") {
        return {
          ...state,
          filteredCountries: newCountries.sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
        };
      }
      // DESC
      return {
        ...state,
        filteredCountries: newCountries.sort((a, b) =>
          b.name.localeCompare(a.name)
        ),
      };
    case SORT_BY_POPULATION:
      if (action.payload === "") {
        return { ...state, filteredCountries: [...state.countries] };
      }

      const newCountriess = state.filteredCountries;

      if (action.payload === "ASC") {
        return {
          ...state,
          filteredCountries: newCountriess.sort(
            (a, b) => b.population - a.population
          ),
        };
      }
      // DESC
      return {
        ...state,
        filteredCountries: newCountriess.sort(
          (a, b) => a.population - b.population
        ),
      };
    default:
      return state;
  }
};

export default reducer;
