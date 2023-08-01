import React, { useEffect, useState } from 'react';
import './index.css';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './components/Home';
import Preview from './components/Preview';
import Navbar from './components/Navbar';
import PodcastPage from './components/PodcastPage';
import { createClient } from '@supabase/supabase-js';
  import  {Auth} from '@supabase/auth-ui-react'
  import {ThemeSupa} from '@supabase/auth-ui-shared'
import supabase from './supabase';
import PodcastsByGenrePage from './components/PodcastsByGenre';
import FavoritesPage from './components/FavoritesPage';
import GenreList from './components/GenreList';

  function App() {

  const [previewData, setPreviewData] = useState([]);

  const fetchDataFromAPI = async () => {
    try {
      console.log('fetching');
      const response = await fetch("https://podcast-api.netlify.app/shows");
      const apiData = await response.json();
      setPreviewData(apiData);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const [session, setSession] = useState(null)

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

      return () => subscription.unsubscribe()
    }, [])

    if (!session) {
      return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]} />)
    }
    else {
      return (
    <div>
      <Routes>
        {/* Root Route */}
       <Route exact path="/" element={<Home previewData={previewData} />} />
       <Route path="/podcast/:id" element={<PodcastPage data={previewData} />} />
        <Route path="/genres/:genreId" element={<PodcastsByGenrePage  />}/>
         <Route exact path="/genres" element={<GenreList/>} />
        <Route path="/favorites" element={<FavoritesPage/>} />
      </Routes>
    </div>
  );
      }

  


 
}

export default App;