import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../actions";
import { NavLink } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div>
      <ul>
        {countries.map((country) => {
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
    </div>
  );
}
