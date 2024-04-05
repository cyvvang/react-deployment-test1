import './App.css';
import Sidebar from "./Sidebar/Sidebar";
import Navigation from "./Navigation/Nav";
import Songs from "./Songs/Songs";
import React, { useEffect, useState } from "react";
import Card from './components/Card';
import songs from "./db/data";

function App() {
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [isFavoriteFilterActive, setIsFavoriteFilterActive] = useState(false);

  useEffect(() => {
    console.log(selectedYears, selectedTypes);
  }, [selectedYears, selectedTypes]);

  useEffect(() => {
    console.log(selectedArtist);
  }, [selectedArtist]);

  const handleYearClick = (year) => {
    // If the last selected year is click again, it acts
    // like un-select any of the year so every year is 
    // included  for year filter
    if (selectedYears.includes(year)) {
      //console.log("Year is included and will be removed: " + year);
      setSelectedYears([]);
    } else {
      //console.log("Year is not included and will be replace: " + year)
      // comment out the line which append the year to the current one
      // Per design,  replacig the last year selection with the current one
      // so that only one option is allowed for Year
      // setSelectedYears([...selectedYears, year]);
      setSelectedYears(year);
    }
  }

  const handleTypeClick = (type) => {
    // If the last selected sont type is click again, it acts
    // like un-select any of the sony type so every sony type is
    // included  for the song type filter
    if (selectedTypes.includes(type)) {
      setSelectedTypes([]);
    } else {
     // comment out the line which append the year to the current one
      // Per design,  replacig the last song type selection with the
      // current one so that only one option is allowed for Song Type
      // setSelectedYears([...selectedYears, year]);
      setSelectedTypes(type);
    }
  }

  const handleClearFilters = () => {
    setSelectedYears([]);
    setSelectedTypes([]);
    setSelectedArtist(null);
    setIsFavoriteFilterActive(false);
  };

  const handleArtistChange = (event) => {
    /* 
     * Per design clear Year, Song Type and Favorite filters
     *  when select 
     * an artist. The Year and Song Type selected after the
     * artist selection will stay
     */
    setSelectedYears([]);
    setSelectedTypes([]);
    setSelectedArtist(event);
    setIsFavoriteFilterActive(false);
  }

  const handleFavoriteClick = (url) => {
    console.log("Apply handleFavoriteClick filter..." + url);
    setFavoriteSongs(prevFavoriteSongs => {
      if (prevFavoriteSongs.includes(url)) {
        return prevFavoriteSongs.filter(songUrl => songUrl !== url);
      } else {
        return [...prevFavoriteSongs, url];
      }
    });
  }

  /* Favorite will clear other filters and leave only favorite filters */
  const applyFavoriteFilter = () => {
    setIsFavoriteFilterActive(prevState => !prevState);
    console.log("Apply favorite filter..." + isFavoriteFilterActive);    
    if (!isFavoriteFilterActive) {
      setSelectedYears([]);
      setSelectedTypes([]);
      setSelectedArtist(null);
    }
  }

  function filteredData(songs, selectedYears, selectedTypes, selectedArtist) {
    let filteredSongs = songs;

    if (selectedYears.length > 0 || selectedTypes.length > 0) {
      filteredSongs = filteredSongs.filter(({ year, songType }) =>
        (selectedYears.length === 0 || selectedYears.includes(year)) &&
        (selectedTypes.length === 0 || selectedTypes.includes(songType))
      );
    }

    if (selectedArtist) {
      filteredSongs = filteredSongs.filter(({ artist }) => artist === selectedArtist);
    }

    if (isFavoriteFilterActive) {
      filteredSongs = filteredSongs.filter(({ url }) => favoriteSongs.includes(url));
    }

    return filteredSongs.map(
      ({ release, img, title, artist, songType, url }) => (
        <Card
          key={url}
          release={release}
          img={img}
          title={title}
          artist={artist}
          songType={songType}
          url={url}
          isFavorite={favoriteSongs.includes(url)}
          onFavoriteClick={handleFavoriteClick}
        />
      )
    );
  }

  const result = filteredData(songs, selectedYears, selectedTypes, selectedArtist);

  return (
    <div className="App">
      <Sidebar handleArtistChange={handleArtistChange} applyFavoriteFilter={applyFavoriteFilter} handleClearFilters={handleClearFilters}/>
      <Navigation
        handleYearClick={handleYearClick}
        handleTypeClick={handleTypeClick}
        handleClearFilters={handleClearFilters}
      />
      <Songs result={result} />
    </div>
  );
}

export default App;
