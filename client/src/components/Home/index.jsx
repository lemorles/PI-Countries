import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  getActivities,
  sortCountriesByName,
  sortCountriesByPopulation,
} from "../../actions";
import { Link, useSearchParams } from "react-router-dom";
import Loader from "../Loader";
import imgSearch from "../../images/search.svg";
import styles from "./index.module.css";

const LIMIT = 9;

const regions = [
  { id: 0, name: "Africa" },
  { id: 1, name: "Americas" },
  { id: 2, name: "Antarctic" },
  { id: 3, name: "Asia" },
  { id: 4, name: "Europe" },
  { id: 5, name: "Oceania" },
];

export default function Home() {
  const dispatch = useDispatch();
  const { activities, loading, error } = useSelector((state) => state);
  const countries = useSelector((state) => state.filteredCountries);
  const [currentPage, setPage] = useState(1);
  const [filters, setFilters] = useState({
    region: "",
    activity: "",
    sortByName: "",
    sortByPopulation: "",
  });
  const [search, setSearch] = useState("");

  // hook similar to useState
  const [params, setParams] = useSearchParams();

  const addParams = (key, value) => {
    // differences with useState
    params.set(key, value);
    setParams(params);
  };

  const deleteParams = (key) => {
    params.delete(key);
    setParams(params);
  };

  useEffect(() => {
    const name = params.get("name") || "";
    const region = params.get("region") || "";
    const activity = params.get("activity") || "";

    dispatch(getCountries(name, region, activity));
    dispatch(getActivities());
    setPage(1);
  }, [dispatch, params]);

  const createArrPages = () => {
    let arrPages = [];
    for (let i = 0; i < Math.ceil(countries.length / LIMIT); i++) {
      arrPages.push(i + 1);
    }

    return arrPages;
  };

  const applyPagination = (countries) => {
    const lastIndex = currentPage * LIMIT;
    const firstIndex = lastIndex - LIMIT;

    return countries.slice(firstIndex, lastIndex);
  };

  const handleClick = (e) => {
    e.preventDefault();

    setPage(parseInt(e.target.innerText));
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "region") {
      if (e.target.value === "") {
        deleteParams(e.target.name);
      } else {
        addParams(e.target.name, e.target.value);
      }
    }

    if (e.target.name === "activity") {
      if (e.target.value === "") {
        deleteParams(e.target.name);
      } else {
        addParams(e.target.name, e.target.value);
      }
    }

    if (e.target.name === "sortByName") {
      dispatch(sortCountriesByName(e.target.value));
    }

    if (e.target.name === "sortByPopulation") {
      dispatch(sortCountriesByPopulation(e.target.value));
    }
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();

    setFilters({
      region: "",
      activity: "",
      sortByName: "",
      sortByPopulation: "",
    });
    setPage(1);
    addParams("name", search);
  };

  const handleChangeSearch = (e) => {
    if (currentPage > 1) setPage(1);

    setSearch(e.target.value);
  };

  const handleClickReset = (e) => {
    e.preventDefault();

    deleteParams("name");
    deleteParams("region");
    deleteParams("activity");
    dispatch(getCountries("", "", ""));
    setSearch("");
    setFilters({
      region: "",
      activity: "",
      sortByName: "",
      sortByPopulation: "",
    });
  };

  const renderError = () => {
    return (
      <>
        <h1>
          Ups.. <br /> {error.msg}
        </h1>
      </>
    );
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmitSearch} className={styles.wrapperSearchForm}>
        <div className={styles.wrapperSearch}>
          <input
            type="text"
            name="name"
            value={search}
            placeholder="Search"
            onChange={handleChangeSearch}
            className={styles.search}
          />
          <input
            type="submit"
            value=""
            style={{
              background: `url(${imgSearch})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              padding: "10px 20px",
              cursor: "pointer",
            }}
            title="Search"
          />
        </div>

        <button
          onClick={handleClickReset}
          title="Reset filters"
          className={styles.reset}
        />
      </form>

      <div className={styles.wrapperFilter}>
        <label>
          Filter by region
          <select name="region" value={filters.region} onChange={handleChange}>
            <option value="">All</option>
            {regions.map((region) => (
              <option key={region.id} value={region.name}>
                {region.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Filter by activity
          <select
            name="activity"
            value={filters.activity}
            onChange={handleChange}
          >
            <option value="">All</option>
            {activities &&
              activities.map((activity) => (
                <option key={activity.id}>{activity.name}</option>
              ))}
          </select>
        </label>

        <label>
          Sort by name
          <select
            name="sortByName"
            value={filters.sortByName}
            onChange={handleChange}
          >
            <option value="">All</option>
            <option value="ASC">A-Z</option>
            <option value="DESC">Z-A</option>
          </select>
        </label>

        <label>
          Sort by population
          <select
            name="sortByPopulation"
            value={filters.sortByPopulation}
            onChange={handleChange}
          >
            <option value="">All</option>
            <option value="ASC">Higher</option>
            <option value="DESC">Lower</option>
          </select>
        </label>
      </div>

      {error && error.msg ? (
        renderError()
      ) : (
        <>
          <ul className={styles.wrapperCards}>
            {countries &&
              applyPagination(countries).map((country) => {
                return (
                  <Link
                    key={country.id}
                    to={`/country/${country.id}`}
                    className={styles.card}
                  >
                    <li>
                      <img src={country.flag} alt={country.name} />
                      <h2>{country.name}</h2>
                      <p>{country.region}</p>
                    </li>
                  </Link>
                );
              })}
          </ul>
          <ul className={styles.wrapperPagination}>
            {countries &&
              createArrPages().map((page) => {
                return (
                  <li key={page}>
                    <button
                      onClick={handleClick}
                      className={`btn-secondary btn-small ${
                        page === currentPage ? "btn-selected" : ""
                      }`}
                    >
                      {page}
                    </button>
                  </li>
                );
              })}
          </ul>
        </>
      )}
    </div>
  );
}
