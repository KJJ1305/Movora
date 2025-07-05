import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { fetchData } from '../../api/tmdb';
import SingleContent from '../../components/Singlecontent/Singlecontent';
import CustomPagination from '../../components/Pagination/CustomPagination';

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: '#fff',
        },
    },
});

const Search = () => {
    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchSearch = async () => {
        if (!searchText) return;
        
        setLoading(true);
        try {
            const mediaType = type === 0 ? 'movie' : 'tv';
            const url = `https://api.themoviedb.org/3/search/${mediaType}?language=en-US&query=${searchText}&page=${page}&include_adult=false`;
            
            const data = await fetchData(url);
            
            if (data && data.results) {
                setContent(data.results);
                setNumOfPages(data.total_pages > 500 ? 500 : data.total_pages);
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (searchText.trim()) {
            fetchSearch();
        } else {
            setContent([]);
            setNumOfPages(0);
        }
    }, [type, page, searchText]);

    const handleSearch = () => {
        if (searchText.trim()) {
            setPage(1);
            fetchSearch();
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div style={{display: 'flex', justifyContent: 'center', margin: '10px 0'}} className='search'>
                    <TextField
                        style={{ flex: 1, marginRight: 10 }}
                        className='searchBox'
                        label="Search"
                        variant="filled"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <Button 
                        variant="contained" 
                        style={{marginLeft: 10}} 
                        color="primary"
                        onClick={handleSearch}
                    >
                        <SearchIcon />
                    </Button>
                </div>

                <Tabs 
                    value={type} 
                    indicatorColor="primary" 
                    textColor="primary" 
                    onChange={(e, newValue) => {
                        setType(newValue);
                        setPage(1);
                    }}
                    style={{paddingBottom: 5, width: '100%'}}
                    variant="fullWidth"
                >
                    <Tab label="Search Movies" />
                    <Tab label="Search TV Series" />
                </Tabs>
            </ThemeProvider>

            {loading && (
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    Searching...
                </div>
            )}

            {!loading && searchText.trim() && content.length > 0 && (
                <div>
                    <div className='trending'>
                        {content.map((c) => (
                            <SingleContent
                                key={c.id}
                                id={c.id}
                                poster={c.poster_path}
                                title={c.title || c.name}
                                date={c.first_air_date || c.release_date}
                                media_type={type === 0 ? "movie" : "tv"}
                                vote_average={c.vote_average}
                            />
                        ))}
                    </div>
                    {numOfPages > 1 && (
                        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
                    )}
                </div>
            )}

            {!loading && searchText.trim() && content.length === 0 && (
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    No results found for "{searchText}"
                </div>
            )}
        </div>
    );
};

export default Search; 