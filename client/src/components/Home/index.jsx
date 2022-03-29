import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../actions";
import { NavLink, useSearchParams } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.results);
  const totalPages = useSelector((state) => state.countries.totalPages);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    dispatch(getCountries(params.toString()));
  }, [dispatch, params]);

  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(i + 1);
  }

  const handleClick = (e) => {
    e.preventDefault();

    // ?page=1
    // addParams("page", e.target.innerText);
    // addParams("page", e.target.innerHTML);
    addParams("page", e.target.textContent);
  };

  const addParams = (name, value) => {
    params.set(name, value);
    setParams(params);
  };

  return (
    <div>
      <ul>
        {countries &&
          countries.map((country) => {
            return (
              <NavLink key={country.id} to={`/country/${country.id}`}>
                <li>
                  <h2>{country.name}</h2>
                  <img src={country.flag} alt={country.name} />
                  <p>{country.region}</p>
                </li>
              </NavLink>
            );
          })}
      </ul>
      {totalPages &&
        pages.map((page) => {
          return (
            <button key={page} onClick={handleClick}>
              {page}
            </button>
          );
        })}
    </div>
  );
}
