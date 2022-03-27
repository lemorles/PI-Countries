import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../actions";

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
            <li key={country.id}>
              <h2>{country.name}</h2>
              <img src={country.flag} alt={country.name} />
              <p>{country.region}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
