import { createContext, useContext, useState, useEffect } from 'react';
import supabase from './supabase';

const AppContext = createContext();

const useAuthSubscription = (callback) => {
  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange(callback);

    return () => {
      // No need for unsubscribe(), we'll let supabase handle it internally.
    };
  }, [callback]);
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Use the custom hook to handle auth state changes and set the user state
  useAuthSubscription((event, session) => {
    if (event === 'SIGNED_IN') {
      setUser(session.user);
      console.log(user)
    } else {
      setUser(null);
    }
  });
  // Fetch user's favorite episodes from Supabase when the user changes
  useEffect(() => {
    const fetchFavoriteEpisodes = async () => {
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

    fetchFavoriteEpisodes();
  }, [user]);


  return (
    <AppContext.Provider value={{ user, setUser, favorites, setFavorites, supabase }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

