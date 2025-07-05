import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { requests, fetchData } from '../../api/tmdb';
import SingleContent from '../../components/Singlecontent/Singlecontent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import Genres from '../../components/genres';

const Series = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const location = useLocation();

  const fetchSeries = useCallback(async () => {
    setLoading(true);
    try {
      // Get page from URL or default to 1
      const urlParams = new URLSearchParams(location.search);
      const currentPage = parseInt(urlParams.get('page')) || 1;
      setPage(currentPage);
      
      // Build URL with genre filtering
      let url = `${requests.fetchTrendingTV}&page=${currentPage}`;
      
      // Add genre filtering if genres are selected
      if (selectedGenres.length > 0) {
        const genreIds = selectedGenres.map((g) => g.id).join(',');
        url = `https://api.themoviedb.org/3/discover/tv?language=en-US&page=${currentPage}&with_genres=${genreIds}`;
      }
      
      const data = await fetchData(url);
      
      if (data && data.results) {
        setSeries(data.results);
        setNumOfPages(data.total_pages > 500 ? 500 : data.total_pages); // TMDB limits to 500 pages
      }
    } catch (error) {
      console.error('Error fetching TV series data:', error);
    }
    setLoading(false);
  }, [location.search, selectedGenres]);

  useEffect(() => {
    fetchSeries();
  }, [fetchSeries]);

  if (loading) {
    return <div>Loading trending TV series...</div>;
  }

  return (
    <div>
      <h1 className='pageTitle'>TV Series</h1>
      <Genres 
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className='trending'>
        {series && series.map((c) => (
          <SingleContent
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.name}
            date={c.first_air_date}
            media_type="tv"
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

export default Series; 