import React, { useEffect } from 'react';
import { fetchData } from '../api/tmdb';
import './genres.css';
import { Chip } from '@mui/material';

const Genres = ({
    type,
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    setPage,
}) => {

    const fetchGenres = async () => {
        try {
            const data = await fetchData(`https://api.themoviedb.org/3/genre/${type}/list?language=en-US`);
            if (data && data.genres) {
                setGenres(data.genres);
            }
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    useEffect(() => {
        fetchGenres();
        return () => {
            setGenres([]); // cleanup when component unmounts
        };
        // eslint-disable-next-line
    }, []);

    const handleAdd = (genre) => {
        setSelectedGenres(prev => [...prev, genre]);
        setGenres(prev => prev.filter((g) => g.id !== genre.id));
        setPage(1);
    };

    const handleRemove = (genre) => {
        setSelectedGenres(prev => prev.filter((selected) => selected.id !== genre.id));
        setGenres(prev => [...prev, genre]);
        setPage(1);
    };

    return (
        <div style={{padding: '6px 0'}}>
            {selectedGenres && selectedGenres.map((genre) => (
                <Chip 
                    label={genre.name} 
                    size="small"
                    style={{
                        margin: 2,
                        backgroundColor: 'white',
                        color: 'black',
                        fontWeight: 'bold'
                    }} 
                    key={genre.id} 
                    onClick={() => handleRemove(genre)}
                    onDelete={() => handleRemove(genre)}
                    clickable
                />
            ))}
            {genres && genres.map((genre) => (
                <Chip 
                    label={genre.name} 
                    size="small"
                    style={{
                        margin: 2,
                        backgroundColor: '#39445a',
                        color: 'white',
                        border: '1px solid white'
                    }} 
                    key={genre.id} 
                    onClick={() => handleAdd(genre)}
                    clickable
                />
            ))}
        </div>
    );
};

export default Genres;