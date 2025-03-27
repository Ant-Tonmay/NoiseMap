import React from "react";
import {cities} from "../utils/contsants";

export default function CitySelection({ handleCityClick }) {
  return (
    <select onChange={handleCityClick} className="w-50">
      <>
        <option >Select city</option>
        {cities.map((value) => (
          <option key={value}>{value}</option>
        ))}
      </>
    </select>
  );
}
