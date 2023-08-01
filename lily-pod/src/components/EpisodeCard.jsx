import React from 'react';

const Episode = ({ podcastData, episodeData }) => {
  if (!podcastData || !episodeData) {
    // Return a loading state or handle the case where data is not available yet
    return <div>Loading...</div>;
  }

  const { title: podcastTitle } = podcastData;
  const { title: episodeTitle, description, file } = episodeData;

  return (
    <div>
      <h3>Podcast Title: {podcastTitle}</h3>
      <h4>Episode Title: {episodeTitle}</h4>
      <p>Description: {description}</p>
      {/* You can add an audio player here for the 'file' URL */}
      {/* For example: */}
      <audio controls>
        <source src={file} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Episode;
