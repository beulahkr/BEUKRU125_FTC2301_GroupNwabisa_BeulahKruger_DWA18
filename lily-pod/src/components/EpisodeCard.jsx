import React, { useEffect, useState } from 'react';

const EpisodeCard = ({ episodeId }) => {
  const [currentEpisodeData, setCurrentEpisodeData] = useState(null);

  useEffect(() => {
    const fetchEpisodeData = async () => {
      if (!episodeId) {
        console.error('Episode ID is undefined.');
        return;
      }

      try {
        // Destructure the episodeId to get podcastId, seasonNumber, and episodeNumber
        const { podcastId, seasonNumber, episodeNumber } = episodeId;

        // Fetch the podcast data for the given podcastId
        const response = await fetch(`https://podcast-api.netlify.app/id/${podcastId}`);
        const podcastData = await response.json();

        // Find the season and episode within the podcast data based on the seasonNumber and episodeNumber
        const season = podcastData.seasons.find((season) => season.season === parseInt(seasonNumber, 10));
        const episode = season?.episodes.find((episode) => episode.episode === parseInt(episodeNumber, 10));

        if (episode) {
          setCurrentEpisodeData(episode);
        } else {
          console.error('Episode not found.');
        }
      } catch (error) {
        console.error('Error fetching episode data:', error);
      }
    };

    fetchEpisodeData();
  }, [episodeId]);

  if (!currentEpisodeData) {
    return <div>Loading...</div>;
  }

  // Extract necessary properties from currentEpisodeData
  const { title, description, file } = currentEpisodeData;

  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      {/* Add the audio player component to play the audio from the "file" URL */}
      <audio controls>
        <source src={file} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default EpisodeCard;

