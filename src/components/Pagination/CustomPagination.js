import React from 'react'
import { Pagination, createTheme, ThemeProvider } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: '#1976d2',
        },
    },
});

const CustomPagination = ({ setPage, numOfPages = 10 }) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get current page from URL or default to 1
    const getCurrentPage = () => {
        const urlParams = new URLSearchParams(location.search);
        return parseInt(urlParams.get('page')) || 1;
    };

    const handlePageChange = (event, page) => {
        setPage(page);
        window.scroll(0, 0);
        
        // Update URL with page parameter
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('page', page);
        navigate(`${location.pathname}?${urlParams.toString()}`);
    };

    return (
        <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 20
        }}>
            <ThemeProvider theme={darkTheme}>
                        <Pagination 
                count={numOfPages} 
                onChange={handlePageChange}
                page={getCurrentPage()}
                color="primary"
                theme={darkTheme}
                hideNextButton
                hidePrevButton
            />
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination