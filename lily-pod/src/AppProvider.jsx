import { createContext, useContext, useState, useEffect } from 'react';
import supabase from './supabase';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to changes in auth state
    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        // If the user is signed in, set the user state with the session user
        setUser(session.user);
      } else {
        // If the user is signed out or the session is closed, set the user state to null
        setUser(null);
      }
    });
    // Clean up the subscription when the component unmounts
    // return () => {
    //   subscription.unsubscribe();
    // };
  }, []);

  useEffect(() => {
    // Fetch user's favorite episodes from Supabase when the user changes and user is available
    if (user) {
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

  useEffect(() => {
    // Fetch user's favorite episodes only once on component mount
    if (user !== null) {
      setLoading(true);
    }
  }, []); // Empty dependency array to run once on component mount

  if (loading) {
    // Display a loading message or spinner while data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <AppContext.Provider value={{ user, favorites, setFavorites, supabase }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
