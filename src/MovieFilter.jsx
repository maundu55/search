import React, { useState } from "react";

const MovieFilter = () => {
  // Sample movie data
  const movies = [
    { id: 1, title: "Inception", genre: "Action", rating: 8.8, releaseYear: 2010 },
    { id: 2, title: "The Dark Knight", genre: "Action", rating: 9.0, releaseYear: 2008 },
    { id: 3, title: "The Shawshank Redemption", genre: "Drama", rating: 9.3, releaseYear: 1994 },
    { id: 4, title: "The Godfather", genre: "Drama", rating: 9.2, releaseYear: 1972 },
    { id: 5, title: "The Pursuit of Happyness", genre: "Drama", rating: 8.0, releaseYear: 2006 },
    { id: 6, title: "Jumanji", genre: "Comedy", rating: 6.9, releaseYear: 1995 },
    { id: 7, title: "Deadpool", genre: "Action", rating: 8.0, releaseYear: 2016 },
    { id: 8, title: "Avengers: Endgame", genre: "Action", rating: 8.4, releaseYear: 2019 },
  ];

  // State variables for the filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [releaseYearFilter, setReleaseYearFilter] = useState(2000);
  const [sortBy, setSortBy] = useState("rating");

  // Filter and sort the movies
  const filteredMovies = movies
    .filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre;
      const matchesRating = movie.rating >= ratingFilter;
      const matchesReleaseYear = movie.releaseYear >= releaseYearFilter;

      return matchesSearch && matchesGenre && matchesRating && matchesReleaseYear;
    })
    .sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating; // Sort by rating in descending order
      } else if (sortBy === "releaseYear") {
        return b.releaseYear - a.releaseYear; // Sort by release year in descending order
      }
      return 0;
    });

  return (
    <div>
      <h2>Movie Filter</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Genre Filter */}
      <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
        <option value="All">All Genres</option>
        <option value="Action">Action</option>
        <option value="Drama">Drama</option>
        <option value="Comedy">Comedy</option>
      </select>

      {/* Rating Filter */}
      <div>
        <label>Min Rating: </label>
        <input
          type="number"
          value={ratingFilter}
          onChange={(e) => setRatingFilter(parseFloat(e.target.value))}
          min="0"
          max="10"
          step="0.1"
        />
      </div>

      {/* Release Year Filter */}
      <div>
        <label>Min Release Year: </label>
        <input
          type="number"
          value={releaseYearFilter}
          onChange={(e) => setReleaseYearFilter(parseInt(e.target.value))}
          min="1900"
          max="2024"
        />
      </div>

      {/* Sort By */}
      <div>
        <label>Sort By: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="rating">Rating</option>
          <option value="releaseYear">Release Year</option>
        </select>
      </div>

      {/* Display Filtered Movies */}
      <ul>
        {filteredMovies.map((movie) => (
          <li key={movie.id}>
            <strong>{movie.title}</strong> - {movie.genre} - Rating: {movie.rating} - Released: {movie.releaseYear}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieFilter;
