// PodcastsByGenrePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { genreMapping } from './genres';
import Preview from './Preview'; // Import the Preview component
import Navbar from './Navbar';

const PodcastsByGenrePage = () => {
  const { genreId } = useParams();
  const [podcastsByGenre, setPodcastsByGenre] = useState([]);

  useEffect(() => {
    // Fetch data from the API based on the genreId
    fetch(`https://podcast-api.netlify.app/shows?genre=${genreId}`)
      .then((response) => response.json())
      .then((data) => setPodcastsByGenre(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [genreId]);

  return (
    <div>
        <Navbar/>
      <h2>{genreMapping[Number(genreId)]} Podcasts</h2>
      <ul>
        {/* Map over podcastsByGenre and render the Preview component for each podcast */}
        {podcastsByGenre.map((podcast) => (
          <li key={podcast.id}>
            <Preview data={podcast} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PodcastsByGenrePage;


