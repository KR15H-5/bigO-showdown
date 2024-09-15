import React from 'react';
import './YouTubePopup.css';

const YouTubePopup = ({ videoId, start, end, onClose }) => {
  const src = `https://www.youtube.com/embed/${videoId}?start=${start}&end=${end}&autoplay=1`;
  
  return (
    <div className="youtube-popup-overlay">
      <div className="youtube-popup-content">
        <button className="youtube-popup-close" onClick={onClose}>×</button>
        <iframe 
          width="560" 
          height="315" 
          src={src}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default YouTubePopup;
