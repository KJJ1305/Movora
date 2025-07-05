import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Carousel.css";

const Carousel = ({ media_type, id }) => {
  const [credits, setCredits] = useState();

  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setCredits(data);
  };

  useEffect(() => {
    fetchCredits();
    // eslint-disable-next-line
  }, []);

  const items = [];

  credits &&
    credits.cast &&
    credits.cast.map((c) => {
      c.profile_path &&
        items.push({
          id: c.id,
          name: c.name,
          image: c.profile_path,
          character: c.character,
        });
    });

  const handleDragStart = (e) => e.preventDefault();

  return (
    <div className="carousel">
      <h2>Cast</h2>
      <div className="carousel__inner">
        {items.map((item) => (
          <div
            key={item.id}
            className="carousel__item"
            onDragStart={handleDragStart}
            draggable={false}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${item.image}`}
              alt={item.name}
              className="carousel__img"
            />
            <b className="carousel__txt">{item.name}</b>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel; 