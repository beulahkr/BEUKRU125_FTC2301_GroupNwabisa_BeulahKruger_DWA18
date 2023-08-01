import React, { useState, useEffect } from 'react';

const EpisodeCard = ({ episodeId }) => {
  const [episodeData, setEpisodeData] = useState(null);

  useEffect(() => {
    const fetchEpisodeData = async () => {
      if (!episodeId) {
        console.error('Episode ID is undefined.');
        return;
      }

      try {
        console.log(episodeId)
        // Destructure the episodeId to get podcastId, seasonNumber, and episodeNumber
        //const [podcastId, seasonNumber, episodeNumber] = episodeId;
        const podcastId = episodeId.podcastId
        const seasonNumber = episodeId.seasonNumber
        const episodeNumber = episodeId.episodeNumber
        // Fetch the podcast data for the given podcastId
        const response = await fetch(`https://podcast-api.netlify.app/id/${podcastId}`);
        const podcastData = await response.json();
        // Find the season and episode within the podcast data based on the seasonNumber and episodeNumber
        const season = podcastData.seasons.find((season) => season.season === parseInt(seasonNumber, 10));
        const episode = season?.episodes.find((episode) => episode.episode === parseInt(episodeNumber, 10));

        if (episode) {
          setEpisodeData(episode);
        } else {
          console.error('Episode not found.');
        }
      } catch (error) {
        console.error('Error fetching episode data:', error);
      }
    };

    fetchEpisodeData();
  }, [episodeId]);

  if (!episodeData) {
    return <div>Loading...</div>;
  }
return (
    <div className="episode-card">
      <img src={episodeData.image} alt={episodeData.title} />
      <h3>{episodeData.title}</h3>
      <p>{episodeData.description}</p>
      <audio controls>
        <source src={episodeData.audio} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {/* Add any other details you want to display */}
    </div>
  );
};

export default EpisodeCard;
