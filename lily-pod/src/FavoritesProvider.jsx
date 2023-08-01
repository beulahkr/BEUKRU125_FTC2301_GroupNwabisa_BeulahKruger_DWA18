import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAppContext } from './AppProvider';
import supabase from './supabase';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user } = useAppContext();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [podcastData, setPodcastData] = useState(null) 
  useEffect(() => {
    if (user) {
      // Fetch user's favorite episodes from your database (Supabase or any other) and update the state
      const fetchFavoriteEpisodes = async () => {
        try {
          const { data, error } = await supabase
            .from('favorites')
            .select('episode_id')
            .eq('user_id', user.id);

          if (error) {
            console.error('Error fetching favorite episodes:', error);
          } else {
            const favoriteEpisodes = data.map((item) => item.episode_id);
            setFavorites(favoriteEpisodes);
            setLoading(false);
          }
        } catch (error) {
          console.error('Error fetching favorite episodes:', error);
        }
      };

      fetchFavoriteEpisodes();
    }
  }, [user]);

  // Here you can extract the podcastId, seasonNumber, and episodeNumber from the favorites array
  useEffect(() => {
    if (favorites.length > 0) {
      const [podcastId, seasonNumber, episodeNumber] = favorites[0].split('-');
      console.log('Podcast ID:', podcastId);
      console.log('Season Number:', seasonNumber);
      console.log('Episode Number:', episodeNumber);

         const fetchPodcastData = async () => {
        try {
          const response = await fetch(`https://podcast-api.netlify.app/id/${podcastId}`);
          const podcastData = await response.json();
          setPodcastData(podcastData);
          console.log(podcastData)
        } catch (error) {
          console.error('Error fetching podcast data:', error);
        }
      };
      fetchPodcastData();

    }


  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites, podcastData }}>
      {loading ? <div>Loading...</div> : children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => useContext(FavoritesContext);
