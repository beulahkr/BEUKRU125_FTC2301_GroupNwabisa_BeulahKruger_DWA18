import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useAppContext } from '../AppProvider';
import './PodcastPage.css';


const PodcastPage = () => {
  
  const { id } = useParams();
  const { user, favorites, setFavorites, supabase } = useAppContext();
  const podcastPageId = user ? `podcastPage_${user.id}` : 'podcastPage';


  const [podcast, setPodcast] = useState(null);
  const [showAllEpisodes, setShowAllEpisodes] = useState(true);

  useEffect(() => {
    const fetchPodcastData = async () => {
  
      try {
        // Fetch the specific podcast data from the API using the given id
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        const podcastData = await response.json();
        setPodcast(podcastData);
        console.log(podcastData)
      } catch (error) {
        console.error('Error fetching podcast data:', error);
      }
    };

    fetchPodcastData();
  }, [id]); // Fetch the podcast data whenever the id changes


const handleToggleFavorite = async (episodeId) => {
  try {
    if (favorites.includes(episodeId)) {
      // If the episode is already in favorites, remove it
      await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user?.id)
        .eq('episode_id', episodeId);

      setFavorites((prevFavorites) =>
        prevFavorites.filter((id) => id !== episodeId)
      );
    } else {
      // If the episode is not in favorites, add it
      await supabase.from('favorites').insert({
        user_id: user?.id,
        episode_id: episodeId,
      });

      setFavorites((prevFavorites) => [...prevFavorites, episodeId]);
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
  }
}





  if (!podcast) {
    // Handle the case when the podcast is not found
    return <div>Podcast not found</div>;
  }

  return (
     <div id={podcastPageId}>
      <Navbar />
      <div className="podcastPage">
        <img src={podcast.image} alt={podcast.title} />
        <h1>{podcast.title}</h1>
        <p>{podcast.description}</p>
        <div className="toggleButton">
          <button onClick={() => setShowAllEpisodes(!showAllEpisodes)}>
            {showAllEpisodes ? 'Show Favorites Only' : 'Show All Episodes'}
          </button>
        </div>
        {/* Render the seasons and episodes */}

{podcast?.seasons?.map((season) => (
  <div key={season.season}> {/* Provide a unique key for each season */}
    <h2>{season.title}</h2>
    {showAllEpisodes
      ? season.episodes.map((episode) => (
          <div key={episode.episode}> {/* Provide a unique key for each episode */}
            <p>{episode.title}</p>
            <p>{episode.description}</p>
            <audio controls>
              <source src={episode.file} type="audio/mpeg" />
            </audio>
            <button
              onClick={() => handleToggleFavorite(season.season, episode.episode)}
              style={{
                color: favorites.includes(episode.episode) ? 'red' : 'black',
              }}
            >
              {favorites.includes(episode.episode)
                ? 'Remove from Favorites'
                : 'Add to Favorites'}
            </button>
          </div>
        ))
      : season.episodes
          .filter((episode) => favorites.includes(episode.episode))
          .map((episode) => (
            <div key={episode.episode}> {/* Provide a unique key for each episode */}
              <p>{episode.title}</p>
              <p>{episode.description}</p>
              <audio controls>
                <source src={episode.file} type="audio/mpeg" />
              </audio>
              <button
                onClick={() => handleToggleFavorite(season.season, episode.episode)} 
                style={{ color: 'red' }}
              >
                Remove from Favorites
              </button>
            </div>
          ))}
  </div>
))}
      </div>
    </div>
  );
};

export default PodcastPage;
