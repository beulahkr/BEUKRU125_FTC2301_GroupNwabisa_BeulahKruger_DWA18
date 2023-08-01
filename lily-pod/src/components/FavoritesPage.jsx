import React, { useEffect, useState } from 'react';
import { useAppContext } from '../AppProvider';
import EpisodeCard from './EpisodeCard';

const parseEpisodeId = (episodeId) => {
  const [podcastId, seasonNumber, episodeNumber] = episodeId.split('-');
  return {
    podcastId: podcastId.trim(),
    seasonNumber: parseInt(seasonNumber.trim(), 10),
    episodeNumber: parseInt(episodeNumber.trim(), 10),
  };
};



const FavoritesPage = () => {
  const { user, supabase } = useAppContext();
  const [favorites, setFavorites] = useState([]);
  const [favoriteEpisodesData, setFavoriteEpisodesData] = useState([]);

  useEffect(() => {
    const fetchFavoriteEpisodesData = async () => {
      try {
        if (user) {
          const { data, error } = await supabase
            .from('favorites')
            .select('episode_id')
            .eq('user_id', user.id);

          if (error) {
            console.error('Error fetching favorite episodes:', error);
          } else {
            const favoriteEpisodes = data.map((item) => item.episode_id);
            setFavorites(favoriteEpisodes);
          }
        }
      } catch (error) {
        console.error('Error fetching favorite episodes:', error);
      }
    };

    if (favorites.length > 0) {
      fetchFavoriteEpisodesData();
    }
  }, [user, supabase, favorites]);

  useEffect(() => {
    const fetchFavoriteEpisodesData = async () => {
      try {
        const episodeDataPromises = favorites.map(async (episodeId) => {
          console.log(episodeId)
          const { podcastId, seasonNumber, episodeNumber } = parseEpisodeId(episodeId);
          const response = await fetch(`https://podcast-api.netlify.app/id/${podcastId}`);
          const podcastData = await response.json();
          const seasonData = podcastData.seasons?.find((season) => season.season === Number(seasonNumber));
          const episodeData = seasonData?.episodes?.find((episode) => episode.episode === Number(episodeNumber));
          return { episodeData, podcastId, seasonNumber, episodeNumber };
        });

        const fetchedEpisodesData = await Promise.all(episodeDataPromises);
        setFavoriteEpisodesData(fetchedEpisodesData);
      } catch (error) {
        console.error('Error fetching episode data:', error);
      }
    };

    if (favorites.length > 0) {
      fetchFavoriteEpisodesData();
    }
  }, [favorites]);

  return (
    <div>
      <h2>Favorites</h2>
      {favoriteEpisodesData.map(({ episodeData, podcastId, seasonNumber, episodeNumber }) => (
        <EpisodeCard
          key={`${podcastId}-${seasonNumber}-${episodeNumber}`}
          episodeId={episodeData}
        />
      ))}
    </div>
  );
};

export default FavoritesPage;
