import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCountry } from "../../actions";
import Loader from "../Loader";
import "./index.css";

export default function Country() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { country, loading, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getCountry(id));
  }, [dispatch, id]);

  if (loading) return <Loader />;

  if (error && error.msg)
    return (
      <div className="country-container error-header">
        <h1>
          Ups.. <br /> {error.msg}
        </h1>
        <NavLink to="/home" className="btn-primary">
          Back to home
        </NavLink>
      </div>
    );

  return (
    <div className="country-container">
      {/* <p>{country.id}</p> */}
      <h1>{country.name}</h1>
      <div className="country-wrapper">
        <img src={country.flag} alt={country.name} className="country-img" />
        <div className="country-details">
          <ul className="capital-wrapper">
            <p className="capitals">Capital:</p>
            {country.capitals &&
              country.capitals.map((cap) => {
                return <li key={cap.id}>{`${cap.name},`}</li>;
              })}
          </ul>
          <p>Region: {country.region}</p>
          <p>Subregion: {country.subregion}</p>
          <p>
            <span>
              Area: {country.area} km<sup>2</sup>
            </span>
          </p>
          <p>Population: {country.population}</p>
        </div>
      </div>

      {country.activities && country.activities.length ? (
        <>
          <h3>Tourist Activities:</h3>
          <ul className="list-activity">
            {country.activities.map((act) => {
              return (
                <li key={act.id} className="item-activity">
                  <p>ACTIVITY {act.id}</p>
                  <p>Name: {capitalizeFirstLetter(act.name)}</p>
                  <p>Difficulty: {act.difficulty}</p>
                  <p>Duration: {act.duration} hours</p>
                  <p>Season: {capitalizeFirstLetter(act.season)}</p>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <div>
          <h3>No tourist activities found!</h3>
          <NavLink to={"/activity"} className="btn-primary">
            Create Activity
          </NavLink>
        </div>
      )}
    </div>
  );
}

const capitalizeFirstLetter = (str) => {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};
