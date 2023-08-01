import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Preview from "./Preview";
import './Home.css'

const Home = () => {
  const [previewData, setPreviewData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch data from the API and set the previewData state
  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        console.log("fetching");
        const response = await fetch("https://podcast-api.netlify.app/shows");
        const apiData = await response.json();
        setPreviewData(apiData);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };
    fetchDataFromAPI();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    if (value === "az" || value === "za") {
      setSortOption("title");
      setSortOrder(value === "az" ? "asc" : "desc");
    } else if (value === "recent" || value === "oldest") {
      setSortOption("updated");
      setSortOrder(value === "recent" ? "desc" : "asc");
    }
  };

  // Filter the previews based on the search query
  const filteredPreviews = previewData.filter((preview) => {
    const lowerCaseTitle = preview.title.toLowerCase();
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return lowerCaseTitle.includes(lowerCaseSearchQuery);
  });

  // Sort the filtered previews based on the selected sort option and order
const sortedPreviews = [...filteredPreviews].sort((a, b) => {
  if (sortOption === "title") {
    return sortOrder === "asc"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  } else if (sortOption === "updated") {
    const aDate = new Date(a.updated); // Convert to Date object
    const bDate = new Date(b.updated); // Convert to Date object

    return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
  }
  return 0;
});


  return (
    <div>
      <div className="navbar">
        <Navbar handleSearch={handleSearch} searchQuery={searchQuery} />
      </div>
      <div className="browse-all">
        <h2>Browse all podcasts</h2>
        <div className="sort-options">
        <select onChange={handleSortChange} value={sortOption} >
          <option value="az">Sort Alphabetically</option>
          <option value="recent">Sort by Date</option>
        </select>
        <select onChange={(event) => setSortOrder(event.target.value)} value={sortOrder}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        </div>
      </div>

      <div className="home-container">
        {sortedPreviews.map((podcast) => (
          <React.Fragment key={podcast.id}>
            <Preview data={podcast} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Home;

