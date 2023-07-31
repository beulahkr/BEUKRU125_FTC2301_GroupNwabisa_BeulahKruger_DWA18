// FavoritesPage.jsx
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../AppProvider'

const FavoritesPage = () => {
  const { user, favorites } = useAppContext();
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);

  useEffect(() => {
    // Fetch user's favorite episodes from the favorites table
    const fetchFavoriteEpisodes = async () => {
      if (user) {
        try {
          // Replace 'your-favorites-table' with the actual name of your favorites table in Supabase
          const { data, error } = await supabase
            .from('your-favorites-table')
            .select('episode_id')
            .eq('user_id', user.id);

          if (error) {
            console.error('Error fetching favorite episodes:', error);
          } else {
            // Assuming 'episode_id' is the unique identifier for episodes in your API
            const favoriteEpisodes = data.map((item) => item.episode_id);
            setFavoriteEpisodes(favoriteEpisodes);
          }
        } catch (error) {
          console.error('Error fetching favorite episodes:', error);
        }
      }
    };

    fetchFavoriteEpisodes();
  }, [user]);

  return (
    <div>
      <h2>Favorite Episodes</h2>
      <ul>
        {/* Render the list of favorite episodes */}
        {favoriteEpisodes.map((episodeId) => (
          <li key={episodeId}>
            {/* Render your episode information here based on the episodeId */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
