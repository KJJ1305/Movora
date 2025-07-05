import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { requests, fetchData } from '../../api/tmdb';
import SingleContent from '../../components/Singlecontent/Singlecontent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import Genres from '../../components/genres';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const location = useLocation();

  const fetchMovies = async () => {
    setLoading(true);
    try {
      // Get page from URL or default to 1
      const urlParams = new URLSearchParams(location.search);
      const currentPage = parseInt(urlParams.get('page')) || 1;
      setPage(currentPage);
      
      // Build URL with genre filtering
      let url = `${requests.fetchTrendingMovies}&page=${currentPage}`;
      
      // Add genre filtering if genres are selected
      if (selectedGenres.length > 0) {
        const genreIds = selectedGenres.map((g) => g.id).join(',');
        url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${currentPage}&with_genres=${genreIds}`;
      }
      
      const data = await fetchData(url);
      
      if (data && data.results) {
        setMovies(data.results);
        setNumOfPages(data.total_pages > 500 ? 500 : data.total_pages); // TMDB limits to 500 pages
      }
    } catch (error) {
      console.error('Error fetching movies data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, [page, location.search, selectedGenres]); // Re-fetch when page, URL search, or genres change

  if (loading) {
    return <div>Loading trending movies...</div>;
  }

  return (
    <div>
      <h1 className='pageTitle'>Movies</h1>
      <Genres 
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className='trending'>
        {movies && movies.map((c) => (
          <SingleContent
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title}
            date={c.release_date}
            media_type="movie"
            vote_average={c.vote_average}
          />
        ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Movies; 