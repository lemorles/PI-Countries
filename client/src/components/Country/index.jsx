import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCountry } from "../../actions";

export default function Country() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const country = useSelector((state) => state.country);

  useEffect(() => {
    dispatch(getCountry(id));
  }, [dispatch, id]);

  return (
    <div>
      <p>{country.id}</p>
      <h1>{country.name}</h1>
      <img src={country.flag} alt={country.name} />
      <p>Capital:</p>
      <ul>
        {country.capitals &&
          country.capitals.map((cap) => {
            return <li key={cap.id}>{cap.name}</li>;
          })}
      </ul>
      <p>Region: {country.region}</p>
      <p>Subregion: {country.subregion}</p>
      <p>
        Area: {country.area} km<sup>2</sup>
      </p>
      <p>Population: {country.population}</p>
      <p>Toutist Activities:</p>
      <ul>
        {country.activities &&
          country.activities.map((act) => {
            return <li key={act.id}>{act.name}</li>;
          })}
      </ul>
    </div>
  );
}
