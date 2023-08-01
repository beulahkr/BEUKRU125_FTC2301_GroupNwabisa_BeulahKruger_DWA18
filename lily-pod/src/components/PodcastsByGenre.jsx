// PodcastsByGenrePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { genreMapping } from './genres';
import Preview from './Preview'; // Import the Preview component
import Navbar from './Navbar';
import './PodcastsByGenre.css'

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
    <div className="page">
        <Navbar className="nav" />
    <div className='header-div'><h2 className=".heading">{genreMapping[Number(genreId)]} Podcasts</h2></div>
      
     <div className="previewItems">
      
       {/* Map over podcastsByGenre and render the Preview component for each podcast */}
        {podcastsByGenre.map((podcast) => (
          < React.Fragment key={podcast.id}>
            <Preview data={podcast} />
          </React.Fragment >
        ))}
     </div>
      
     
    </div>
  );
};

export default PodcastsByGenrePage;


