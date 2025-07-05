import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useState, useEffect } from 'react';
import './Carousel.css';

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({media_type, id}) => {

  const [credit, setCredit] = useState([]);

  const items = credit?.map((c) => (
    <div className="carousel__item" onDragStart={handleDragStart} key={c.id}>
      <img 
        src={c.profile_path ? `https://image.tmdb.org/t/p/w500${c.profile_path}` : 'https://www.movienewz.com/img/films/poster-holder.jpg'} 
        alt={c?.name}
        className="carousel__img"
      />
      <b className="carousel__txt">{c?.name}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };


  const fetchData = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    const content = await data.json();
    console.log(content);
    setCredit(content.cast);
  };

  useEffect(() => { 
    fetchData();
  }, [media_type, id]);

  return (
    <AliceCarousel autoPlay responsive={responsive} 
    mouseTracking 
    infinite
    disableDotsControls
    disableButtonsControls
    items={items} />
  )
}

export default Carousel;