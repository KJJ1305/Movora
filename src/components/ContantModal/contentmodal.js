import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { img_500, unavailable , unavailableLandscape } from '../../config/config';
import './ContentModal.css';
import YouTubeIcon from '@mui/icons-material/YouTube';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper:{
    width: '90%',
    height: '80%',
    backgroundColor: '#39445a',
    border: '1px solid #282c34',
    borderRadius: 10,
    color: 'white',
    boxShadow: theme?.shadows?.[5] || '0 3px 5px 2px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    zIndex: 1300, // Ensure modal content is above backdrop
    outline: 'none', // Remove focus outline
    overflow: 'hidden', // Prevent content from overflowing
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
    zIndex: 1200, // Below modal content
  }
}));

export default function ContentModal({children, media_type, id}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [video, setVideo] = useState([])


  const fetchData = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    const content = await data.json();
    console.log('Content data:', content); // Debug log
    console.log('Poster path:', content.poster_path); // Debug poster path
    console.log('Media type:', media_type); // Debug media type
    console.log('ID:', id); // Debug ID
    setContent(content);
  }

  const fetchVideo = async () => {
    try {
      const data = await fetch(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
      const video = await data.json();
      console.log('Video data:', video); // Debug log
      setVideo(video.results && video.results.length > 0 ? video.results[0].key : null);
    } catch (error) {
      console.error('Error fetching video:', error);
      setVideo(null);
    }
  }

  useEffect(() => {
    fetchData();
    fetchVideo();
    }, [media_type, id]);


  return (
    <>
        <div className='media' color="inherit" style={{cursor: 'pointer'}} onClick={handleOpen}>{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            className: classes.backdrop,
          },
        }}
        className={classes.modal}
      >
        <Fade in={open}>
          {content && (
          <Box className={classes.paper}>
                <div className="ContentModal">
                      <img 
                        className='ContentModal__portrait' 
                        src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable} 
                        alt={content.title || content.name || 'Content poster'}
                        onError={(e) => {
                          console.log('Image failed to load, using fallback');
                          e.target.src = unavailable;
                        }}
                      />
                      <img 
                        src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape}
                        alt={content.title || content.name || 'Content backdrop'}
                        className='ContentModal__landscape'
                      />
                      <div className="ContentModal__about">
                          <span className="ContentModal__title">
                            {content.name || content.title}(
                              {(
                                content.first_air_date || content.release_date||"-----"

                              ).substring(0,4)}
                            )
                          </span>
                          {content.tagline && (
                            <i className="tagline">{content.tagline}</i>
                          )}
                          <span className="ContentModal__description">
                            {content.overview}
                          </span>
                              <div>

                              </div>
                            <Button 
                            variant="contained"
                            startIcon={<YouTubeIcon />}
                            color="secondary"
                            target="__blank"
                            href={`https://www.youtube.com/watch?v=${video}`}
                            >
                              Watch the Trailer
                            </Button>
                      </div>
                </div>    
          </Box>
          )}
        </Fade>
      </Modal>
    </>
  );
}