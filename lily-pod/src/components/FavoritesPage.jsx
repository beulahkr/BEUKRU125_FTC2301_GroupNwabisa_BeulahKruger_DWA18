import React, { useEffect, useState } from 'react';
import { useAppContext } from '../AppProvider';
import EpisodeCard from './EpisodeCard';

const FavoritesPage = () => {
  const { user, supabase } = useAppContext();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavoriteEpisodes = async () => {
      try {
        if (user) {
          console.log('Fetching favorite episodes for user:', user.id);

          const { data, error } = await supabase
            .from('favorites')
            .select('episode_id')
            .eq('user_id', user.id);

          if (error) {
            console.error('Error fetching favorite episodes:', error);
          } else {
            const favoriteEpisodes = data.map((item) => {
              // Destructure the episodeId to get podcastId, seasonNumber, and episodeNumber
              const [podcastId, seasonNumber, episodeNumber] = item.episode_id.split('-');
              return { podcastId, seasonNumber, episodeNumber };
            });

            console.log('Favorite episodes:', favoriteEpisodes);
            setFavorites(favoriteEpisodes);
          }
        }
      } catch (error) {
        console.error('Error fetching favorite episodes:', error);
      }
    };

    fetchFavoriteEpisodes();
  }, [user, supabase]);

  return (
    <div>
      <h2>Favorites</h2>
      {favorites.map((episodeId) => (
  <EpisodeCard key={episodeId} episodeId={episodeId} />
))}

    </div>
  );
};

export default FavoritesPage;
