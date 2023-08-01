// GenreList.js

import React from "react";
import { Link } from "react-router-dom";
import { genreMapping } from "./genres"; // Import the genreMapping constant

const GenreList = () => {
  return (
    <div>
      <h2>Genres</h2>
      <ul>
        {Object.entries(genreMapping).map(([genreId, genreName]) => (
          <li key={genreId}>
            <Link to={`/genres/${genreId}`}>{genreName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenreList;
