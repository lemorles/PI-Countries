import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createActivity, getCountries } from "../../actions";
import "./index.css";

const season = [
  { id: 0, name: "Select season" },
  { id: 1, name: "winter" },
  { id: 2, name: "summer" },
  { id: 3, name: "fall" },
  { id: 4, name: "spring" },
];

export default function Activity() {
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "countries") {
      const currentIndex = input.countries.indexOf(e.target.value);

      if (currentIndex === -1 && e.target.value !== "") {
        setInput({
          ...input,
          [e.target.name]: [...input.countries, e.target.value],
        });

        setErrors(
          validate({
            ...input,
            [e.target.name]: [...input.countries, e.target.value],
          })
        );
      }
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });

      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }
  };

  const handleSumbit = (e) => {
    e.preventDefault();

    if (Object.keys(validate(input)).length) {
      console.log("hay errores");
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    } else {
      console.log("sin errores");
      dispatch(createActivity(input));
    }
  };

  const handleRemoveCountryClick = (e, name) => {
    e.preventDefault();

    setInput({
      ...input,
      countries: input.countries.filter((c) => c !== name),
    });

    setErrors(
      validate({
        ...input,
        countries: input.countries.filter((c) => c !== name),
      })
    );
  };

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div className="activity-container">
      <h1>Create Tourist Activity</h1>
      <form
        onSubmit={handleSumbit}
        autoComplete="off"
        className="form-container"
      >
        <label>Tourist Activity</label>
        <input
          type="text"
          name="name"
          placeholder="Enter tourist activity"
          value={input.name}
          onChange={handleChange}
          className="input"
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <label>Difficulty</label>
        <input
          type="number"
          name="difficulty"
          placeholder="Select difficulty"
          value={input.difficulty}
          onChange={handleChange}
          className="input"
        />
        {errors.difficulty && <p className="error">{errors.difficulty}</p>}

        <label>Duration</label>
        <input
          type="number"
          name="duration"
          placeholder="Enter duration in hours"
          value={input.duration}
          onChange={handleChange}
          className="input"
        />
        {errors.duration && <p className="error">{errors.duration}</p>}

        <label>Season</label>
        <select
          name="season"
          value={input.season}
          onChange={handleChange}
          className="input"
        >
          {season.map((season) => (
            <option key={season.id}>{season.name}</option>
          ))}
        </select>
        {errors.season && <p className="error">{errors.season}</p>}

        <label>Country</label>
        <select
          name="countries"
          value={input.countries}
          onChange={handleChange}
          className="input"
        >
          <option value="">Select Countries</option>
          {countries &&
            countries.length &&
            countries.map((country) => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))}
        </select>
        {errors.countries && <p className="error">{errors.countries}</p>}

        {input.countries && input.countries.length ? (
          <div className="flags-list">
            {countries
              .filter((c) => input.countries.indexOf(c.name) !== -1)
              .map((country) => {
                return (
                  <div key={country.id} className="flags-item">
                    <img src={country.flag} alt={country.name} />
                    <button
                      onClick={(e) => handleRemoveCountryClick(e, country.name)}
                      className="btn-secondary"
                    >
                      X
                    </button>
                  </div>
                );
              })}
          </div>
        ) : null}
        <input
          type="submit"
          value="Create tourist activity"
          className="btn-primary"
        />
      </form>
    </div>
  );
}

const validate = (input) => {
  const errors = {};

  if (!input.name) {
    errors.name = "Tourist Activity is required!";
  }

  if (!input.difficulty) {
    errors.difficulty = "Difficulty is required!";
  } else if (input.difficulty < 1 || input.difficulty > 5) {
    errors.difficulty = "Difficulty must be between 1 and 5!";
  }

  if (!input.duration) {
    errors.duration = "Duration is required!";
  } else if (input.duration < 1 || input.duration > 24) {
    errors.duration = "Duration must be between 1 and 24!";
  }

  if (!input.season) {
    errors.season = "Season is required!";
  }

  if (!input.countries) {
    errors.countries = "Country is required!";
  } else if (!input.countries.length) {
    errors.countries = "Country is required!";
  }

  return errors;
};
