import React, { useState } from 'react';
import './Preview.css';
import { Link } from 'react-router-dom';
import { genreMapping } from './genres'; // Import the genreMapping constant

const Preview = ({ data, onClick }) => {
  const [showDescription, setShowDescription] = useState(false);

  const handleShowMore = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="preview" onClick={onClick}>
      <Link to={`/podcast/${data.id}`}>
        <img src={data.image} alt={data.title} />
        <h3>{data.title}</h3>
      </Link>
      <p>
        {data.genres.map((genreId) => (
          <Link to={`/genres/${genreId}`} key={genreId}>
            {genreMapping[genreId]}
          </Link>
        ))}
      </p>
      <button onClick={handleShowMore}>Show More</button>
      {showDescription && <p>{data.description}</p>}
    </div>
  );
};

export default Preview;
