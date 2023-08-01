import React from 'react';
import Episode from './Episode';

const PodcastDetails = ({ podcastData }) => {
  return (
    <div>
      <h2>{podcastData.title}</h2>
      <p>{podcastData.description}</p>
      {podcastData.seasons.map((season) => (
        <div key={season.season}>
          <h3>{season.title}</h3>
          <img src={season.image} alt={`Season ${season.season} Image`} />
          {season.episodes.map((episode) => (
            <Episode
              key={episode.episode}
              title={episode.title}
              description={episode.description}
              audioFile={episode.audioFile}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PodcastDetails;
