import React, { useState } from 'react';
import './Preview.css';
import { Link } from 'react-router-dom';

const Preview = ({ data, onClick }) => {
  const [showDescription, setShowDescription] = useState(false); // Add local state

  const handleShowMore = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="preview" onClick={onClick}>
      <Link to={`/podcast/${data.id}`}> {/* This Link component will handle navigation */}
        <img src={data.image} alt={data.title} />
        <h3>{data.title}</h3>
      </Link>
      <button onClick={handleShowMore}>Show More</button>
      {showDescription && <p>{data.description}</p>} {/* Conditionally render the description */}
    </div>
  );
};

export default Preview;

