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
  FILTER_BY_NAME_PENDING,
  FILTER_BY_NAME_SUCCESS,
  FILTER_BY_NAME_ERROR,
  FILTER_BY_REGION,
  FILTER_BY_ACTIVITY,
  SORT_BY_NAME,
  SORT_BY_POPULATION,
} from "../actions";

const initialState = {
  countries: [],
  country: {},
  activities: [],
  filteredCountries: [],
  loading: false,
  error: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES_PENDING:
      return { ...state, loading: true };
    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        loading: false,
        countries: action.payload,
        filteredCountries: action.payload,
      };
    case GET_COUNTRIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_COUNTRY_PENDING:
      return { ...state, loading: true };
    case GET_COUNTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        country: action.payload,
      };
    case GET_COUNTRY_ERROR:
      return {
        ...state,
        loading: false,
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
        error: action.payload,
      };
    case CREATE_ACTIVITY_PENDING:
      return { ...state, loading: true };
    case CREATE_ACTIVITY_SUCCESS:
      return {
        ...state,
        loading: false,
        // activities: action.payload,
      };
    case CREATE_ACTIVITY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FILTER_BY_NAME_PENDING:
      return { ...state, loading: true };
    case FILTER_BY_NAME_SUCCESS:
      return {
        ...state,
        filteredCountries: action.payload,
      };
    case FILTER_BY_NAME_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FILTER_BY_REGION:
      if (action.payload === "") {
        return { ...state, filteredCountries: state.countries };
      } else {
        // const newCountries = state.filteredCountries;
        const newCountries = [...state.countries];

        const filterCountries = newCountries.filter((c) => {
          return c.region.toLowerCase().includes(action.payload.toLowerCase());
        });

        return {
          ...state,
          filteredCountries: filterCountries,
        };
      }
    case FILTER_BY_ACTIVITY:
      if (action.payload === "") {
        return { ...state, filteredCountries: state.countries };
      } else {
        // const newCountries = state.filteredCountries;
        const newCountries = [...state.countries];

        const filterCountries = newCountries.filter((c) => {
          return (
            c.activities &&
            c.activities.length &&
            c.activities.find((a) => {
              return a.name
                .toLowerCase()
                .includes(action.payload.toLowerCase());
            })
          );
        });

        return {
          ...state,
          filteredCountries: filterCountries,
        };
      }
    case SORT_BY_NAME:
      if (action.payload === "") {
        return { ...state, filteredCountries: state.countries };
      }

      const newCountries = [...state.filteredCountries];

      if (action.payload === "ASC") {
        return {
          ...state,
          filteredCountries: newCountries.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }

            return 0;
          }),
        };
      }

      // DESC
      return {
        ...state,
        filteredCountries: newCountries.sort((a, b) => {
          if (a.name < b.name) {
            return 1;
          }
          if (a.name > b.name) {
            return -1;
          }

          return 0;
        }),
      };
    case SORT_BY_POPULATION:
      if (action.payload === "") {
        return { ...state, filteredCountries: state.countries };
      }

      const newCountriess = [...state.filteredCountries];

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
