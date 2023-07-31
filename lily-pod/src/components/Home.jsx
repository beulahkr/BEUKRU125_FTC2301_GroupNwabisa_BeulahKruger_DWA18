

import { Link, useParams } from "react-router-dom";

import '../index.css'
import '../App.css'
import React, { useState } from "react";
import Navbar from "./Navbar";
import Preview from "./Preview";
const Home = ({ previewData }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Add a check to ensure that previewData is an array
  const filteredPreviews = Array.isArray(previewData)
    ? previewData.filter((preview) => {
        const lowerCaseTitle = preview.title.toLowerCase();
        const lowerCaseSearchQuery = searchQuery.toLowerCase();
        return lowerCaseTitle.includes(lowerCaseSearchQuery);
      })
    : [];

  return (
    <div>
      <Navbar handleSearch={handleSearch} searchQuery={searchQuery} />
      <br />
      <h2 className="browseAll">Browse all shows</h2>
      {filteredPreviews.map((podcast) => (
        <React.Fragment key={podcast.id}>
          <Preview data={podcast} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Home;
