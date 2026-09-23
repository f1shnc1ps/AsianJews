import React from "react";
import Gallery from "react-photo-gallery";
import EventsGridImage from "./events-grid-image";

export default function EventsImageMosaic  ({ images, handleClick }) {
  return(
    <div className="gallery-container">
      <Gallery
        columns={containerWidth => {
          let columns = 1;
          if (containerWidth >= 500) columns = 2;
          if (containerWidth >= 900) columns = 3;
  
          return columns;
        }}
        onClick={handleClick}
        photos={images}
        margin={6}
        direction="column"
        renderImage={EventsGridImage}
      />
    </div>
  );
}