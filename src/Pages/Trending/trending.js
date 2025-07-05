import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { requests, fetchData } from '../../api/tmdb';
import SingleContent from '../../components/Singlecontent/Singlecontent';
import './trending.css'
import CustomPagination from '../../components/Pagination/CustomPagination';

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(0);
  const location = useLocation();

  const fetchTrending = async () => {
    setLoading(true);
    try {
      // Get page from URL or default to 1
      const urlParams = new URLSearchParams(location.search);
      const currentPage = parseInt(urlParams.get('page')) || 1;
      setPage(currentPage);
      
      // Add page parameter to the API request
      const url = `${requests.fetchTrending}&page=${currentPage}`;
      const data = await fetchData(url);
      
      if (data && data.results) {
        setTrending(data.results);
        setNumOfPages(data.total_pages > 500 ? 500 : data.total_pages); // TMDB limits to 500 pages
      }
    } catch (error) {
      console.error('Error fetching trending data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrending();
  }, [page, location.search]); // Re-fetch when page or URL search changes

  if (loading) {
    return <div>Loading trending movies...</div>;
  }

  return (
    <div>
      <h1 className='pageTitle'>Trending</h1>
      <div className='trending'>
        {trending && trending.map((c) => (
          <SingleContent
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type={c.media_type}
            vote_average={c.vote_average}
          />
        ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;