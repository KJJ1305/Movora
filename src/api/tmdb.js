const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDhjZDUzZTYyYTg5NDQzYWExZWYyODYyMDA5MzRmMyIsIm5iZiI6MTc1MTcwNzkxOS43ODgsInN1YiI6IjY4NjhmMTBmYmY5YTUyOTRhODUxZDUzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.78q_4P8RLNRWF7Zg5ew30d6Ru7mdNMwgKn4uIa3355Q';
const BASE_URL = 'https://api.themoviedb.org/3';

// API endpoints
export const requests = {
  fetchTrending: `${BASE_URL}/trending/all/week?language=en-US`,
  fetchTrendingMovies: `${BASE_URL}/trending/movie/week?language=en-US`,
  fetchTrendingTV: `${BASE_URL}/trending/tv/week?language=en-US`,
  fetchNetflixOriginals: `${BASE_URL}/discover/tv?with_networks=213&language=en-US`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?language=en-US`,
  fetchActionMovies: `${BASE_URL}/discover/movie?with_genres=28&language=en-US`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?with_genres=35&language=en-US`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?with_genres=27&language=en-US`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?with_genres=10749&language=en-US`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?with_genres=99&language=en-US`,
};

// Function to fetch data from API
export const fetchData = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default requests; 