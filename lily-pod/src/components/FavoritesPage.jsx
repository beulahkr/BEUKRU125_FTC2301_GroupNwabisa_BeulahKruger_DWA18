import React from 'react';
import { useFavoritesContext } from '../FavoritesProvider';
import Episode from './EpisodeCard';

const FavoritesPage = () => {
  const { favorites } = useFavoritesContext();
  console.log(favorites)
  return (
    <div>
      <h2>Favorites</h2>
      {favorites.map((favorite) => (
        <Episode
          key={favorite.id} // Use a unique key for each episode
          imageUrl={favorite.seasons[0]?.image} // Assuming the image is in the first season
          title={favorite.title}
          description={favorite.description}
          audioFile={favorite.episodes[0]?.file} // Assuming the audio file is in the first episode
        />
      ))}
    </div>
  );
};

export default FavoritesPage;

